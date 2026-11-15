import type { Metadata } from 'next';
import { Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { services } from '@/data/services';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Commercial Freight & Transport Services | ELSHALI LOGISTICS',
  description:
    'Comprehensive road transport services: cargo solutions, mini trucks, open vehicles, full & part load freight, container transport, and express delivery.',
  alternates: {
    canonical: getCanonicalUrl('/services'),
  },
  openGraph: {
    title: 'Commercial Freight & Transport Services | ELSHALI LOGISTICS',
    description: 'Comprehensive road transport services: cargo solutions, mini trucks, containers, and express delivery across India.',
    url: getCanonicalUrl('/services'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

export default function ServicesPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Commercial Road Freight Transportation',
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.legalName,
      telephone: `+91${siteConfig.phone}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '71B SMT Casting Line, St 2 Kondaswamy Nagar, 3-5, Veerapandi Road',
        addressLocality: 'Coimbatore',
        postalCode: '641047',
        addressCountry: 'IN',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Road Freight Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
      })),
    },
  };

  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Breadcrumb items={[{ label: 'Our Services' }]} />

      <PageHero
        badge="Commercial Logistics"
        badgeIcon={<Truck size={14} />}
        title="Freight & Road Transport"
        highlight="Services"
        subtitle={`From nimble intra-city deliveries to pan-India heavy commercial haulage, ${siteConfig.name} delivers scalable cargo solutions for modern enterprise.`}
      />

      <Section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-badge">Core Capabilities</div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Comprehensive Commercial <span className="highlight">Freight Portfolio</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            Driven by our single source of truth data architecture, matching vehicle placement with cargo characteristics.
          </p>
        </div>

        <div className="grid-2">
          {services.map((s) => {
            const isMagenta = s.tone === 'magenta';
            return (
              <Card
                key={s.id}
                variant={isMagenta ? 'gradient' : 'glass'}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: isMagenta ? '#FFFFFF' : '#EC4899',
                      letterSpacing: '0.1em',
                      background: isMagenta ? 'rgba(255,255,255,0.15)' : 'rgba(236,72,153,0.1)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    SERVICE #{s.id}
                  </span>
                  <span style={{ fontSize: '12px', color: isMagenta ? 'rgba(255,255,255,0.8)' : '#10B981', fontWeight: 600 }}>
                    Active Placement
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '14px', color: isMagenta ? 'rgba(255,255,255,0.85)' : '#94A3B8', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
                  {s.description}
                </p>

                <div style={{ borderTop: `1px solid ${isMagenta ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`, paddingTop: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: isMagenta ? 'rgba(255,255,255,0.7)' : '#94A3B8', marginBottom: '8px' }}>
                    Key Service Highlights
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {s.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: isMagenta ? '#FFFFFF' : '#CBD5E1' }}>
                        <CheckCircle2 size={14} color={isMagenta ? '#FFFFFF' : '#EC4899'} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Button href="/quote" variant="primary" size="lg">
            Request Freight Quote for Any Service <ArrowRight size={16} />
          </Button>
        </div>

        <FaqAccordion
          title="Frequently Asked Services Questions"
          subtitle="Clear answers on vehicle classes, placement response times, and transit capabilities."
          items={[
            {
              question: 'What vehicle types and tonnage capacities does ELSHALI LOGISTICS deploy?',
              answer: 'We operate a multi-class commercial fleet including Mini Trucks / Dost (1.5–2.5 MT), Tata 407 & Pickups (2.5–3.5 MT), 14 Ft & 17 Ft Intermediate Trucks (4–7 MT), 20 Ft & 24 Ft Heavy Vehicles (8–12 MT), and 32 Ft Multi-Axle Trailers (up to 25 MT).',
            },
            {
              question: 'Do you support Full Truckload (FTL) and Part Truckload (PTL) carriage?',
              answer: 'Yes. We provide dedicated Full Truckload (FTL) for direct factory-to-destination transit without transshipment, as well as Part Truckload (PTL) solutions for consolidated commercial freight across Tamil Nadu and Pan-India.',
            },
            {
              question: 'How quickly can a vehicle be placed at our manufacturing facility or warehouse?',
              answer: 'For primary industrial hubs in and around Coimbatore (SIDCO, Thudiyalur, Ganapathy, Peelamedu, Malumichampatti), vehicle placement typically occurs within 2 to 4 hours of confirmed booking.',
            },
            {
              question: 'What documentation is required to initiate road freight dispatch?',
              answer: 'Every commercial shipment requires a valid Tax Invoice, e-Way Bill generated under GSTIN, and our formal Consignment Note (Lorry Receipt / LR) issued prior to vehicle departure.',
            },
            {
              question: 'Are express and critical factory transit shipments supported?',
              answer: 'Yes. Our 24/7 dedicated dispatch desk coordinates point-to-point express road freight with dual-driver options for urgent industrial machinery, assembly line parts, and time-critical deliveries.',
            },
          ]}
        />
      </Section>

      <CtaBand />
    </div>
  );
}
