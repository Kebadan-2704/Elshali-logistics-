import type { Metadata } from 'next';
import { Calendar, CalendarDays, CalendarRange, Factory, Route, Globe, Truck, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Regular & Dedicated Transport Contracts | ELSHALI LOGISTICS',
  description:
    'Dedicated vehicle placement and scheduled commercial transport solutions for daily, weekly, and monthly factory supply chains across India.',
  alternates: {
    canonical: getCanonicalUrl('/regular-transport'),
  },
  openGraph: {
    title: 'Regular & Dedicated Transport Contracts | ELSHALI LOGISTICS',
    description: 'Dedicated vehicle placement and scheduled commercial transport solutions for factories and distributors.',
    url: getCanonicalUrl('/regular-transport'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

const contractTypes = [
  { icon: Calendar, title: 'Daily Scheduled Runs', text: 'Fixed daily vehicle reporting for high-frequency assembly line supplies and warehouse shuttles.' },
  { icon: CalendarDays, title: 'Weekly Recurring Dispatch', text: 'Predictable weekly truck placement for regional distribution and dealer restocking.' },
  { icon: CalendarRange, title: 'Monthly Contract Freight', text: 'Guaranteed monthly vehicle capacity at pre-negotiated, stable commercial freight rates.' },
  { icon: Factory, title: 'Inter-Plant Factory Transfer', text: 'Continuous round-trip shuttle service connecting raw material sites to central manufacturing units.' },
  { icon: Route, title: 'Dedicated Corridor Allocation', text: 'Vehicles and verified commercial drivers exclusively assigned to your specified highway routes.' },
  { icon: Globe, title: 'Pan-India Distribution Support', text: 'Scheduled long-haul freight connections linking production plants to national distribution centers.' },
];

export default function RegularTransportPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Regular Transport' }]} />

      <PageHero
        badge="Contract Logistics"
        badgeIcon={<CalendarDays size={14} />}
        title="Regular & Dedicated"
        highlight="Transportation Support"
        subtitle={`For enterprises with recurrent freight demands, ${siteConfig.name} arranges dedicated vehicle capacity tailored to your schedule, corridors, and SLA parameters.`}
      />

      <Section>
        <div className="split-layout">
          <div>
            <div className="section-badge">Dedicated Placement</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              Predictable Freight Capacity, <br />
              <span className="highlight">Zero Spot Risk</span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
              Relying solely on the spot freight market introduces vehicle availability fluctuations and unpredictable price spikes. {siteConfig.name} provides regular contract transport models designed to stabilize your logistics pipeline.
            </p>
            <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
              We dedicate verified commercial vehicles (from Mini Trucks to 32 Ft High-Cube Containers) exclusively to your operations with agreed transit turnaround times and single-point dispatch coordination.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button href="/quote" variant="primary">
                Discuss Contract Terms
              </Button>
              <Button href="/contact" variant="outline">
                Contact Dispatch Lead
              </Button>
            </div>
          </div>

          <Card variant="gradient" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '18px' }}>
              <Truck size={28} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              Dedicated Fleet Benefits
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#fff" /> Guaranteed vehicle availability on scheduled days
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#fff" /> Pre-negotiated stable freight pricing without spot spikes
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#fff" /> Familiar, verified drivers trained on your loading safety protocols
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#fff" /> Consolidated monthly billing and digital POD transmission
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Flexible Regular <span className="highlight">Engagement Models</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            Choose the frequency and contract format that matches your commercial production cycles.
          </p>
        </div>

        <div className="grid-3">
          {contractTypes.map((item, i) => (
            <Card key={i} variant="glass" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899', marginBottom: '16px' }}>
                <item.icon size={22} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, flexGrow: 1 }}>
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
