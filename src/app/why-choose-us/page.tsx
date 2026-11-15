import type { Metadata } from 'next';
import { Award, ArrowRight, ShieldCheck, Zap, Clock, Headset, Globe, HeartHandshake, Lock, BadgePercent } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import { whyItems } from '@/data/why';
import { siteConfig } from '@/data/site';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Why Choose ELSHALI LOGISTICS | Reliable Freight Partner',
  description:
    'Discover why commercial shippers trust ELSHALI LOGISTICS: competitive market freight rates, rapid vehicle placement, verified drivers, and dedicated dispatch.',
  alternates: {
    canonical: getCanonicalUrl('/why-choose-us'),
  },
  openGraph: {
    title: 'Why Choose ELSHALI LOGISTICS | Reliable Freight Partner',
    description: 'Discover why commercial shippers trust ELSHALI LOGISTICS for reliable freight transportation.',
    url: getCanonicalUrl('/why-choose-us'),
    siteName: siteConfig.name,
    images: [{ url: getOgImageUrl(), width: 800, height: 600, alt: 'ELSHALI LOGISTICS' }],
    locale: 'en_IN',
  },
};

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  'badge-percent': BadgePercent,
  zap: Zap,
  'shield-check': ShieldCheck,
  clock: Clock,
  headset: Headset,
  globe: Globe,
  'heart-handshake': HeartHandshake,
  lock: Lock,
};

export default function WhyChooseUsPage() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Breadcrumb items={[{ label: 'Why Choose Us' }]} />

      <PageHero
        badge="The ELSHALI Advantage"
        badgeIcon={<Award size={14} />}
        title="Why Commercial Shippers"
        highlight="Trust ELSHALI LOGISTICS"
        subtitle={`Engineered for consistency, transparent pricing, and rapid vehicle placement. Here is why industrial enterprises rely on ${siteConfig.name}.`}
      />

      <Section>
        <div className="grid-4">
          {whyItems.map((item, i) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <Card key={i} variant="glass" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(236, 72, 153, 0.1)',
                      border: '1px solid rgba(236, 72, 153, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#EC4899',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#94A3B8' }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, flexGrow: 1 }}>
                  {item.body}
                </p>
              </Card>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Button href="/quote" variant="primary" size="lg">
            Experience the ELSHALI Standard — Get A Quote <ArrowRight size={16} />
          </Button>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
