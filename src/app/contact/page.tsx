'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  User, 
  Phone, 
  Mail, 
  Building2, 
  MapPin, 
  Flag, 
  Box, 
  Scale, 
  Truck, 
  Calendar, 
  FileText
} from 'lucide-react';

export default function ContactPage() {
  const scrollRef = useScrollAnimation();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div ref={scrollRef}>
      <section className="page-hero" style={{ paddingBottom: '40px' }}>
        <div className="page-hero-glow"></div>
        <span className="section-badge">Contact Us</span>
        <h1 className="page-hero-title">
          Let&#39;s Move Your <span className="highlight">Business Forward</span>
        </h1>
        <p className="page-hero-subtitle">
          Whether you need a single vehicle or regular transportation support, share your requirement with us. We are ready to arrange suitable transportation solutions according to your business requirements.
        </p>
      </section>

      <section className="section section-dark" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="split-layout animate-fade-up">
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>
                <span className="highlight">ELSALI LOGISTICS</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '8px', fontWeight: 500 }}>
                Reliable Transportation. Professional Service. Pan-India Reach.
              </p>
              <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '32px' }}>
                Your Transport. Our Responsibility.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <div className="contact-card glass-card-premium hover-lift">
                  <div className="contact-card-icon" style={{ background: 'rgba(255,255,255,0.05)' }}><User size={20} color="var(--primary)" /></div>
                  <div className="contact-card-content">
                    <span className="contact-card-label">Contact Person</span>
                    <span className="contact-card-value">C. ARUN KUMAR</span>
                  </div>
                </div>
                <a href="tel:6369844820" className="contact-card glass-card-premium hover-lift" style={{ textDecoration: 'none' }}>
                  <div className="contact-card-icon" style={{ background: 'rgba(255,255,255,0.05)' }}><Phone size={20} color="var(--primary)" /></div>
                  <div className="contact-card-content">
                    <span className="contact-card-label">Phone</span>
                    <span className="contact-card-value">6369844820</span>
                  </div>
                </a>
                <a href="mailto:elshalilogistics@gmail.com" className="contact-card glass-card-premium hover-lift" style={{ textDecoration: 'none' }}>
                  <div className="contact-card-icon" style={{ background: 'rgba(255,255,255,0.05)' }}><Mail size={20} color="var(--primary)" /></div>
                  <div className="contact-card-content">
                    <span className="contact-card-label">Email</span>
                    <span className="contact-card-value">elshalilogistics@gmail.com</span>
                  </div>
                </a>
                <div className="contact-card glass-card-premium hover-lift">
                  <div className="contact-card-icon" style={{ background: 'rgba(255,255,255,0.05)' }}><Building2 size={20} color="var(--accent)" /></div>
                  <div className="contact-card-content">
                    <span className="contact-card-label">GSTIN</span>
                    <span className="contact-card-value">33DQAPA3611N1Z8</span>
                  </div>
                </div>
              </div>

              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
                Additional Numbers
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {['8667049878', '8610814831', '9667225840', '9442444820'].map((num, i) => (
                  <a key={i} href={`tel:${num}`} className="btn btn-dark btn-sm" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} /> {num}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="quote-form">
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Request A Quote</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Please share your requirements and our team will get back to you with the right transportation solution.</p>

                <form className="form-grid glass-card-premium" style={{ padding: '32px', borderRadius: '24px' }} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="contactPickup" className="form-label"><span className="form-label-icon"><MapPin size={16} /></span> Pickup Location</label>
                    <input id="contactPickup" className="form-input" placeholder="e.g. Coimbatore" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactDelivery" className="form-label"><span className="form-label-icon"><Flag size={16} /></span> Delivery Location</label>
                    <input id="contactDelivery" className="form-input" placeholder="e.g. Chennai" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactMaterial" className="form-label"><span className="form-label-icon"><Box size={16} /></span> Material</label>
                    <input id="contactMaterial" className="form-input" placeholder="Material type" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactWeight" className="form-label"><span className="form-label-icon"><Scale size={16} /></span> Weight</label>
                    <input id="contactWeight" className="form-input" placeholder="Weight in Tons/Kgs" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactVehicle" className="form-label"><span className="form-label-icon"><Truck size={16} /></span> Vehicle Size</label>
                    <select id="contactVehicle" className="form-select" required>
                      <option value="">Select vehicle</option>
                      <option>Tata Ace / Pickup</option>
                      <option>Mini Truck</option>
                      <option>14 Ft - 17 Ft</option>
                      <option>20 Ft - 24 Ft</option>
                      <option>32 Ft SXL / MXL</option>
                      <option>Multi-Axle / Trailer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactDate" className="form-label"><span className="form-label-icon"><Calendar size={16} /></span> Loading Date</label>
                    <input id="contactDate" className="form-input" type="date" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactName" className="form-label"><span className="form-label-icon"><User size={16} /></span> Your Name</label>
                    <input id="contactName" className="form-input" placeholder="Full name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPhone" className="form-label"><span className="form-label-icon"><Phone size={16} /></span> Phone Number</label>
                    <input id="contactPhone" className="form-input" type="tel" placeholder="Your number" required />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="contactDetails" className="form-label"><span className="form-label-icon"><FileText size={16} /></span> Additional Details</label>
                    <textarea id="contactDetails" className="form-textarea" placeholder="Any additional requirements..." rows={3}></textarea>
                  </div>
                  <div className="form-group full-width">
                    <button type="submit" disabled={status !== 'idle'} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                      {status === 'submitting' ? (
                        'Submitting...'
                      ) : status === 'success' ? (
                        'Message Sent!'
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          Submit Quote Request
                        </>
                      )}
                    </button>
                    {status === 'success' && (
                      <p style={{ color: '#4ade80', fontSize: '14px', marginTop: '12px', textAlign: 'center' }}>
                        Thank you! We will get back to you shortly.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-icon">
            <Truck size={28} />
          </div>
          <h2 className="cta-title">
            <span className="highlight">ELSALI LOGISTICS</span>
          </h2>
          <p className="cta-text" style={{ fontWeight: 600 }}>
            Your Transport. Our Responsibility.
          </p>
          <div className="cta-actions">
            <Link href="/quote" className="btn btn-primary btn-lg">
              Get A Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <a href="tel:6369844820" className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} /> Call 6369844820
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
