import type { Metadata } from 'next';
import { ClipboardList, Phone, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import CtaBand from '@/components/ui/CtaBand';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';
import QuoteForm from '@/components/forms/QuoteForm';

export const metadata: Metadata = {
  title: 'Request Freight Rate Quote | ELSHALI LOGISTICS',
  description:
    'Get competitive commercial freight rates for cargo solutions and road transport across India. Fast vehicle placement and transparent pricing.',
  alternates: {
    canonical: getCanonicalUrl('/quote'),
  },
  openGraph: {
    title: 'Request Freight Rate Quote | ELSHALI LOGISTICS',
    description: 'Get competitive commercial freight rates for cargo solutions and road transport across India.',
    url: getCanonicalUrl('/quote'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

export default function QuotePage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Request A Quote' }]} />

      <PageHero
        badge="Instant Rate Calculation"
        badgeIcon={<ClipboardList size={14} />}
        title="Get Your Commercial"
        highlight="Freight Rate Quote"
        subtitle={`Submit your route, commodity type, and vehicle requirements. Our commercial dispatch team coordinates placement and provides competitive rates.`}
      />

      <Section>
        <div className="split-layout">
          {/* Main Form Box */}
          <Card variant="glass" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #B8006D, #EC4899)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <ClipboardList size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>
                  Freight Rate Request Form
                </h2>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: '2px 0 0' }}>
                  {siteConfig.name} Pan-India Commercial Freight
                </p>
              </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '24px' }} />

            <QuoteForm variant="page" />
          </Card>

          {/* Right Information & Trust Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Urgent dispatch card */}
            <Card variant="gradient" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                Need Immediate Spot Placement?
              </h3>
              <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '20px' }}>
                For same-day loading, time-critical materials, or immediate truck placement, connect directly with our senior dispatch coordinator.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#FFFFFF',
                    color: '#060B16',
                    fontWeight: 700,
                    fontSize: '14px',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={16} /> Direct Dispatch: +91 {siteConfig.phone}
                </a>
                <a
                  href={`https://wa.me/91${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#25D366',
                    color: '#060B16',
                    fontWeight: 700,
                    fontSize: '14px',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                  }}
                >
                  WhatsApp Fast Response
                </a>
              </div>
            </Card>

            {/* Checklist */}
            <Card variant="glass" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
                Our Freight Rate Commitment
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: Clock, title: 'Rapid Quote Turnaround', desc: 'Commercial rate proposals typically returned within 15–30 minutes during business hours.' },
                  { icon: ShieldCheck, title: 'Verified Driver & Vehicle', desc: 'Every placed truck is verified with authentic RC, fitness, permit, and driver KYC.' },
                  { icon: CheckCircle2, title: 'No Hidden Charges', desc: 'Transparent freight agreements with clear toll, loading, and transit terms.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ color: '#EC4899', marginTop: '2px' }}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{item.title}</div>
                      <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <FaqAccordion
          title="Freight Quotation &amp; Booking FAQs"
          subtitle="Answers to common questions regarding rate estimation, turnaround times, and contract terms."
          items={[
            {
              question: 'How are commercial freight rates calculated?',
              answer: 'Quotes are calculated based on origin and destination highway mileage, selected vehicle tonnage class, cargo dimensions, material weight, and whether dedicated point-to-point Full Truckload (FTL) or consolidated Part Truckload (PTL) carriage is selected.',
            },
            {
              question: 'How quickly will our company receive a quote confirmation?',
              answer: 'For active industrial routes, our senior dispatch desk reviews payload specifications and contacts you within 15 to 30 minutes with vehicle availability and confirmed freight rates.',
            },
            {
              question: 'Is transit cargo insurance included with the transport rate?',
              answer: 'Standard carrier liability applies under the Carriage by Road Act 2007. Consignors may provide their own marine/transit insurance policy or request commercial carrier risk cover prior to vehicle dispatch.',
            },
            {
              question: 'Can enterprises establish recurring plant contracts?',
              answer: 'Yes. We support annual and quarterly corporate contracts with fixed route tariffs, dedicated vehicle placement SLAs, and consolidated monthly billing for verified industrial manufacturing plants.',
            },
          ]}
        />
      </Section>

      <CtaBand />
    </div>
  );
}
