import type { Metadata } from 'next';
import { Target, Phone, Map, Truck, Scale, Box, MapPin, Flag, ClipboardList, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import ClientMarquee from '@/components/ClientMarquee';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'About Us | ELSHALI LOGISTICS Commercial Freight',
  description:
    'Learn about ELSHALI LOGISTICS, a professional transport service provider focused on reliable road freight solutions, LCV/HCV fleets, and pan-India reach.',
  alternates: {
    canonical: getCanonicalUrl('/about'),
  },
  openGraph: {
    title: 'About Us | ELSHALI LOGISTICS Commercial Freight',
    description: 'Learn about ELSHALI LOGISTICS: road transportation, LCV/HCV fleets, and pan-India reach.',
    url: getCanonicalUrl('/about'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
    type: 'website',
  },
};

const approachItems = [
  { icon: Map, label: 'Freight Route & Toll Optimization' },
  { icon: Truck, label: 'Precise Vehicle Sizing (LCV / HCV)' },
  { icon: Scale, label: 'Payload & Weight Distribution' },
  { icon: Box, label: 'Commodity & Packaging Care' },
  { icon: MapPin, label: 'Loading Dock & Pickup Coordination' },
  { icon: Flag, label: 'Delivery Location Access' },
  { icon: ClipboardList, label: 'POD & Commercial Billing Compliance' },
  { icon: ShieldCheck, label: 'Commercial Transit Documentation' },
];

export default function AboutPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'About Us' }]} />

      <PageHero
        badge="About ELSHALI LOGISTICS"
        badgeIcon={<Truck size={14} />}
        title="Reliable Road Freight &"
        highlight="Commercial Logistics"
        subtitle={`${siteConfig.name} is a dedicated transport service provider delivering reliable road freight solutions for manufacturers, industrial enterprises, and commercial distributors across India.`}
      />

      <Section>
        <div className="split-layout">
          <div>
            <div className="section-badge">Who We Are</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.25 }}>
              Professional Transportation <br />
              <span className="highlight">Solutions Provider</span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
              {siteConfig.name} provides end-to-end commercial freight placement, bridging industrial shippers with verified vehicle operators. We eliminate freight delays through proactive vehicle placement and continuous transit monitoring.
            </p>
            <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              Whether you need regular contract transport, project cargo logistics, or spot vehicle placement, our objective remains steadfast: provide the right vehicle class, transparent freight rates, and on-schedule delivery.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button href="/quote" variant="primary">
                Request A Quote
              </Button>
              <Button href="/contact" variant="outline">
                Contact Our Team
              </Button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card variant="gradient">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#fff' }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                Our Core Focus
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                To develop enduring commercial partnerships through dependable vehicle placement, transparent freight pricing, and clear communication at every transit milestone.
              </p>
            </Card>

            <Card variant="glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Commercial Logistics Lead
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                    {siteConfig.contactPerson}
                  </div>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    style={{ fontSize: '14px', color: '#EC4899', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}
                  >
                    +91 {siteConfig.phone}
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-badge">Tailored Logistics</div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            We Arrange Vehicles <span className="highlight">According To Your Exact Needs</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            Every cargo shipment has distinct requirements. We tailor our vehicle placement based on:
          </p>
        </div>

        <div className="grid-4">
          {approachItems.map((item, i) => (
            <Card key={i} variant="glass" style={{ textAlign: 'center', padding: '28px 20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#EC4899' }}>
                <item.icon size={24} />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.4 }}>
                {item.label}
              </h3>
            </Card>
          ))}
        </div>
      </Section>

      <ClientMarquee />

      <CtaBand />
    </div>
  );
}
