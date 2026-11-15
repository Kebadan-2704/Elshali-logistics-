import type { Metadata } from 'next';
import { FileText, CheckCircle2, ClipboardList, Truck, User, DollarSign, BarChart3, Building2, Shield } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import CtaBand from '@/components/ui/CtaBand';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Transport Documentation & POD Support | ELSHALI LOGISTICS',
  description:
    'Complete commercial transport documentation support: Lorry Receipts (LR), Proof of Delivery (POD), driver KYC, E-Way bills, and GST compliance.',
  alternates: {
    canonical: getCanonicalUrl('/documentation'),
  },
  openGraph: {
    title: 'Transport Documentation & POD Support | ELSHALI LOGISTICS',
    description: 'Complete commercial transport documentation support: LR, POD, driver KYC, and GST compliance.',
    url: getCanonicalUrl('/documentation'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

const documentationItems = [
  { icon: FileText, title: 'Consignment Note / LR', text: 'Accurate Lorry Receipt documentation generated for every loaded commercial consignment.' },
  { icon: CheckCircle2, title: 'Proof of Delivery (POD)', text: 'Timely collection, verification, and digital transmission of signed recipient delivery acknowledgments.' },
  { icon: ClipboardList, title: 'Loading & Dispatch Logs', text: 'Clear verification of cargo packages, weight manifests, and dispatch departure timestamps.' },
  { icon: Truck, title: 'Vehicle Credentials', text: 'Verified registration certificates (RC), commercial fitness, and valid national transit permits.' },
  { icon: User, title: 'Driver KYC & Contact', text: 'Verified commercial driver licenses, direct mobile coordinates, and emergency contact details.' },
  { icon: DollarSign, title: 'Itemized Freight Invoices', text: 'Transparent freight billing statements detailing haulage, tolls, and loading terms with zero hidden fees.' },
  { icon: BarChart3, title: 'Transit Audit Trail', text: 'Documented transit checkpoints enabling accounts and audit teams to reconcile material arrivals.' },
  { icon: Building2, title: 'GST & E-Way Bill Support', text: `Fully compliant documentation linked to GSTIN ${siteConfig.gstin} and state tax portal requirements.` },
];

export default function DocumentationPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Documentation' }]} />

      <PageHero
        badge="Freight Compliance"
        badgeIcon={<Shield size={14} />}
        title="Commercial Transport"
        highlight="Documentation Support"
        subtitle={`At ${siteConfig.name}, transparent documentation protects your supply chain. We provide complete transit records from pickup gate pass to final signed POD.`}
      />

      <Section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Complete Statutory & <span className="highlight">Operational Documentation</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            Seamless coordination between consignor, transporter, and consignee with complete audit readiness.
          </p>
        </div>

        <div className="grid-4">
          {documentationItems.map((d, i) => (
            <Card key={i} variant="glass" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(236, 72, 153, 0.1)',
                  border: '1px solid rgba(236, 72, 153, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EC4899',
                  marginBottom: '16px',
                }}
              >
                <d.icon size={22} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                {d.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, flexGrow: 1 }}>
                {d.text}
              </p>
            </Card>
          ))}
        </div>

        <div style={{ marginTop: '48px' }}>
          <Card variant="gradient" style={{ textAlign: 'center', padding: '40px 32px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              Absolute Transparency Across Every Consignment
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '680px', margin: '0 auto', fontSize: '15px', lineHeight: 1.7 }}>
              Whether you require soft copies immediately upon unloading or physical stamped POD courier coordination, {siteConfig.name} delivers documented accountability for your accounting and logistics teams.
            </p>
          </Card>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
