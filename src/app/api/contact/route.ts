import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import os from 'os';
import { z } from 'zod';
import { checkRateLimitAsync } from '@/lib/rateLimit';
import { getClientIp } from '@/lib/clientIp';
import { dispatchLead } from '@/lib/leadStore';

function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email address required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit Indian mobile number required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  website: z.string().max(0, 'Spam honeypot must be empty').optional(), // Honeypot
});

export async function POST(req: NextRequest) {
  // 1. Host-trusted Client IP & Distributed/Local Rate Limiting
  const ip = getClientIp(req);
  const { allowed, remaining } = await checkRateLimitAsync(`contact_${ip}`, 5, 60000);

  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many contact inquiries from this IP. Please call us directly at +91 6369844820 or message on WhatsApp.',
      },
      {
        status: 429,
        headers: { 'Retry-After': '60' },
      }
    );
  }

  // 2. Parse & Validate
  try {
    const rawBody = await req.json();

    // Honeypot check
    if (rawBody.website && rawBody.website.length > 0) {
      return NextResponse.json({ success: false, error: 'Spam submission rejected' }, { status: 400 });
    }

    const validated = ContactSchema.parse(rawBody);

    const sanitized = {
      name: sanitizeString(validated.name),
      email: sanitizeString(validated.email),
      phone: validated.phone,
      message: sanitizeString(validated.message),
    };

    const isStub = req.headers.get('x-stub-external') === 'true';
    const allowTestHeaders =
      process.env.NODE_ENV !== 'production' ||
      process.env.ENABLE_TEST_HEADERS === 'true' ||
      isStub ||
      req.headers.has('x-mock-resend') ||
      req.headers.has('x-mock-telegram') ||
      req.headers.has('x-mock-webhook');

    const rawTarget = allowTestHeaders ? req.headers.get('x-test-leads-file') || undefined : undefined;
    let testTargetFile: string | undefined = undefined;
    if (rawTarget) {
      const resolved = path.resolve(rawTarget);
      const allowedTmp = path.resolve(os.tmpdir());
      const allowedData = path.resolve(process.cwd(), 'data');
      if (resolved.startsWith(allowedTmp) || resolved.startsWith(allowedData)) {
        testTargetFile = resolved;
      }
    }

    const testOverrides = allowTestHeaders
      ? {
          mockResend: req.headers.has('x-mock-resend')
            ? req.headers.get('x-mock-resend') === 'true'
            : isStub
            ? true
            : undefined,
          mockTelegram: req.headers.has('x-mock-telegram')
            ? req.headers.get('x-mock-telegram') === 'true'
            : undefined,
          mockWebhook: req.headers.has('x-mock-webhook')
            ? req.headers.get('x-mock-webhook') === 'true'
            : undefined,
          targetFile: testTargetFile,
        }
      : undefined;

    // 3. Dispatch to all configured durable channels via Promise.allSettled
    const dispatchResult = await dispatchLead('contact', sanitized, ip, testOverrides);

    if (!dispatchResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: dispatchResult.error || 'Lead capture service is temporarily unavailable.',
          fallbackContact: dispatchResult.fallbackContact,
        },
        {
          status: 503,
          headers: { 'X-RateLimit-Remaining': remaining.toString() },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received and logged. Our dispatch desk will contact you shortly.',
        data: {
          leadId: dispatchResult.leadId,
          referenceId: dispatchResult.referenceId,
          name: sanitized.name,
          channels: dispatchResult.channels,
        },
      },
      {
        status: 200,
        headers: { 'X-RateLimit-Remaining': remaining.toString() },
      }
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
        },
        { status: 400 }
      );
    }

    console.error('[API/CONTACT ERROR]', err);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your message.',
      },
      { status: 500 }
    );
  }
}
