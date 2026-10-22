'use client';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';

const services = [
  {
    num: '01', title: 'Full Truck Load – FTL',
    desc: 'Complete vehicle transportation for customers requiring dedicated vehicle movement.',
    features: ['Dedicated vehicle movement', 'Full load capacity utilization', 'Direct route delivery'],
    pink: true,
  },
  {
    num: '02', title: 'Dedicated Vehicle Placement',
    desc: 'Vehicles arranged specifically for regular or dedicated transportation requirements.',
    features: ['Regular schedule support', 'Consistent vehicle supply', 'Route-specific placement'],
  },
  {
    num: '03', title: 'Door-to-Door Transportation',
    desc: 'Pickup from the required location and delivery directly to the destination.',
    features: ['Pickup coordination', 'Direct delivery', 'End-to-end tracking'],
  },
  {
    num: '04', title: 'Regular Vehicle Placement',
    desc: 'Suitable vehicles arranged for companies with recurring transportation requirements.',
    features: ['Recurring schedule', 'Consistent vehicle quality', 'Priority placement'],
  },
  {
    num: '05', title: 'Industrial Transportation',
    desc: 'Transportation support for manufacturing and industrial companies.',
    features: ['Factory-to-factory transit', 'Heavy material handling', 'Industrial compliance'],
  },
  {
    num: '06', title: 'Machinery Transportation',
    desc: 'Vehicle arrangements for machinery, equipment and industrial materials.',
    features: ['Heavy machinery loading', 'Custom securing', 'Specialized vehicles'],
  },
  {
    num: '07', title: 'Pan-India Transportation',
    desc: 'Transportation solutions covering North India, South India and major destinations across India.',
    features: ['Interstate connectivity', 'Route optimization', 'Nationwide service network'],
  },
];

export default function ServicesPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Our Services</span>
        <h1 className="page-hero-title">
          Transportation <span className="highlight">Services</span>
        </h1>
        <p className="page-hero-subtitle">
          Professional road transportation solutions tailored to your business requirements — from local deliveries to pan-India long-haul routes.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="grid-2 animate-fade-up">
            {services.map((s, i) => (
              <div key={i} className={`service-card ${s.pink ? 'card-pink' : ''}`}>
                <div className="service-card-number">{s.num}</div>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-text">{s.desc}</p>
                <div className="service-card-features">
                  <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: s.pink ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginBottom: '4px' }}>Features Included</div>
                  {s.features.map((f, j) => (
                    <div key={j} className="service-card-feature">
                      <div className="service-card-feature-icon" style={s.pink ? { background: 'rgba(255,255,255,0.2)', color: 'white' } : {}}>✓</div>
                      <span style={s.pink ? { color: 'rgba(255,255,255,0.9)' } : {}}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }} className="animate-fade-up">
            <Link href="/quote" className="btn btn-primary btn-lg">
              Request Transportation Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
