'use client';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { Target, Phone, Map, Truck, Scale, Box, MapPin, Flag, ClipboardList } from 'lucide-react';

const approach = [
  { icon: Map, label: 'Route' },
  { icon: Truck, label: 'Vehicle Size' },
  { icon: Scale, label: 'Load Capacity' },
  { icon: Box, label: 'Material Type' },
  { icon: MapPin, label: 'Pickup Location' },
  { icon: Flag, label: 'Delivery Location' },
  { icon: ClipboardList, label: 'Delivery Requirement' },
];

export default function AboutPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">About Us</span>
        <h1 className="page-hero-title">
          About <span className="highlight">ELSALI LOGISTICS</span>
        </h1>
        <p className="page-hero-subtitle">
          A transport and logistics service provider focused on reliable road transportation solutions for businesses and industries.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="split-layout animate-fade-up">
            <div className="split-content">
              <span className="section-badge">Who We Are</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Professional Transportation<br />
                <span className="highlight">Solutions Provider</span>
              </h2>
              <p>
                ELSALI LOGISTICS is a transport and logistics service provider focused on reliable road transportation solutions for businesses and industries.
              </p>
              <p>
                Our objective is to provide suitable vehicles, professional coordination, proper communication and timely delivery support.
              </p>
              <p>
                We work with businesses requiring regular and one-time transportation services.
              </p>
              <Link href="/quote" className="btn btn-primary" style={{ marginTop: '8px' }}>
                Request A Quote
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>

            <div>
              <div className="card card-pink glass-card-premium hover-lift" style={{ marginBottom: '24px' }}>
                <div className="card-icon" style={{ background: 'rgba(255,255,255,0.1)', border: 'none' }}>
                  <Target size={28} color="white" strokeWidth={1.5} />
                </div>
                <h3 className="card-title">Our Focus</h3>
                <p className="card-text">
                  To develop long-term business relationships through consistent service and professional coordination.
                </p>
              </div>
              <div className="card glass-card-premium hover-lift">
                <div className="card-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Phone size={28} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <h3 className="card-title">Contact Person</h3>
                <p className="card-text">C. ARUN KUMAR</p>
                <a href="tel:6369844820" className="phone-link" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} /> 6369844820
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-deeper">
        <div className="container">
          <div className="section-header animate-fade-up">
            <span className="section-badge">Our Approach</span>
            <h2 className="section-title">
              We Arrange Vehicles<br />
              <span className="highlight">According To Your Needs</span>
            </h2>
            <p className="section-subtitle">
              We understand that every business has different transportation requirements. Therefore, we arrange vehicles according to:
            </p>
          </div>

          <div className="grid-4 animate-fade-up" style={{ transitionDelay: '0.2s' }}>
            {approach.map((item, i) => (
              <div key={i} className="card glass-card-premium hover-lift" style={{ textAlign: 'center' }}>
                <div className="card-icon" style={{ margin: '0 auto 16px', width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <item.icon size={28} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <h3 className="card-title">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
