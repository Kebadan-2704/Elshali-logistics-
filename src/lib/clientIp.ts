import { NextRequest } from 'next/server';

/**
 * Extracts the real client IP address using host-trusted headers in order of platform priority:
 * 1. `x-real-ip` (Vercel, Nginx, standard reverse proxies)
 * 2. `cf-connecting-ip` (Cloudflare CDN / DNS proxy)
 * 3. First entry of `x-forwarded-for` (standard multi-hop proxy chains)
 * 4. Fallback: `127.0.0.1`
 */
export function getClientIp(req: NextRequest): string {
  const xRealIp = req.headers.get('x-real-ip');
  if (xRealIp && xRealIp.trim()) {
    return xRealIp.trim();
  }

  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp && cfConnectingIp.trim()) {
    return cfConnectingIp.trim();
  }

  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor && xForwardedFor.trim()) {
    const firstHop = xForwardedFor.split(',')[0].trim();
    if (firstHop) return firstHop;
  }

  return '127.0.0.1';
}

