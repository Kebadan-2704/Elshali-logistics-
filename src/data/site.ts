import { getSiteUrl, getCanonicalUrl, getOgImageUrl, DEFAULT_SITE_URL } from '@/lib/siteUrl';

export { getSiteUrl, getCanonicalUrl, getOgImageUrl, DEFAULT_SITE_URL };

export const siteConfig = {
  name: 'ELSHALI LOGISTICS',
  legalName: 'ELSHALI LOGISTICS AND TRANSPORT',
  tagline: 'LOGISTICS & TRANSPORT',
  subTagline: 'PAN INDIA FREIGHT SOLUTIONS',
  description:
    'Cargo solutions and freight logistics with fast vehicle placement, competitive freight rates and reliable delivery across India.',
  contactPerson: 'ARUN KUMAR',
  phone: '6369844820',
  phone2: '8667049878',
  phone3: '8610814831',
  phone4: '9667225840',
  phone5: '9442444820',
  whatsapp: '6369844820',
  email: 'elshalilogistics@gmail.com',
  email2: 'arunelsali@gmail.com',
  address: '71B SMT Casting Line, St 2 Kondaswamy Nagar, 3-5, Veerapandi Road, Coimbatore – 641047',
  gstin: '33DQAPA3611N1Z8',
  url: getSiteUrl(),
  domain: 'www.elshali.com',
  // Verified social / business profile links (to be populated by owner)
  sameAs: [] as string[],
} as const;

/**
 * Legal Counsel Review Status Flag.
 * Set to true once business legal counsel has formally reviewed /terms and /privacy.
 * Tracked in OWNER_ACTIONS.md.
 */
export const LEGAL_REVIEWED = false;

export const navLinks = [
  { href: '#hero', label: 'HOME' },
  { href: '#about', label: 'ABOUT US' },
  { href: '#services', label: 'SERVICES' },
  { href: '#vehicles', label: 'VEHICLES' },
  { href: '#routes', label: 'ROUTES' },
  { href: '#clients', label: 'CLIENTS' },
  { href: '#contact', label: 'CONTACT' },
] as const;
