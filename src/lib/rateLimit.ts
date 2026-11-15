/**
 * Rate Limiter supporting Upstash Redis REST API with graceful in-memory sliding window fallback.
 *
 * ARCHITECTURAL NOTES & ASSUMPTIONS:
 * 1. Distributed Rate Limiting: When `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are configured,
 *    atomic sliding window rate limiting is offloaded to Upstash Redis (ideal for Vercel/serverless).
 * 2. Fallback Mode: If Upstash environment variables are not set or if Upstash is unreachable,
 *    it gracefully falls back to local in-memory sliding window with 5-minute TTL sweep and LRU memory cap (10k items).
 * 3. Client IP: Relies on `getClientIp(req)` checking platform-trusted headers (`x-real-ip`, `cf-connecting-ip`).
 */

interface RateLimitRecord {
  timestamps: number[];
  lastSeen: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const MAX_MAP_ENTRIES = 10000;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// Periodic cleanup of stale in-memory rate-limit records
if (typeof setInterval !== 'undefined') {
  const intervalId = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now - record.lastSeen > 10 * 60 * 1000) {
        rateLimitMap.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS);

  if (intervalId && typeof intervalId.unref === 'function') {
    intervalId.unref();
  }
}

/**
 * Synchronous local memory rate-check fallback
 */
function checkLocalRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now();

  if (rateLimitMap.size > MAX_MAP_ENTRIES) {
    let count = 0;
    for (const key of rateLimitMap.keys()) {
      rateLimitMap.delete(key);
      count++;
      if (count > 1000) break;
    }
  }

  const record = rateLimitMap.get(identifier) || { timestamps: [], lastSeen: now };
  record.lastSeen = now;

  const recent = record.timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    record.timestamps = recent;
    rateLimitMap.set(identifier, record);
    return { allowed: false, remaining: 0 };
  }

  recent.push(now);
  record.timestamps = recent;
  rateLimitMap.set(identifier, record);
  return { allowed: true, remaining: limit - recent.length };
}

/**
 * Async rate limiter with Upstash Redis REST support + local fallback
 */
export async function checkRateLimitAsync(
  identifier: string,
  limit = 5,
  windowMs = 60000
): Promise<{ allowed: boolean; remaining: number; provider: 'upstash' | 'memory' }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const windowSeconds = Math.ceil(windowMs / 1000);
      const key = `ratelimit:${identifier}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);

      // Atomic pipeline: INCR key, EXPIRE key windowSeconds (if new)
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          ['INCR', key],
          ['EXPIRE', key, windowSeconds, 'NX'],
        ]),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        const results = await res.json();
        const currentCount = results[0]?.result || 1;
        const allowed = currentCount <= limit;
        return {
          allowed,
          remaining: Math.max(0, limit - currentCount),
          provider: 'upstash',
        };
      }
    } catch (err) {
      console.warn('[RATE_LIMIT] Upstash error, falling back to local memory limiter:', err);
    }
  }

  const local = checkLocalRateLimit(identifier, limit, windowMs);
  return { ...local, provider: 'memory' };
}

/**
 * Legacy synchronous export for existing endpoints
 */
export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60000
): { allowed: boolean; remaining: number } {
  return checkLocalRateLimit(identifier, limit, windowMs);
}
