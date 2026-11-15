import { siteConfig } from '@/data/site';

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface LLMResponse {
  configured: boolean;
  success: boolean;
  answer: string;
  error?: string;
}

export const SYSTEM_PROMPT = `You are ${siteConfig.name} AI Dispatch Assistant. ${siteConfig.name} provides commercial road transportation solutions across Tamil Nadu and Pan-India.

Key Enterprise Facts:
- Company Name: ${siteConfig.name}
- Managing Director / Primary Contact: ${siteConfig.contactPerson}
- Direct Dispatch Phone: +91 ${siteConfig.phone}
- Additional Contact Numbers: ${siteConfig.phone2}, ${siteConfig.phone3}, ${siteConfig.phone4}, ${siteConfig.phone5}
- Official Email: ${siteConfig.email}
- GSTIN Registration: ${siteConfig.gstin}
- Head Office: ${siteConfig.address}
- Fleet Classes: Mini/Dost (1.5-2.5 Ton), Tata Pickup (2.5-3.5 Ton), 14 Ft (4-5 Ton), 17 Ft (6-7 Ton), 20 Ft (8-10 Ton), 24 Ft (10-12 Ton), 26 Ft (12-15 Ton), 32 Ft SXL/MXL (15-25 Ton Multi-Axle)
- Core Capabilities: Full Truck Load (FTL), Part Load (PTL), Dedicated Factory Contracts, Industrial Machinery Haulage, Port-to-Warehouse Container Movement.

Instructions:
- Provide concise, polite, helpful logistics guidance.
- Format responses with clean paragraphs and line breaks.
- Direct customers to use the Get Quote form or call +91 ${siteConfig.phone} for immediate vehicle placement.
- Never invent rates, transit times or company facts not listed above. For pricing and scheduling, direct user to the dispatch team.`;

/**
 * Sanitizes user input string: strips control characters and trims.
 */
export function sanitizeInput(input: string): string {
  // Strip null bytes and non-printable control characters except standard whitespace
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();
}

/**
 * Dispatches a prompt to configured LLM provider via secure server-side POST.
 * If LLM_API_KEY is not configured, returns configured: false with graceful offline guidance.
 */
export async function callLLM(
  message: string,
  history: ChatHistoryItem[] = []
): Promise<LLMResponse> {
  const apiKey = process.env.LLM_API_KEY;
  const provider = (process.env.LLM_PROVIDER || 'gemini').toLowerCase();
  const model = process.env.LLM_MODEL || (provider === 'gemini' ? 'gemini-2.0-flash' : 'gpt-4o-mini');

  const defaultOfflineAnswer = `Welcome to ${siteConfig.name}. Our AI dispatch desk is in direct-contact mode.\n\nFor instant freight rates, vehicle booking, and route inquiries, please reach our senior dispatch coordinator directly at +91 ${siteConfig.phone} or on WhatsApp, or click "Get a Quote" to submit your load requirements.`;

  if (!apiKey) {
    return {
      configured: false,
      success: true,
      answer: defaultOfflineAnswer,
    };
  }

  const cleanMessage = sanitizeInput(message);
  // Cap history to last 6 turns (3 exchanges)
  const cappedHistory = history.slice(-6).map((h) => ({
    role: h.role,
    content: sanitizeInput(h.content),
  }));

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    let answerText = '';

    if (provider === 'gemini') {
      // Google Gemini REST API
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const contents = [
        ...cappedHistory.map((h) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        })),
        {
          role: 'user',
          parts: [{ text: cleanMessage }],
        },
      ];

      const res = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.3,
          },
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Gemini API returned status ${res.status}`);
      }

      const json = await res.json();
      answerText = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else {
      // OpenAI / Groq / OpenAI-compatible endpoint
      const endpoint =
        process.env.LLM_BASE_URL ||
        (provider === 'groq'
          ? 'https://api.groq.com/openai/v1/chat/completions'
          : 'https://api.openai.com/v1/chat/completions');

      const messagesPayload = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...cappedHistory.map((h) => ({ role: h.role, content: h.content })),
        { role: 'user', content: cleanMessage },
      ];

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: messagesPayload,
          max_tokens: 500,
          temperature: 0.3,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`LLM provider returned status ${res.status}`);
      }

      const json = await res.json();
      answerText = json.choices?.[0]?.message?.content || '';
    }

    if (!answerText.trim()) {
      answerText = defaultOfflineAnswer;
    }

    return {
      configured: true,
      success: true,
      answer: answerText.trim(),
    };
  } catch (err) {
    console.error('[LLM DISPATCH ERROR]', err);
    return {
      configured: true,
      success: false,
      answer: defaultOfflineAnswer,
      error: 'Upstream assistant service temporarily unavailable.',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

