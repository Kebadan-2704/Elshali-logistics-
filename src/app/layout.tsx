import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { QuoteProvider } from '@/components/QuoteProvider';
import SmoothScroll from '@/components/SmoothScroll';
import SplashScreen from '@/components/SplashScreen';
import IdleWidgets from '@/components/IdleWidgets';
import { siteConfig, getSiteUrl, getCanonicalUrl, getOgImageUrl } from '@/data/site';

const outfit = localFont({
  src: '../../public/fonts/Outfit-Bold.ttf',
  variable: '--font-outfit',
  display: 'swap',
  weight: '700',
});

const plusJakartaSans = localFont({
  src: '../../public/fonts/PlusJakartaSans-Regular.ttf',
  variable: '--font-sans',
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  title: {
    default: 'ELSHALI LOGISTICS | LCV, HCV & Pan-India Freight Transport',
    template: '%s | ELSHALI LOGISTICS',
  },
  description:
    'ELSHALI LOGISTICS — professional LCV & HCV freight transport solutions across Tamil Nadu and Pan India. Fast vehicle placement, competitive rates, reliable delivery.',
  keywords: [
    'logistics',
    'LCV transport',
    'HCV transport',
    'freight',
    'Tamil Nadu',
    'Pan India',
    'truck',
    'vehicle placement',
    'ELSHALI LOGISTICS',
    'Coimbatore',
  ],
  authors: [{ name: 'ELSHALI LOGISTICS' }],
  creator: 'ELSHALI LOGISTICS',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'ELSHALI LOGISTICS',
    title: 'ELSHALI LOGISTICS | LCV, HCV & Pan-India Freight Transport',
    description:
      'Professional LCV & HCV freight transport solutions across Tamil Nadu and Pan India.',
    images: [{ url: getOgImageUrl('hero-logistics.webp'), width: 1200, height: 630 }],
    url: getCanonicalUrl('/'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELSHALI LOGISTICS | LCV, HCV & Pan-India Freight Transport',
    description:
      'Professional LCV & HCV freight transport solutions across Tamil Nadu and Pan India.',
    images: [getOgImageUrl('hero-logistics.webp')],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-logistics.webp"
          media="(min-width: 769px)"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'LocalBusiness',
                  '@id': `${getSiteUrl()}/#organization`,
                  name: 'ELSHALI LOGISTICS',
                  legalName: 'ELSHALI LOGISTICS AND TRANSPORT',
                  taxID: '33DQAPA3611N1Z8',
                  url: getSiteUrl(),
                  logo: getOgImageUrl('elshali-logo.webp'),
                  image: getOgImageUrl('hero-logistics.webp'),
                  description:
                    'Professional LCV & HCV freight transport solutions across Tamil Nadu and Pan India. Fast vehicle placement, competitive rates, reliable delivery.',
                  telephone: '+916369844820',
                  email: 'elshalilogistics@gmail.com',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '71B SMT Casting Line, St 2 Kondaswamy Nagar, 3-5, Veerapandi Road',
                    addressLocality: 'Coimbatore',
                    postalCode: '641047',
                    addressRegion: 'Tamil Nadu',
                    addressCountry: 'IN',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 11.0168,
                    longitude: 76.9558,
                  },
                  areaServed: {
                    '@type': 'Country',
                    name: 'India',
                  },
                  sameAs: siteConfig.sameAs,
                  openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday',
                    ],
                    opens: '00:00',
                    closes: '23:59',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${getSiteUrl()}/#website`,
                  url: getSiteUrl(),
                  name: 'ELSHALI LOGISTICS',
                  publisher: { '@id': `${getSiteUrl()}/#organization` },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <SplashScreen />
        <QuoteProvider>
          <SmoothScroll>
            <a href="#main-content" className="skip-to-main">
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <IdleWidgets />
          </SmoothScroll>
        </QuoteProvider>
      </body>
    </html>
  );
}
