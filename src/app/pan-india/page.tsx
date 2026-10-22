'use client';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { Mountain, Palmtree, Waves, Building2, Landmark, Truck } from 'lucide-react';

const regions = [
  { name: 'North India', desc: 'Delhi NCR, Punjab, Haryana, Rajasthan, Uttar Pradesh', icon: Mountain },
  { name: 'South India', desc: 'Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana', icon: Palmtree },
  { name: 'East India', desc: 'West Bengal, Odisha, Jharkhand, Bihar', icon: Waves },
  { name: 'West India', desc: 'Maharashtra, Gujarat, Goa, Madhya Pradesh', icon: Building2 },
  { name: 'Central India', desc: 'Madhya Pradesh, Chhattisgarh', icon: Landmark },
];

const routes = [
  'Factory to Factory',
  'Factory to Warehouse',
  'Warehouse to Customer',
  'Supplier to Factory',
  'Door-to-Door Delivery',
];

export default function PanIndiaPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Pan-India Coverage</span>
        <h1 className="page-hero-title">
          North India to South India.<br />
          South India to <span className="highlight">North India.</span>
        </h1>
        <p className="page-hero-subtitle">
          ELSALI LOGISTICS provides transportation support for movements across India. We coordinate suitable vehicles for inter-state transportation requirements.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header animate-fade-up">
            <span className="section-badge">Major Service Regions</span>
            <h2 className="section-title">
              Pan-India <span className="highlight">Transportation</span>
            </h2>
          </div>

          <div className="grid-3 animate-fade-up" style={{ transitionDelay: '0.2s' }}>
            {regions.map((r, i) => (
              <div key={i} className="card glass-card-premium hover-lift" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="card-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <r.icon size={28} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <h3 className="card-title">{r.name}</h3>
                <p className="card-text">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-deeper">
        <div className="container">
          <div className="split-layout animate-fade-up">
            <div>
              <span className="section-badge">Routes We Support</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Flexible Route <span className="highlight">Solutions</span>
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                We coordinate suitable vehicles for inter-state transportation requirements based on route and load specifications.
              </p>
              <div className="feature-list">
                {routes.map((route, i) => (
                  <div key={i} className="feature-list-item">
                    <div className="feature-list-icon" style={{ background: 'rgba(201, 169, 110, 0.1)' }}>
                      <Truck size={16} color="var(--accent)" />
                    </div>
                    <span className="feature-list-text">{route}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card card-pink" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px' }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 800, marginBottom: '16px', color: 'white' }}>
                Pan-India Coverage
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '24px', lineHeight: 1.7 }}>
                We provide transportation support across all major Indian states and commercial corridors.
              </p>
              <Link href="/quote" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', width: 'fit-content' }}>
                Get Route Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
