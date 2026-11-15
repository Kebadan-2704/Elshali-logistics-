import type { Metadata } from 'next';
import { FileCheck } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import CtaBand from '@/components/ui/CtaBand';
import { siteConfig, LEGAL_REVIEWED } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Terms of Carriage & Service | ELSHALI LOGISTICS',
  description:
    'Commercial carriage terms, freight quotation policies, shipper obligations, and vehicle placement guidelines for ELSHALI LOGISTICS.',
  alternates: {
    canonical: getCanonicalUrl('/terms'),
  },
  openGraph: {
    title: 'Terms of Carriage & Service | ELSHALI LOGISTICS',
    description: 'Commercial carriage terms and vehicle placement guidelines for ELSHALI LOGISTICS.',
    url: getCanonicalUrl('/terms'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

export default function TermsPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />

      <PageHero
        badge="Operating Terms"
        badgeIcon={<FileCheck size={14} />}
        title="Commercial Carriage &"
        highlight="Service Terms"
        subtitle={`Standard commercial conditions governing vehicle placement, freight quotations, and road transit with ${siteConfig.name}.`}
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
            <strong style={{ color: '#EC4899' }}>Notice to Shippers &amp; Consignors:</strong> These standard commercial conditions represent provisional operating guidelines for vehicle placement, freight quotations, and road carriage. Formal contractual carriage agreements and liability clauses remain subject to verified statutory review by legal counsel for {siteConfig.legalName}.
            {!LEGAL_REVIEWED && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#94A3B8' }}>
                Last updated: November 2026. Version 1.0 (Operational Guidelines — Subject to formal legal counsel review).
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#CBD5E1', fontSize: '15px', lineHeight: 1.8 }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                1. Carriage &amp; Service Engagement
              </h2>
              <p>
                By booking freight carriage or requesting vehicle placement with {siteConfig.name}, the shipper or consignor accepts the operational terms detailed herein. {siteConfig.name} facilitates commercial road transportation via light commercial vehicles (LCV) and heavy commercial vehicles (HCV) across Tamil Nadu and pan-India transit corridors.
              </p>
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                2. Quotations, Freight Rates &amp; Placement
              </h2>
              <p>
                Freight rate quotations issued online, by email, or via dispatch communication represent commercial estimates formulated upon stated cargo dimensions, commodity weights, loading dates, and route distances. Rates become firm upon vehicle assignment and consignment note issuance. Highway tolls, detention beyond standard loading allowances, and local entry permits apply as mutually agreed.
              </p>
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                3. Shipper Declarations &amp; Statutory Compliance
              </h2>
              <p>
                The consignor warrants that all goods presented for carriage comply with the Motor Vehicles Act, Central Goods and Services Tax (CGST) requirements, valid electronic E-Way bills, and applicable state transit permits. Carriage of undeclared hazardous or contraband goods is strictly barred.
              </p>
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                4. Transit Diligence &amp; Insurance Recommendations
              </h2>
              <p>
                {siteConfig.name} exercises commercial care in vehicle vetting, driver verification, and transit monitoring. However, highway transit remains subject to weather conditions, checkpost verifications, and external road constraints. Shippers are strongly advised to secure comprehensive transit insurance covering the full declared invoice value of the cargo.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      <CtaBand />
    </div>
  );
}
