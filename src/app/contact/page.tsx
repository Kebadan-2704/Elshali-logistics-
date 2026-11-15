import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, MapPin, Building2, User, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import CtaBand from '@/components/ui/CtaBand';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Dispatch & Office | ELSHALI LOGISTICS',
  description:
    'Contact ELSHALI LOGISTICS commercial dispatch desk in Coimbatore, Tamil Nadu. Direct phone, email, WhatsApp, and freight inquiry support.',
  alternates: {
    canonical: getCanonicalUrl('/contact'),
  },
  openGraph: {
    title: 'Contact Dispatch & Office | ELSHALI LOGISTICS',
    description: 'Contact ELSHALI LOGISTICS commercial dispatch desk. Direct phone, WhatsApp, and inquiry support.',
    url: getCanonicalUrl('/contact'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

const additionalPhones = [
  siteConfig.phone2,
  siteConfig.phone3,
  siteConfig.phone4,
  siteConfig.phone5,
];

export default function ContactPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <PageHero
        badge="Dispatch & Customer Care"
        badgeIcon={<Phone size={14} />}
        title="Connect with Our"
        highlight="Commercial Dispatch Desk"
        subtitle={`Have a freight inquiry, regular transport requirement, or need urgent vehicle placement? Reach out to ${siteConfig.name} directly.`}
      />

      <Section>
        <div className="split-layout">
          {/* Left: Contact Info */}
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                Direct Office & Dispatch Details
              </h2>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6 }}>
                Our coordinators assist shippers across India with route feasibility, rates, and truck assignment.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {/* Contact Person */}
              <Card variant="glass" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899' }}>
                    <User size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Commercial Lead</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>{siteConfig.contactPerson}</div>
                  </div>
                </div>
              </Card>

              {/* Primary Phone */}
              <Card variant="glass" style={{ padding: '16px 20px' }}>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary Phone (Direct Dispatch)</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>+91 {siteConfig.phone}</div>
                  </div>
                </a>
              </Card>

              {/* Email */}
              <Card variant="glass" style={{ padding: '16px 20px' }}>
                <a
                  href={`mailto:${siteConfig.email}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Official Correspondence</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>{siteConfig.email}</div>
                  </div>
                </a>
              </Card>

              {/* Location */}
              <Card variant="glass" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Head Office Location</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>{siteConfig.address}</div>
                  </div>
                </div>
              </Card>

              {/* GSTIN */}
              <Card variant="glass" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899' }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GSTIN Registered</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>{siteConfig.gstin}</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional Numbers */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                Additional Regional Dispatch Numbers
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {additionalPhones.map((num, i) => (
                  <a
                    key={i}
                    href={`tel:${num}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#F8FAFC',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      textDecoration: 'none',
                    }}
                  >
                    <Phone size={13} color="#EC4899" /> {num}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <Card variant="glass" style={{ padding: '36px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
                Send Dispatch a Message
              </h2>
              <p style={{ fontSize: '14px', color: '#94A3B8' }}>
                Fill out the form below and our team will get back to you shortly.
              </p>
            </div>

            <ContactForm />

            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
              <span style={{ fontSize: '13px', color: '#94A3B8' }}>Looking for vehicle rate quotes? </span>
              <Link href="/quote" style={{ color: '#EC4899', fontSize: '13px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Request Freight Rate <ArrowRight size={13} />
              </Link>
            </div>
          </Card>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
