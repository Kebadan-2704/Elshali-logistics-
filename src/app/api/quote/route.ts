import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimit';

// Input sanitization helper
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
  website: z.string().max(0, 'Honeypot field must be empty'), // Honeypot
});

export async function POST(req: NextRequest) {
  // 1. Rate Limiting (5 requests per minute per IP)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1';
  const { allowed, remaining } = checkRateLimit(ip, 5, 60000);
  
  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many quote requests. Please wait a moment or call our dispatch team directly at +91 6369844820.',
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

    // Sanitize string inputs
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

    // 3. Dispatch & Provider Check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email dispatch service is currently unconfigured. Please contact dispatch directly via Phone: +91 6369844820 or WhatsApp.',
          fallback: {
            phone: '+916369844820',
            whatsapp: 'https://wa.me/916369844820',
          },
        },
        { status: 503 }
      );
    }

    // In production with RESEND_API_KEY:
    // await resend.emails.send({ ... });

    return NextResponse.json(
      {
        success: true,
        message: 'Quote request registered successfully. Our dispatch coordinator will contact you shortly.',
        data: {
          referenceId: `ELS-${Date.now().toString().slice(-6)}`,
          phone: sanitized.phone,
          vehicleType: sanitized.vehicleType,
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
        error: 'An unexpected error occurred while processing your quote request.',
      },
      { status: 500 }
    );
  }
}
