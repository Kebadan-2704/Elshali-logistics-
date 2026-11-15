import type { Metadata } from 'next';
import { Globe, Truck, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import { corridors } from '@/data/routes';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Pan-India Freight Transportation & Corridors | ELSHALI',
  description:
    'Nationwide commercial road freight connecting South India to North India, West India, and East India with fast vehicle placement and verified drivers.',
  alternates: {
    canonical: getCanonicalUrl('/pan-india'),
  },
  openGraph: {
    title: 'Pan-India Freight Transportation & Corridors | ELSHALI',
    description: 'Nationwide commercial road freight connecting North, South, East, and West India with fast vehicle placement.',
    url: getCanonicalUrl('/pan-india'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

const routeTypes = [
  'Factory to Industrial Warehouse Hub',
  'Inter-State Manufacturing Plant to Plant',
  'Port & Inland Container Depot (ICD) Movement',
  'Wholesale Supplier to Commercial Distributor',
  'Multi-Drop Door Delivery Routes',
];

export default function PanIndiaPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Pan-India Reach' }]} />

      <PageHero
        badge="Nationwide Transport"
        badgeIcon={<Globe size={14} />}
        title="Connecting North, South, East"
        highlight="& West India"
        subtitle={`${siteConfig.name} provides commercial freight haulage across India's premier industrial corridors, ensuring seamless vehicle placement for long-haul routes.`}
      />

      <Section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-badge">Corridors</div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Major Regional <span className="highlight">Freight Corridors</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            Direct connectivity spanning key manufacturing hubs, industrial clusters, and distribution gateways.
          </p>
        </div>

        <div className="grid-2">
          {corridors.map((c) => (
            <Card key={c.id} variant="glass" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#EC4899', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Zone #{c.id}
                </span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                {c.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
                {c.description}
              </p>
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Key Connected States
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {c.states.map((st, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '12px',
                        color: '#CBD5E1',
                      }}
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="split-layout">
          <div>
            <div className="section-badge">Route Flex</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              Flexible Dispatch <span className="highlight">Formats</span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              We adapt vehicle placement to your specific supply chain geometry. From direct single-source full truckloads to multi-stage warehouse distribution, our dispatchers coordinate the entire movement.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {routeTypes.map((rt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899', flexShrink: 0 }}>
                    <Truck size={14} />
                  </div>
                  <span style={{ fontSize: '14px', color: '#E2E8F0', fontWeight: 500 }}>{rt}</span>
                </div>
              ))}
            </div>
          </div>

          <Card variant="gradient" style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px' }}>
              Pan-India Route Rate Estimation
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              Get verified market rates for any interstate corridor. Our rates include transparent transit schedules and toll clarity.
            </p>
            <div>
              <Button href="/quote" variant="outline" size="lg" style={{ background: '#FFFFFF', color: '#060B16', fontWeight: 700 }}>
                Get Route Rate Quote <ArrowRight size={16} />
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
