import type { Metadata } from 'next';
import { Building2, Landmark, User, Phone, Mail, Globe, ShieldCheck, MapPin } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import CtaBand from '@/components/ui/CtaBand';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Company Information & GSTIN | ELSHALI LOGISTICS',
  description:
    'Official corporate credentials, GSTIN registration details, commercial dispatch contacts, and pan-India service coverage of ELSHALI LOGISTICS.',
  alternates: {
    canonical: getCanonicalUrl('/company'),
  },
  openGraph: {
    title: 'Company Information & GSTIN | ELSHALI LOGISTICS',
    description: 'Official corporate credentials, GSTIN registration details, and dispatch contacts of ELSHALI LOGISTICS.',
    url: getCanonicalUrl('/company'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
    type: 'website',
  },
};

const coverageZones = [
  'South India (Tamil Nadu, Karnataka, Kerala, AP, Telangana)',
  'North India (Delhi NCR, Haryana, Punjab, UP, Rajasthan)',
  'West India (Maharashtra, Gujarat, Goa, Madhya Pradesh)',
  'East India (West Bengal, Odisha, Jharkhand, Bihar)',
  'Central Logistics Corridors & Industrial Gateways',
];

const dispatchNumbers = [
  siteConfig.phone2,
  siteConfig.phone3,
  siteConfig.phone4,
  siteConfig.phone5,
];

export default function CompanyPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Company Profile' }]} />

      <PageHero
        badge="Corporate Profile"
        badgeIcon={<Building2 size={14} />}
        title="Official Enterprise Details"
        highlight="& Compliance"
        subtitle={`Verify the commercial registrations, dispatch contacts, and statutory credentials of ${siteConfig.name}.`}
      />

      <Section>
        <div className="split-layout">
          {/* Left Column: Business Credentials */}
          <div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '24px' }}>
              Statutory & <span className="highlight">Contact Credentials</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Trade / Brand Name', value: siteConfig.name, icon: Building2 },
                { label: 'Registered GSTIN', value: siteConfig.gstin, icon: Landmark },
                { label: 'Authorised Contact', value: siteConfig.contactPerson, icon: User },
                { label: 'Primary Dispatch Phone', value: `+91 ${siteConfig.phone}`, icon: Phone, href: `tel:${siteConfig.phone}` },
                { label: 'Official Inquiries Email', value: siteConfig.email, icon: Mail, href: `mailto:${siteConfig.email}` },
                { label: 'Headquarters Location', value: siteConfig.address, icon: MapPin },
              ].map((item, i) => (
                <Card key={i} variant="glass" style={{ padding: '18px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(236, 72, 153, 0.1)',
                        border: '1px solid rgba(236, 72, 153, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#EC4899',
                      }}
                    >
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF', textDecoration: 'none' }}>
                          {item.value}
                        </a>
                      ) : (
                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>{item.value}</div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
                Additional Regional Dispatch Contacts
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {dispatchNumbers.map((num, i) => (
                  <a
                    key={i}
                    href={`tel:${num}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      color: '#F8FAFC',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    <Phone size={14} color="#EC4899" /> {num}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: GST & Coverage */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card variant="gradient">
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Globe size={20} /> Pan-India Route Reach
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {coverageZones.map((zone, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 14px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      fontSize: '13px',
                      color: '#FFFFFF',
                      lineHeight: 1.5,
                    }}
                  >
                    {zone}
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="glass">
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
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                GST Compliant & Audit Ready
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '12px' }}>
                All freight movements facilitated by {siteConfig.name} comply with Indian GST laws, electronic E-Way bills, valid consignment notes, and prompt proof of delivery (POD) documentation.
              </p>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#EC4899' }}>
                GSTIN: {siteConfig.gstin}
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
