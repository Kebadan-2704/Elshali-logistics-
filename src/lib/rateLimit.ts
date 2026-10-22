// In-memory sliding window rate limiter for API endpoints
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out timestamps outside window
  const recent = timestamps.filter(t => now - t < windowMs);
  
  if (recent.length >= limit) {
    rateLimitMap.set(ip, recent);
    return { allowed: false, remaining: 0 };
  }
  
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return { allowed: true, remaining: limit - recent.length };
}
