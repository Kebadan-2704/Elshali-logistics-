'use client';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { Truck, MessageSquare, Scaling, Globe, Clock, Handshake } from 'lucide-react';

const reasons = [
  { icon: Truck, title: 'Reliable Vehicle Arrangement', text: 'We focus on arranging suitable vehicles according to customer requirements.' },
  { icon: MessageSquare, title: 'Professional Communication', text: 'We maintain proper communication during vehicle placement and transportation.' },
  { icon: Scaling, title: 'Flexible Vehicle Options', text: 'Different vehicle sizes and capacities can be arranged based on requirement.' },
  { icon: Globe, title: 'Pan-India Support', text: 'Transportation support is available across North India, South India and major destinations across India.' },
  { icon: Clock, title: 'Timely Coordination', text: 'We coordinate pickup, transit and delivery requirements professionally.' },
  { icon: Handshake, title: 'Long-Term Business Focus', text: 'We aim to build regular and long-term relationships with our customers.' },
];

export default function WhyChooseUsPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Why Choose Us</span>
        <h1 className="page-hero-title">
          Why <span className="highlight">ELSALI LOGISTICS?</span>
        </h1>
        <p className="page-hero-subtitle">
          Built around reliability, driven by service. Here is why businesses trust ELSALI LOGISTICS.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="grid-3 animate-fade-up">
            {reasons.map((r, i) => (
              <div key={i} className={`card animate-fade-up glass-card-premium hover-lift ${i === 0 ? 'card-pink' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="card-number">{String(i + 1).padStart(2, '0')}</span>
                <div className="card-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <r.icon size={28} color={i === 0 ? 'white' : 'var(--primary)'} strokeWidth={1.5} />
                </div>
                <h3 className="card-title">{r.title}</h3>
                <p className="card-text">{r.text}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }} className="animate-fade-up">
            <Link href="/quote" className="btn btn-primary btn-lg">
              Get A Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
