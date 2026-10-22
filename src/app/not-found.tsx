'use client';

import Link from 'next/link';
import { Truck } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="page-hero-glow"></div>
      <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '50%' }}>
        <Truck size={48} color="var(--primary)" />
      </div>
      <h1 className="page-hero-title" style={{ marginBottom: '16px' }}>
        Page <span className="highlight">Not Found</span>
      </h1>
      <p className="page-hero-subtitle" style={{ marginBottom: '32px' }}>
        Sorry, the page you are looking for doesn&#39;t exist or has been moved. Let us help you find the right route.
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn btn-primary btn-lg">
          Back to Home
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>
        <Link href="/contact" className="btn btn-outline btn-lg">
          Contact Us
        </Link>
      </div>
    </section>
  );
}
