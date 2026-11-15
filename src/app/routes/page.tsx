import type { Metadata } from 'next';
import Link from 'next/link';
import { Map, MapPin, ArrowRight, Factory, Building2, Box, Home } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import { corridors, tamilNaduHubs } from '@/data/routes';
import { siteConfig, getCanonicalUrl, getOgImageUrl } from '@/data/site';

export const metadata: Metadata = {
  title: 'Commercial Freight Routes & National Corridors | ELSHALI LOGISTICS',
  description:
    'Pan-India highway freight routes, key Tamil Nadu industrial clusters, interstate transport corridors, and dedicated Coimbatore to Chennai daily placement.',
  alternates: {
    canonical: getCanonicalUrl('/routes'),
  },
  openGraph: {
    title: 'Commercial Freight Routes & National Corridors | ELSHALI LOGISTICS',
    description: 'Explore ELSHALI LOGISTICS Pan-India transport corridors, regional hubs, and dedicated freight lanes.',
    url: getCanonicalUrl('/routes'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS Freight Routes' }],
    locale: 'en_IN',
    type: 'website',
  },
};

const routeFormats = [
  { icon: Factory, from: 'Factory', to: 'Factory', desc: 'Direct plant-to-plant raw material or parts movement.' },
  { icon: Factory, from: 'Factory', to: 'Warehouse', desc: 'Inbound inventory replenishment for regional hubs.' },
  { icon: Building2, from: 'Warehouse', to: 'Customer', desc: 'Scheduled commercial delivery to dealer networks.' },
  { icon: Box, from: 'Supplier', to: 'Factory', desc: 'Just-in-time supplier component logistics.' },
  { icon: Home, from: 'Door', to: 'Door Delivery', desc: 'Full-truckload end-to-end dedicated transit.' },
];

export default function RoutesPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Commercial Routes' }]} />

      <PageHero
        badge="Pan-India Logistics"
        badgeIcon={<Map size={14} />}
        title="Commercial Transit Routes &"
        highlight="National Corridors"
        subtitle={`Connecting major industrial manufacturing centers, raw material hubs, and consumption markets across India with dependable vehicle placement.`}
      />

      {/* Featured Arterial Corridor Banner */}
      <Section>
        <Card variant="gradient" style={{ padding: '28px 32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.85)', marginBottom: '6px' }}>
                FEATURED ARTERIAL CORRIDOR &bull; DAILY DISPATCH
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                Coimbatore &ndash; Chennai Direct Highway Freight
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', maxWidth: '620px', lineHeight: 1.6, margin: 0 }}>
                Daily vehicle placement linking Coimbatore engineering foundries, pumps, and textile clusters with Chennai OEMs, Ambattur, Sriperumbudur &amp; Ennore port. 10&ndash;14 hr overnight transit.
              </p>
            </div>
            <Link
              href="/routes/coimbatore-to-chennai"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                color: '#060B16',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px 22px',
                borderRadius: '12px',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <span>View Route Details &amp; Sizing</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </Card>

        {/* Interstate Corridors */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-badge">National Network</div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Primary Interstate <span className="highlight">Transit Corridors</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            Regular commercial linehaul movement powered by verified carrier partners across national highways.
          </p>
        </div>

        <div className="grid-2">
          {corridors.map((c, i) => (
            <Card key={i} variant="glass" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#EC4899' }}>
                  {c.id}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    background: 'rgba(236, 72, 153, 0.1)',
                    color: '#EC4899',
                  }}
                >
                  Pan-India Transit
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                {c.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
                {c.description}
              </p>
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Coverage States
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {c.states.map((st, j) => (
                    <span
                      key={j}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
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

      {/* Regional Industrial Hubs */}
      <Section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-badge">Regional Density</div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Tamil Nadu <span className="highlight">Industrial Logistics Hubs</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            Same-day and express vehicle placement available across key commercial and manufacturing districts.
          </p>
        </div>

        <div className="grid-3">
          {tamilNaduHubs.map((hub, i) => (
            <Card key={i} variant="glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(236, 72, 153, 0.12)',
                  color: '#EC4899',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '2px' }}>
                  {hub.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                  {hub.descriptor}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Route Formats */}
      <Section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-badge">Routing Topology</div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Flexible Commercial <span className="highlight">Route Formats</span>
          </h2>
        </div>

        <div className="grid-3">
          {routeFormats.map((rf, i) => (
            <Card key={i} variant="glass" style={{ textAlign: 'center', padding: '28px 20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#EC4899' }}>
                <rf.icon size={24} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {rf.from} <ArrowRight size={14} color="#EC4899" /> {rf.to}
              </h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>
                {rf.desc}
              </p>
            </Card>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Button href="/quote" variant="primary" size="lg">
            Request Route Specific Freight Quote <ArrowRight size={16} />
          </Button>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
