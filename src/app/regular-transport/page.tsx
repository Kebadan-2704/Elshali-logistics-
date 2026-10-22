'use client';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { Calendar, CalendarDays, CalendarRange, Factory, Route, Globe, Truck } from 'lucide-react';

const suitableFor = [
  { icon: Calendar, text: 'Daily Requirements' },
  { icon: CalendarDays, text: 'Weekly Requirements' },
  { icon: CalendarRange, text: 'Monthly Requirements' },
  { icon: Factory, text: 'Regular Factory Movements' },
  { icon: Route, text: 'Dedicated Routes' },
  { icon: Globe, text: 'Inter-State Transportation' },
];

export default function RegularTransportPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Regular & Dedicated</span>
        <h1 className="page-hero-title">
          Regular Transportation <span className="highlight">Support</span>
        </h1>
        <p className="page-hero-subtitle">
          For companies with regular transportation requirements, ELSALI LOGISTICS can arrange vehicles based on route and schedule requirements.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="split-layout animate-fade-up">
            <div>
              <span className="section-badge">Regular Transport</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>
                Consistent Vehicle <span className="highlight">Placement</span>
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                For companies with regular transportation requirements, ELSALI LOGISTICS can arrange vehicles based on route and schedule requirements.
              </p>

              <div className="card card-pink glass-card-premium hover-lift" style={{ marginBottom: '24px' }}>
                <div className="card-icon" style={{ background: 'rgba(255,255,255,0.15)', border: 'none' }}>
                  <Truck size={28} color="white" strokeWidth={1.5} />
                </div>
                <h3 className="card-title" style={{ color: 'white' }}>Dedicated Vehicle Support</h3>
                <p className="card-text" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Dedicated vehicles can be arranged for regular business movements. Customers can share their regular route and vehicle requirement with our team.
                </p>
              </div>

              <Link href="/quote" className="btn btn-primary">
                Share Your Requirements
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>

            <div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
                Suitable For
              </h3>
              <div className="feature-list">
                {suitableFor.map((item, i) => (
                  <div key={i} className="feature-list-item">
                    <div className="feature-list-icon" style={{ background: 'rgba(201, 169, 110, 0.1)' }}>
                      <item.icon size={16} color="var(--accent)" />
                    </div>
                    <span className="feature-list-text">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
