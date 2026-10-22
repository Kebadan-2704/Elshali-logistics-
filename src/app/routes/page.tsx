'use client';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { Factory, Building2, Box, Home, ArrowRight } from 'lucide-react';

const regions = [
  { num: '01', name: 'South India', desc: 'Direct connectivity across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh & Telangana.', states: ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana'] },
  { num: '02', name: 'North India', desc: 'Long-haul routes serving Delhi NCR, Punjab, Haryana, Rajasthan & Uttar Pradesh.', states: ['Delhi NCR', 'Punjab', 'Haryana', 'Rajasthan', 'Uttar Pradesh'] },
  { num: '03', name: 'East India', desc: 'Freight routes reaching West Bengal, Odisha, Jharkhand & Bihar commercial centers.', states: ['West Bengal', 'Odisha', 'Jharkhand', 'Bihar'] },
  { num: '04', name: 'West India', desc: 'Express transit corridors to Maharashtra, Gujarat, Goa & Madhya Pradesh.', states: ['Maharashtra', 'Gujarat', 'Goa', 'Madhya Pradesh'] },
  { num: '05', name: 'Central India', desc: 'Connecting central Indian states for seamless transit.', states: ['Madhya Pradesh', 'Chhattisgarh'] },
];

const routes = [
  { icon: Factory, from: 'Factory', to: 'Factory' },
  { icon: Factory, from: 'Factory', to: 'Warehouse' },
  { icon: Building2, from: 'Warehouse', to: 'Customer' },
  { icon: Box, from: 'Supplier', to: 'Factory' },
  { icon: Home, from: 'Door', to: 'Door Delivery' },
];

export default function RoutesPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Our Reach & Network</span>
        <h1 className="page-hero-title">
          Pan-India <span className="highlight">Transportation</span>
        </h1>
        <p className="page-hero-subtitle">
          ELSALI LOGISTICS provides transportation support for movements across India. Seamless connectivity across Tamil Nadu and major interstate trade corridors nationwide.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header animate-fade-up">
            <span className="section-badge">Major Service Regions</span>
            <h2 className="section-title">
              Pan-India Transit Corridors &<br />
              <span className="highlight">Regional Hubs</span>
            </h2>
          </div>

          <div className="grid-3 animate-fade-up" style={{ transitionDelay: '0.2s' }}>
            {regions.map((r, i) => (
              <div key={i} className="region-card glass-card-premium hover-lift">
                <div className="region-card-header">
                  <div className="region-card-number">{r.num}</div>
                  <h3 className="region-card-title">{r.name}</h3>
                </div>
                <p className="region-card-text">{r.desc}</p>
                <div className="region-card-list">
                  {r.states.map((s, j) => (
                    <div key={j} className="region-card-list-item">
                      <span className="region-card-list-dot"></span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-deeper">
        <div className="container">
          <div className="section-header animate-fade-up">
            <span className="section-badge">Routes We Support</span>
            <h2 className="section-title">
              Flexible Route <span className="highlight">Solutions</span>
            </h2>
            <p className="section-subtitle">
              We coordinate suitable vehicles for inter-state transportation requirements based on route and load specifications.
            </p>
          </div>

          <div className="grid-3 animate-fade-up" style={{ transitionDelay: '0.2s' }}>
            {routes.map((route, i) => (
              <div key={i} className="card glass-card-premium hover-lift" style={{ textAlign: 'center' }}>
                <div className="card-icon" style={{ margin: '0 auto 16px', width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <route.icon size={28} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {route.from} <ArrowRight size={16} /> {route.to}
                </h3>
                <p className="card-text">Reliable {route.from.toLowerCase()} to {route.to.toLowerCase()} transportation with tracking.</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }} className="animate-fade-up">
            <Link href="/quote" className="btn btn-primary btn-lg">
              Get Route Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
