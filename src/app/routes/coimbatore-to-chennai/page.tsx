import type { Metadata } from 'next';
import { Truck, MapPin, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { siteConfig, getCanonicalUrl, getOgImageUrl } from '@/data/site';

export const metadata: Metadata = {
  title: 'Coimbatore to Chennai Commercial Truck Transport | ELSHALI LOGISTICS',
  description:
    'Dedicated commercial truck transport from Coimbatore to Chennai. Daily vehicle placement for industrial engineering, auto parts, castings, pumps, and commercial freight.',
  alternates: {
    canonical: getCanonicalUrl('/routes/coimbatore-to-chennai'),
  },
  openGraph: {
    title: 'Coimbatore to Chennai Commercial Truck Transport | ELSHALI LOGISTICS',
    description:
      'Direct freight transport corridor linking Coimbatore industrial dispatch with Chennai delivery zones. Comprehensive cargo solutions and vehicles available on demand.',
    url: getCanonicalUrl('/routes/coimbatore-to-chennai'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS Coimbatore to Chennai Transport' }],
    locale: 'en_IN',
    type: 'website',
  },
};

const verifiedCorridorFeatures = [
  {
    icon: MapPin,
    label: 'Primary Dispatch Hub',
    value: 'Kondaswamy Nagar / SMT Casting Line, Coimbatore',
    note: 'Registered central facility & loading point',
  },
  {
    icon: Truck,
    label: 'Transport Format',
    value: 'Full Truckload (FTL) & Scheduled Haulage',
    note: 'Direct point-to-point commercial carriage',
  },
  {
    icon: ShieldCheck,
    label: 'Statutory Carriage',
    value: 'GST & E-Way Bill Compliant LR',
    note: 'Official consignment note with GSTIN 33DQAPA3611N1Z8',
  },
  {
    icon: Phone,
    label: 'Route Dispatch Lead',
    value: `${siteConfig.contactPerson} (+91 ${siteConfig.phone})`,
    note: 'Direct booking & placement coordination',
  },
];

export default function CoimbatoreToChennaiPage() {
  const routeServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Intercity Truck Freight Transportation',
    name: 'Coimbatore to Chennai Commercial Truck Transport',
    description:
      'Commercial truck freight transport connecting Coimbatore manufacturing facilities with Chennai commercial and industrial delivery points.',
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
    areaServed: [
      { '@type': 'City', name: 'Coimbatore' },
      { '@type': 'City', name: 'Chennai' },
    ],
  };

  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(routeServiceJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Freight Routes', href: '/routes' },
          { label: 'Coimbatore to Chennai' },
        ]}
      />

      <PageHero
        badge="Direct Commercial Corridor"
        badgeIcon={<Truck size={14} />}
        title="Coimbatore to Chennai"
        highlight="Truck Freight Transport"
        subtitle="Dedicated vehicle placement, verified LR documentation, and commercial transport linking Coimbatore's manufacturing hubs with Chennai delivery zones."
      />

      {/* Corridor Key Verified Features */}
      <Section>
        <div className="grid-4" style={{ marginBottom: '40px' }}>
          {verifiedCorridorFeatures.map((f, i) => (
            <Card key={i} variant="glass" style={{ padding: '24px 20px', textAlign: 'center' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(236, 72, 153, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EC4899',
                  margin: '0 auto 14px',
                }}
              >
                <f.icon size={22} />
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                {f.label}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                {f.value}
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                {f.note}
              </div>
            </Card>
          ))}
        </div>

        {/* Route Details & Overview */}
        <div className="split-layout">
          <div>
            <div className="section-badge">Corridor Operations</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.25 }}>
              Coimbatore to Chennai <br />
              <span className="highlight">Industrial Haulage &amp; Placement</span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
              The Coimbatore–Chennai highway route is one of Tamil Nadu&apos;s most vital industrial arterials.
              {siteConfig.name} coordinates scheduled and on-demand commercial truck dispatches linking Coimbatore pump manufacturers,
              foundries, tooling workshops, and textile units with Chennai manufacturing plants, assembly facilities, and logistics centers.
            </p>
            <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              Dispatch operations originate from our Coimbatore central facility at Kondaswamy Nagar, Veerapandi Road.
              Every vehicle dispatch includes authentic Lorry Receipt (LR) documentation, driver credential verification,
              and compliant E-Way Bill handling under our registered GSTIN (33DQAPA3611N1Z8).
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button href="/quote" variant="primary">
                Request Route Quotation
              </Button>
              <Button href={`tel:${siteConfig.phone}`} variant="outline">
                <Phone size={14} /> Call Dispatch Desk
              </Button>
            </div>
          </div>

          {/* Operational Verification & Booking Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <Card variant="glass" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#EC4899', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                Dispatch Capabilities
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Point-to-point direct Full Truckload (FTL) transport',
                  'Origin placement from SMT Casting Line / Kondaswamy Nagar hub',
                  'Comprehensive coverage across Chennai industrial delivery belts',
                  'Cargo solutions, container, and open-body truck availability',
                  'Pre-dispatch vehicle inspection and driver verification',
                  'Dedicated commercial coordination with Arun Kumar',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#E2E8F0', lineHeight: 1.5 }}>
                    <CheckCircle2 size={16} color="#EC4899" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="glass" style={{ padding: '20px', background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
              <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6 }}>
                <strong>Need Custom Transit Schedules or Fleet Sizing?</strong><br />
                Our dispatch desk provides tailored vehicle allocations based on your exact cargo tonnage, dimensions, and plant loading constraints.
              </div>
            </Card>
          </div>
        </div>

        <FaqAccordion
          title="Coimbatore to Chennai Route FAQs"
          subtitle="Key details regarding transit durations, industrial destination zones, and cargo handling on NH544 / NH48."
          items={[
            {
              question: 'What is the standard transit time from Coimbatore to Chennai?',
              answer: 'Direct Full Truckload (FTL) transit on the NH544 / NH48 highway corridor typically completes within 10 to 14 hours depending on vehicle tonnage, departure timing, and target delivery zone.',
            },
            {
              question: 'Which industrial delivery zones in Chennai are covered?',
              answer: 'We provide direct door-to-plant delivery across all Chennai industrial belts including Ambattur Industrial Estate, Sriperumbudur SIPCOT, Oragadam Automotive Hub, Guindy, Maraimalai Nagar, and Ennore/Chennai Port container yards.',
            },
            {
              question: 'What commodities are most frequently transported on this route?',
              answer: 'Key cargo classes include precision textile machinery, automotive components, iron and aluminum castings, industrial pump sets, electrical control panels, and commercial palletized freight.',
            },
            {
              question: 'Do you provide return-load and round-trip transport from Chennai to Coimbatore?',
              answer: 'Yes. Daily vehicles return from Chennai industrial zones to Coimbatore hubs, offering competitive return-load freight tariffs for raw materials, imported components, and factory inputs.',
            },
          ]}
        />
      </Section>

      <CtaBand />
    </div>
  );
}
