import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { QuoteProvider } from '@/components/QuoteProvider';
import SmoothScroll from '@/components/SmoothScroll';
import Chatbot from '@/components/Chatbot';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'ELSALI LOGISTICS | LCV, HCV & Pan-India Freight Transport',
  description:
    'ELSALI LOGISTICS — professional LCV & HCV freight transport solutions across Tamil Nadu and Pan India. Fast vehicle placement, competitive rates, reliable delivery.',
  keywords: [
    'logistics',
    'LCV transport',
    'HCV transport',
    'freight',
    'Tamil Nadu',
    'Pan India',
    'truck',
    'vehicle placement',
    'ELSALI LOGISTICS',
    'Coimbatore',
  ],
  authors: [{ name: 'ELSALI LOGISTICS' }],
  creator: 'ELSALI LOGISTICS',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'ELSALI LOGISTICS',
    title: 'ELSALI LOGISTICS | LCV, HCV & Pan-India Freight Transport',
    description:
      'Professional LCV & HCV freight transport solutions across Tamil Nadu and Pan India.',
    images: [{ url: '/images/hero-logistics.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELSALI LOGISTICS | LCV, HCV & Pan-India Freight Transport',
    description:
      'Professional LCV & HCV freight transport solutions across Tamil Nadu and Pan India.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'ELSALI LOGISTICS',
              description:
                'LCV & HCV freight transport solutions across Tamil Nadu and Pan India.',
              telephone: '+916369844820',
              email: 'elshalilogistics@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Coimbatore',
                addressRegion: 'Tamil Nadu',
                addressCountry: 'IN',
              },
              url: 'https://elsalilogistics.com',
              sameAs: [],
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
            }),
          }}
        />
      </head>
      <body>
        <QuoteProvider>
          <SmoothScroll>
            <a href="#main-content" className="skip-to-main">
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <QuoteModal />
            <Chatbot />
          </SmoothScroll>
        </QuoteProvider>
      </body>
    </html>
  );
}
