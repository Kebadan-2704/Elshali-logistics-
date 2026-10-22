'use client';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { Factory, Cog, BarChart3, Store, Truck, Building2 } from 'lucide-react';

const solutions = [
  { icon: Factory, title: 'Manufacturers', text: 'Regular movement of raw materials, components and finished goods.', features: ['Raw material transport', 'Component delivery', 'Finished goods movement'] },
  { icon: Cog, title: 'Industries', text: 'Transportation of industrial materials and equipment.', features: ['Heavy equipment handling', 'Industrial compliance', 'Factory-to-factory'] },
  { icon: BarChart3, title: 'Traders', text: 'Movement of goods between suppliers, warehouses and customers.', features: ['Multi-point delivery', 'Warehouse transit', 'Supplier pickup'] },
  { icon: Store, title: 'Distributors', text: 'Regular delivery and distribution transportation.', features: ['Distribution routes', 'Regular scheduling', 'Last-mile delivery'] },
  { icon: Truck, title: 'Logistics Companies', text: 'Vehicle placement support for additional transportation requirements.', features: ['Fleet augmentation', 'Overflow capacity', 'Partner support'] },
  { icon: Building2, title: 'Corporate Companies', text: 'Dedicated transportation arrangements based on business requirements.', features: ['Dedicated vehicles', 'SLA compliance', 'Custom solutions'] },
];

export default function BusinessSolutionsPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Business Solutions</span>
        <h1 className="page-hero-title">
          Transportation Solutions <span className="highlight">For Businesses</span>
        </h1>
        <p className="page-hero-subtitle">
          ELSALI LOGISTICS can support manufacturers, industries, traders, distributors, logistics companies and corporate companies.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="grid-3 animate-fade-up">
            {solutions.map((s, i) => (
              <div key={i} className="service-card glass-card-premium hover-lift" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="card-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <s.icon size={28} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <h3 className="service-card-title" style={{ fontSize: '20px' }}>{s.title}</h3>
                <p className="service-card-text">{s.text}</p>
                <div className="service-card-features">
                  {s.features.map((f, j) => (
                    <div key={j} className="service-card-feature">
                      <div className="service-card-feature-icon">&#10003;</div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }} className="animate-fade-up">
            <Link href="/quote" className="btn btn-primary btn-lg">
              Discuss Your Requirements
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
