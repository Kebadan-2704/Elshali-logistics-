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

const QuoteSchema = z.object({
  pickupLocation: z.string().min(2, 'Pickup location is required'),
  deliveryLocation: z.string().min(2, 'Delivery location is required'),
  materialType: z.string().min(2, 'Material type is required'),
  weight: z.string().optional().default(''),
  vehicleType: z.string().min(2, 'Vehicle type is required'),
  requiredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Valid date in YYYY-MM-DD format required'),
  fullName: z.string().min(2, 'Contact name is required'),
  companyName: z.string().optional().default(''),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit Indian mobile number required'),
  email: z.string().email('Valid email address required').optional().or(z.literal('')),
  additionalDetails: z.string().optional().default(''),
  website: z.string().max(0, 'Honeypot field must be empty').optional(), // Honeypot
});

export async function POST(req: NextRequest) {
  // 1. Host-trusted Client IP & Distributed/Local Rate Limiting
  const ip = getClientIp(req);
  const { allowed, remaining } = await checkRateLimitAsync(`quote_${ip}`, 5, 60000);

  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many quote requests from this IP. Please wait a moment or call our dispatch desk directly at +91 6369844820.',
      },
      {
        status: 429,
        headers: { 'Retry-After': '60' },
      }
    );
  }

  // 2. Parse & Validate Payload
  try {
    const rawBody = await req.json();

    // Honeypot check
    if (rawBody.website && rawBody.website.length > 0) {
      return NextResponse.json({ success: false, error: 'Spam submission rejected' }, { status: 400 });
    }

    const validated = QuoteSchema.parse(rawBody);

    const sanitized = {
      pickupLocation: sanitizeString(validated.pickupLocation),
      deliveryLocation: sanitizeString(validated.deliveryLocation),
      materialType: sanitizeString(validated.materialType),
      weight: sanitizeString(validated.weight),
      vehicleType: sanitizeString(validated.vehicleType),
      requiredDate: validated.requiredDate,
      fullName: sanitizeString(validated.fullName),
      companyName: sanitizeString(validated.companyName),
      phone: validated.phone,
      email: validated.email ? sanitizeString(validated.email) : '',
      additionalDetails: sanitizeString(validated.additionalDetails),
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
    const dispatchResult = await dispatchLead('quote', sanitized, ip, testOverrides);

    if (!dispatchResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: dispatchResult.error || 'Quote dispatch service is temporarily unavailable.',
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
        message: 'Freight quote request registered successfully. Our dispatch coordinator will contact you shortly.',
        data: {
          leadId: dispatchResult.leadId,
          referenceId: dispatchResult.referenceId,
          phone: sanitized.phone,
          vehicleType: sanitized.vehicleType,
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

    console.error('[API/QUOTE ERROR]', err);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your quote request.',
      },
      { status: 500 }
    );
  }
}
