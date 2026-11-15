import type { Metadata } from 'next';
import { Cog, Wrench, Car, HardHat, Zap, CircleDot, Shirt, Box, Factory, Building2, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import CtaBand from '@/components/ui/CtaBand';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Industrial Freight & Cargo Transport | ELSHALI LOGISTICS',
  description:
    'Industrial cargo transport solutions for heavy machinery, automotive components, textiles, steel, electrical equipment, and raw materials across India.',
  alternates: {
    canonical: getCanonicalUrl('/industrial'),
  },
  openGraph: {
    title: 'Industrial Freight & Cargo Transport | ELSHALI LOGISTICS',
    description: 'Industrial cargo transport solutions for machinery, auto components, textiles, steel, and raw materials across India.',
    url: getCanonicalUrl('/industrial'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

const industrialCargoTypes = [
  { icon: Cog, name: 'Industrial Machinery & Spares', desc: 'CNC machines, lathe components, fabrication units, and plant tooling.' },
  { icon: Wrench, name: 'Precision Engineering Parts', desc: 'Finished assemblies, gears, cast components, and machined hardware.' },
  { icon: Car, name: 'Automotive Components', desc: 'OEM assemblies, sub-assemblies, chassis parts, and Tier-1/2 components.' },
  { icon: HardHat, name: 'Construction & Plant Equipment', desc: 'Site equipment, industrial fittings, valves, pumps, and structural units.' },
  { icon: Zap, name: 'Electrical & Automation Products', desc: 'Control panels, industrial transformers, wiring systems, and switchgear.' },
  { icon: CircleDot, name: 'Steel, Metals & Alloys', desc: 'Sheet coils, pipes, steel structures, aluminum extrusions, and billets.' },
  { icon: Shirt, name: 'Textiles, Yarn & Garments', desc: 'Spun yarn bales, grey fabrics, export apparel, and processing chemicals.' },
  { icon: Box, name: 'Corrugated Packaging & Cartons', desc: 'Bulk industrial packaging, corrugated containers, and commercial paper rolls.' },
  { icon: Factory, name: 'Chemicals & Allied Products', desc: 'Non-hazardous industrial pigments, resins, polymers, and raw composites.' },
  { icon: Building2, name: 'General Factory Inbound/Outbound', desc: 'Consolidated vendor supplies, consumables, and inter-plant transfers.' },
];

export default function IndustrialPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Industrial Logistics' }]} />

      <PageHero
        badge="Industrial Cargo Solutions"
        badgeIcon={<Factory size={14} />}
        title="Heavy Industrial &"
        highlight="Manufacturing Logistics"
        subtitle={`${siteConfig.name} delivers specialized vehicle placement for industrial manufacturing units, heavy engineering plants, and commercial suppliers across India.`}
      />

      <Section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-badge">Cargo Capabilities</div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Commodities We Transport with <span className="highlight">Placement Precision</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            From single-part urgent dispatch to multi-truck daily plant clearances, our dispatch desk matches your exact commodity weight and dimension profile.
          </p>
        </div>

        <div className="grid-3">
          {industrialCargoTypes.map((item, i) => (
            <Card key={i} variant="glass" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'rgba(236, 72, 153, 0.1)',
                  border: '1px solid rgba(236, 72, 153, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EC4899',
                  marginBottom: '16px',
                }}
              >
                <item.icon size={24} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, flexGrow: 1 }}>
                {item.desc}
              </p>
            </Card>
          ))}
        </div>

        <div style={{ marginTop: '48px' }}>
          <Card variant="gradient" style={{ textAlign: 'center', padding: '40px 32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>
              <ShieldCheck size={20} /> Verified Transit Safety
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              Need Specialized Industrial Vehicle Placement?
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '640px', margin: '0 auto 24px', fontSize: '15px', lineHeight: 1.7 }}>
              Share your machinery payload weight, length, and destination. We place suitable open-body trucks, containerized vehicles, or heavy-duty trailers with verified commercial drivers.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFFFFF',
                  color: '#060B16',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                }}
              >
                Call Industrial Dispatch: +91 {siteConfig.phone}
              </a>
            </div>
          </Card>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
