import type { Metadata } from 'next';
import { Route, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Vehicle Placement & Freight Process | ELSHALI LOGISTICS',
  description:
    'Our transparent 10-step vehicle placement and cargo transport process: from freight quote and vehicle reporting to transit monitoring and signed POD.',
  alternates: {
    canonical: getCanonicalUrl('/process'),
  },
  openGraph: {
    title: 'Vehicle Placement & Freight Process | ELSHALI LOGISTICS',
    description: 'Our transparent 10-step vehicle placement and cargo transport process from quote to signed POD.',
    url: getCanonicalUrl('/process'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

const steps = [
  { step: '01', title: 'Requirement Intake', text: 'Shipper shares origin, destination, cargo classification, estimated weight, and target loading date.' },
  { step: '02', title: 'Route & Sizing Analysis', text: 'Our dispatch team evaluates route topography, highway tolls, and optimal vehicle sizing (LCV / HCV).' },
  { step: '03', title: 'Competitive Freight Proposal', text: 'We provide a transparent, all-inclusive freight rate quote tailored to your cargo schedule.' },
  { step: '04', title: 'Booking & Rate Confirmation', text: 'Upon confirmation, vehicle assignment is initiated and confirmed with driver details.' },
  { step: '05', title: 'Placement at Pickup Bay', text: 'The verified vehicle reports at the sender loading dock as scheduled with verified driver credentials.' },
  { step: '06', title: 'Loading & Dispatch Clearance', text: 'Consignment is securely loaded, verified against LR documentation, and cleared for departure.' },
  { step: '07', title: 'Active Transit Monitoring', text: 'Our dedicated dispatch desk tracks highway milestone progress and communicates status updates.' },
  { step: '08', title: 'Scheduled Destination Arrival', text: 'Vehicle arrives at the consignee unloading facility within agreed commercial transit windows.' },
  { step: '09', title: 'Unloading & Stamped POD', text: 'Material is safely unloaded and delivery acknowledgment / Proof of Delivery (POD) is secured.' },
  { step: '10', title: 'Consolidated Billing & Records', text: 'Final commercial invoice, soft/hard copy POD, and GST-compliant records are delivered for settlement.' },
];

export default function ProcessPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Our Process' }]} />

      <PageHero
        badge="Operating Workflow"
        badgeIcon={<Route size={14} />}
        title="Vehicle Placement &"
        highlight="Transit Process"
        subtitle={`From rate inquiry to signed delivery receipt, discover the structured 10-step logistics workflow of ${siteConfig.name}.`}
      />

      <Section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            A Structured, <span className="highlight">Predictable Transit Lifecycle</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            Zero ambiguity. Constant communication. Complete operational transparency at every milestone.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {steps.map((s, i) => (
            <Card key={i} variant="glass" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '24px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #B8006D, #EC4899)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {s.step}
              </div>
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>
                  {s.text}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Button href="/quote" variant="primary" size="lg">
            Initiate Step 1: Request A Freight Quote <ArrowRight size={16} />
          </Button>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
