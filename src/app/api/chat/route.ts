import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimitAsync } from '@/lib/rateLimit';
import { getClientIp } from '@/lib/clientIp';
import { callLLM, sanitizeInput, ChatHistoryItem } from '@/lib/llm';

const HistoryItemSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().max(1000),
});

const ChatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(500, 'Message exceeds 500 characters'),
  history: z.array(HistoryItemSchema).max(10).optional().default([]),
});

export async function POST(req: NextRequest) {
  // 1. Host-trusted Client IP & Asynchronous Distributed Rate Limiting (10 requests / 60 seconds)
  const ip = getClientIp(req);
  const { allowed, remaining } = await checkRateLimitAsync(`chat_${ip}`, 10, 60000);

  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many chat requests from this IP. Please wait a moment or call our dispatch desk directly at +91 6369844820.',
      },
      {
        status: 429,
        headers: { 'Retry-After': '60' },
      }
    );
  }

  // 2. Validate & Sanitize Input
  try {
    const rawBody = await req.json();
    const validated = ChatSchema.parse(rawBody);

    const cleanMessage = sanitizeInput(validated.message);
    if (!cleanMessage) {
      return NextResponse.json(
        {
          success: false,
          error: 'Message contains invalid characters or is empty.',
        },
        { status: 400 }
      );
    }

    const cleanHistory: ChatHistoryItem[] = validated.history.map((h) => ({
      role: h.role,
      content: sanitizeInput(h.content),
    }));

    // 3. Dispatch to secure server-side LLM provider (or graceful offline fallback)
    const result = await callLLM(cleanMessage, cleanHistory);

    return NextResponse.json(
      {
        success: true,
        answer: result.answer,
        configured: result.configured,
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

    console.error('[API/CHAT ERROR]', err);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your message.',
      },
      { status: 500 }
    );
  }
}
