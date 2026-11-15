export const DEFAULT_SITE_URL = 'https://www.elshali.com';

/**
 * Returns the single source of truth for the site base URL,
 * reading NEXT_PUBLIC_SITE_URL from environment with fallback to https://www.elshali.com
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return DEFAULT_SITE_URL;
}

/**
 * Formats a clean canonical absolute URL for any subpage or path.
 */
export function getCanonicalUrl(path: string = ''): string {
  const baseUrl = getSiteUrl();
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generates an absolute URL for Open Graph / Twitter card image metadata.
 */
export function getOgImageUrl(filename: string = 'elshali-logo.webp'): string {
  return `${getSiteUrl()}/images/${filename}`;
}

