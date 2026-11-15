import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import CtaBand from '@/components/ui/CtaBand';
import { siteConfig, LEGAL_REVIEWED } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Privacy Policy | ELSHALI LOGISTICS',
  description:
    'Data protection and privacy practices for freight rate inquiries and commercial logistics operations at ELSHALI LOGISTICS.',
  alternates: {
    canonical: getCanonicalUrl('/privacy'),
  },
  openGraph: {
    title: 'Privacy Policy | ELSHALI LOGISTICS',
    description: 'Data protection and privacy practices for freight inquiries at ELSHALI LOGISTICS.',
    url: getCanonicalUrl('/privacy'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

export default function PrivacyPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <PageHero
        badge="Data Protection"
        badgeIcon={<Shield size={14} />}
        title="Privacy & Data Governance"
        highlight="Policy"
        subtitle={`How ${siteConfig.name} safeguards commercial contact details, shipment manifests, and enterprise logistics information.`}
      />

      <Section containerClassName="max-w-4xl">
        <Card variant="glass" style={{ padding: '40px 32px' }}>
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(236, 72, 153, 0.08)',
              border: '1px solid rgba(236, 72, 153, 0.25)',
              marginBottom: '32px',
              fontSize: '13px',
              color: '#CBD5E1',
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: '#EC4899' }}>Data Governance Notice:</strong> This privacy outline details our internal procedures for managing commercial quotation requests and consignment records. Formal data retention and statutory compliance clauses remain subject to verified statutory review by legal counsel for {siteConfig.legalName}.
            {!LEGAL_REVIEWED && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#94A3B8' }}>
                Last updated: November 2026. Version 1.0 (Operational Guidelines — Subject to formal legal counsel review).
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#CBD5E1', fontSize: '15px', lineHeight: 1.8 }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                1. Information We Collect
              </h2>
              <p>
                When you submit freight rate quote requests or contact {siteConfig.name}, we collect enterprise and contact details including your full name, company name, phone number, email address, commodity specifications, pickup location, and delivery destination. This data is utilized solely to assess vehicle placement feasibility, calculate freight quotes, and execute transport bookings.
              </p>
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                2. Operational Use of Information
              </h2>
              <p>
                Customer and consignment data is utilized exclusively for dispatch coordination, driver assignment, transport billing, milestone updates, and statutory compliance under Indian transport and GST laws. We do not sell, rent, or trade customer or enterprise data to external marketing vendors.
              </p>
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                3. Data Storage & Security
              </h2>
              <p>
                All digital transmissions across our website occur over encrypted HTTPS/TLS protocols. Access to freight manifests, billing records, and client records is restricted strictly to authorized operations personnel.
              </p>
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                4. Statutory Compliance & Inquiries
              </h2>
              <p>
                For questions regarding data protection practices or statutory compliance, contact our commercial operations desk at{' '}
                <a href={`mailto:${siteConfig.email}`} style={{ color: '#EC4899', textDecoration: 'underline' }}>
                  {siteConfig.email}
                </a>{' '}
                or phone{' '}
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} style={{ color: '#EC4899', textDecoration: 'underline' }}>
                  +91 {siteConfig.phone}
                </a>.
              </p>
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                5. AI Dispatch Assistant & Processing Disclosure
              </h2>
              <p>
                Our website provides an optional automated AI logistics assistant to provide instant vehicle capacity, hub information, and rate inquiry assistance. Chat interactions are processed in real time via secure server-side API integration with certified LLM infrastructure providers (e.g., Google Cloud Gemini / OpenAI API) under zero-data-retention commercial API terms. Conversations are never sold or used for public model training. Users should avoid transmitting sensitive financial credentials, banking passwords, or personal identity numbers via the chat interface.
              </p>
              {/* TODO: Owner to confirm LLM provider name, data processing agreement (DPA), and primary enterprise API account */}
            </div>
          </div>
        </Card>
      </Section>

      <CtaBand />
    </div>
  );
}
