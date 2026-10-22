import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimit';

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
  website: z.string().max(0, 'Spam honeypot must be empty'), // Honeypot
});

export async function POST(req: NextRequest) {
  // 1. Rate Limiting (5 requests per minute per IP)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1';
  const { allowed, remaining } = checkRateLimit(`contact_${ip}`, 5, 60000);

  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many contact messages. Please call us directly at +91 6369844820 or message on WhatsApp.',
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

    // 3. Provider check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email dispatch service is unconfigured. Reach us directly via WhatsApp or Phone.',
          fallback: {
            phone: '+916369844820',
            whatsapp: 'https://wa.me/916369844820',
          },
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. Our team will contact you shortly.',
        data: {
          name: sanitized.name,
          receivedAt: new Date().toISOString(),
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

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while sending your message.',
      },
      { status: 500 }
    );
  }
}
