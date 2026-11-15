import type { Metadata } from 'next';
import { Factory, Cog, BarChart3, Store, Truck, Building2, CheckCircle2 } from 'lucide-react';
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
  title: 'Business Solutions | Commercial Road Logistics | ELSHALI',
  description:
    'Tailored transportation solutions for manufacturers, industrial plants, traders, distributors, and corporate supply chains across India.',
  alternates: {
    canonical: getCanonicalUrl('/business-solutions'),
  },
  openGraph: {
    title: 'Business Solutions | Commercial Road Logistics | ELSHALI',
    description: 'Tailored transportation solutions for manufacturers, industrial plants, traders, and distributors across India.',
    url: getCanonicalUrl('/business-solutions'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
    type: 'website',
  },
};

const solutions = [
  {
    icon: Factory,
    title: 'Manufacturing & Production',
    text: 'Regular scheduled movement of raw materials, assembly components, and finished commercial inventory.',
    features: ['Inbound raw material supply', 'Assembly line part dispatch', 'Finished goods warehouse distribution'],
  },
  {
    icon: Cog,
    title: 'Heavy Industry & Engineering',
    text: 'Specialized vehicle placement for heavy equipment, machinery, fabricated metal goods, and industrial parts.',
    features: ['High-capacity trailer placement', 'Specialized lashing & securing', 'Factory-to-project-site transport'],
  },
  {
    icon: BarChart3,
    title: 'Traders & Wholesale Merchants',
    text: 'Flexible inter-city transport linking wholesale suppliers, regional stockyards, and commercial buyers.',
    features: ['Interstate wholesale movement', 'Multi-point pickup/drop options', 'Reliable commercial billing & POD'],
  },
  {
    icon: Store,
    title: 'Distributors & Retail Chains',
    text: 'Predictable regional delivery schedules ensuring stock availability across commercial dealer networks.',
    features: ['Regional distribution corridors', 'Daily & weekly dispatch cycles', 'Safe weatherproof container options'],
  },
  {
    icon: Truck,
    title: '3PL & Logistics Operators',
    text: 'Vehicle placement augmentation to support overflow volume, peak seasons, and dedicated route contracts.',
    features: ['Spot vehicle placement', 'Seasonal peak fleet expansion', 'Direct driver coordination'],
  },
  {
    icon: Building2,
    title: 'Corporate Enterprises',
    text: 'Structured freight agreements with agreed pricing terms, dedicated vehicle allocation, and priority support.',
    features: ['Dedicated vehicle contracts', 'SLA-backed transit timings', 'Senior dispatch desk point-of-contact'],
  },
];

export default function BusinessSolutionsPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Business Solutions' }]} />

      <PageHero
        badge="Enterprise Freight"
        badgeIcon={<Building2 size={14} />}
        title="Commercial Logistics Solutions"
        highlight="For Modern Business"
        subtitle={`${siteConfig.name} empowers manufacturers, industrial enterprises, wholesale traders, and logistics operators with placement-ready road transportation.`}
      />

      <Section>
        <div className="grid-3">
          {solutions.map((s, i) => (
            <Card key={i} variant="glass" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'rgba(236, 72, 153, 0.1)',
                  border: '1px solid rgba(236, 72, 153, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EC4899',
                  marginBottom: '20px',
                }}
              >
                <s.icon size={26} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                {s.title}
              </h2>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
                {s.text}
              </p>
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {s.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#CBD5E1' }}>
                    <CheckCircle2 size={14} color="#EC4899" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Button href="/quote" variant="primary" size="lg">
            Discuss Your Enterprise Requirements
          </Button>
        </div>
      </Section>

      <ClientMarquee />

      <CtaBand />
    </div>
  );
}
