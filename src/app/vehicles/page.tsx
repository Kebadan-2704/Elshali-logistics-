import type { Metadata } from 'next';
import { Truck, ShieldCheck, Phone } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import CtaBand from '@/components/ui/CtaBand';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';
import VehiclesGrid from '@/components/vehicles/VehiclesGrid';

export const metadata: Metadata = {
  title: 'Commercial Fleet & Freight Vehicles | ELSHALI LOGISTICS',
  description:
    'Commercial fleet solutions across India: Mini Trucks, Tata Pickups, 14 Ft, 17 Ft, 20 Ft, 24 Ft, 26 Ft, and 32 Ft SXL/MXL multi-axle freight trailers.',
  alternates: {
    canonical: getCanonicalUrl('/vehicles'),
  },
  openGraph: {
    title: 'Commercial Fleet & Freight Vehicles | ELSHALI LOGISTICS',
    description: 'Commercial fleet solutions across India: Mini Trucks, Pickups, 14-32 Ft multi-axle trailers.',
    url: getCanonicalUrl('/vehicles'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

export default function VehiclesPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Commercial Fleet' }]} />

      <PageHero
        badge="Commercial Fleet Solutions"
        badgeIcon={<Truck size={14} />}
        title="Verified Commercial Fleet for"
        highlight="Pan-India Freight"
        subtitle={`From intra-city light commercial vehicles to heavy-duty multi-axle freight trailers, ${siteConfig.name} provides placement-ready commercial vehicles across all key industrial corridors.`}
      />

      <Section>
        <VehiclesGrid />
      </Section>

      {/* Fleet Assurance Banner */}
      <Section>
        <Card variant="gradient" style={{ padding: '36px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF', fontWeight: 700, marginBottom: '8px' }}>
                <ShieldCheck size={20} color="#EC4899" />
                Driver &amp; Vehicle Verification
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6 }}>
                All placed vehicles undergo strict documentation checks including RC, commercial permits, fitness certificates, and driver background verification.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF', fontWeight: 700, marginBottom: '8px' }}>
                <Truck size={20} color="#EC4899" />
                Fast Vehicle Placement
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6 }}>
                Direct access to verified vehicle networks across Tamil Nadu, Karnataka, Maharashtra, Gujarat, Andhra Pradesh, and Telangana.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF', fontWeight: 700, marginBottom: '8px' }}>
                <Phone size={20} color="#EC4899" />
                Dedicated Dispatch Desk
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6 }}>
                Direct line to dispatch coordinators from loading to delivery milestone tracking and signed POD confirmation.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      <CtaBand />
    </div>
  );
}
