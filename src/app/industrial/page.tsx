'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { Cog, Wrench, Car, HardHat, Zap, CircleDot, Shirt, Box, Factory, Building2, Phone } from 'lucide-react';

const materials = [
  { icon: Cog, name: 'Machinery' },
  { icon: Wrench, name: 'Engineering Components' },
  { icon: Car, name: 'Automobile Components' },
  { icon: HardHat, name: 'Industrial Equipment' },
  { icon: Zap, name: 'Electrical Products' },
  { icon: CircleDot, name: 'Steel Materials' },
  { icon: Shirt, name: 'Textile Materials' },
  { icon: Box, name: 'Packaging Materials' },
  { icon: Factory, name: 'General Industrial Goods' },
  { icon: Building2, name: 'Factory Materials' },
];

export default function IndustrialPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Industrial Solutions</span>
        <h1 className="page-hero-title">
          Industrial <span className="highlight">Logistics Solutions</span>
        </h1>
        <p className="page-hero-subtitle">
          ELSALI LOGISTICS supports transportation requirements for manufacturing and industrial businesses.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header animate-fade-up">
            <span className="section-badge">Materials We Transport</span>
            <h2 className="section-title">
              We Can Arrange <span className="highlight">Vehicles For</span>
            </h2>
            <p className="section-subtitle">
              We coordinate vehicle placement according to the customer&#39;s loading and delivery requirements.
            </p>
          </div>

          <div className="grid-3 animate-fade-up" style={{ transitionDelay: '0.2s' }}>
            {materials.map((m, i) => (
              <div key={i} className="card glass-card-premium hover-lift" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="card-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <m.icon size={28} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <h3 className="card-title">{m.name}</h3>
                <p className="card-text">Professional transportation and handling for {m.name.toLowerCase()}.</p>
              </div>
            ))}
          </div>

          <div className="card card-pink animate-fade-up" style={{ textAlign: 'center', padding: '48px', marginTop: '48px' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
              Need Industrial Transportation?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
              We coordinate vehicle placement according to the customer&#39;s loading and delivery requirements.
            </p>
            <a href="tel:6369844820" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', margin: '0 auto', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} /> Call 6369844820
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
