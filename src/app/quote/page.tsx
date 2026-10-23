'use client';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  ClipboardList, 
  MapPin, 
  Flag, 
  Box, 
  Scale, 
  Truck, 
  Calendar, 
  User, 
  Building2, 
  Phone, 
  Mail, 
  FileText,
  CheckCircle2
} from 'lucide-react';

export default function QuotePage() {
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
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Request A Quote</span>
        <h1 className="page-hero-title">
          Get Your <span className="highlight">Transport Quote</span>
        </h1>
        <p className="page-hero-subtitle">
          To provide a suitable freight quotation, share the following details with us. Our team will coordinate the suitable vehicle and freight quotation.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="split-layout animate-fade-up">
            <div className="quote-form glass-card-premium">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--gradient-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <ClipboardList size={20} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: 700 }}>Request Freight Rate Quote</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ELSALI LOGISTICS Pan-India Commercial Freight Solutions</p>
                </div>
              </div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 0' }}></div>

              <form className="form-grid" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="pickupLocation" className="form-label">
                    <span className="form-label-icon"><MapPin size={16} /></span> Pickup Location *
                  </label>
                  <input id="pickupLocation" name="pickupLocation" className="form-input" placeholder="e.g. Coimbatore, Tamil Nadu" required />
                </div>
                <div className="form-group">
                  <label htmlFor="deliveryLocation" className="form-label">
                    <span className="form-label-icon"><Flag size={16} /></span> Delivery Location *
                  </label>
                  <input id="deliveryLocation" name="deliveryLocation" className="form-input" placeholder="e.g. Chennai / Mumbai" required />
                </div>
                <div className="form-group">
                  <label htmlFor="materialType" className="form-label">
                    <span className="form-label-icon"><Box size={16} /></span> Material Type *
                  </label>
                  <input id="materialType" name="materialType" className="form-input" placeholder="e.g. Textiles, Machinery, FMCG" required />
                </div>
                <div className="form-group">
                  <label htmlFor="weight" className="form-label">
                    <span className="form-label-icon"><Scale size={16} /></span> Approx. Weight (Tons / Kgs)
                  </label>
                  <input id="weight" name="weight" className="form-input" placeholder="e.g. 5 Tons / 2500 Kgs" />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleType" className="form-label">
                    <span className="form-label-icon"><Truck size={16} /></span> Vehicle Type Required *
                  </label>
                  <select id="vehicleType" name="vehicleType" className="form-select" required>
                    <option value="">Select vehicle type</option>
                    <option>Tata Ace</option>
                    <option>Pickup / Dost</option>
                    <option>Mini Truck</option>
                    <option>14 Ft</option>
                    <option>17 Ft</option>
                    <option>20 Ft</option>
                    <option>22 Ft</option>
                    <option>24 Ft</option>
                    <option>32 Ft SXL / MXL</option>
                    <option>Multi-Axle</option>
                    <option>Trailer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="loadingDate" className="form-label">
                    <span className="form-label-icon"><Calendar size={16} /></span> Expected Loading Date *
                  </label>
                  <input id="loadingDate" name="loadingDate" className="form-input" type="date" required />
                </div>
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    <span className="form-label-icon"><User size={16} /></span> Full Name *
                  </label>
                  <input id="fullName" name="fullName" className="form-input" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="companyName" className="form-label">
                    <span className="form-label-icon"><Building2 size={16} /></span> Company Name
                  </label>
                  <input id="companyName" name="companyName" className="form-input" placeholder="Your company name" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <span className="form-label-icon"><Phone size={16} /></span> Mobile / Phone Number *
                  </label>
                  <input id="phone" name="phone" className="form-input" type="tel" placeholder="10-digit mobile number" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <span className="form-label-icon"><Mail size={16} /></span> Email Address
                  </label>
                  <input id="email" name="email" className="form-input" type="email" placeholder="name@company.com" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="details" className="form-label">
                    <span className="form-label-icon"><FileText size={16} /></span> Additional Cargo Details
                  </label>
                  <textarea id="details" name="details" className="form-textarea" placeholder="Dimensions, special handling or preferences..." rows={4}></textarea>
                </div>
                <div className="form-group full-width">
                  <button type="submit" disabled={status !== 'idle'} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                    {status === 'submitting' ? (
                      'Submitting...'
                    ) : status === 'success' ? (
                      'Quote Request Sent!'
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        Submit Quote Request
                      </>
                    )}
                  </button>
                  {status === 'success' && (
                    <p style={{ color: '#4ade80', fontSize: '14px', marginTop: '12px', textAlign: 'center' }}>
                      Thank you! Our team will contact you shortly with the quotation.
                    </p>
                  )}
                </div>
              </form>
            </div>

            <div>
              <div className="card glass-card-premium hover-lift" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <ClipboardList size={20} color="var(--accent)" />
                  <h3 className="card-title" style={{ margin: 0 }}>
                    Required Information
                  </h3>
                </div>
                <div className="feature-list">
                  {['Pickup Location', 'Delivery Location', 'PIN Code', 'Material Details', 'Weight', 'Material Dimensions', 'Vehicle Required', 'Loading Date', 'Unloading Requirement'].map((item, i) => (
                    <div key={i} className="feature-list-item">
                      <div className="feature-list-icon" style={{ background: 'transparent' }}><CheckCircle2 size={16} color="var(--primary)" /></div>
                      <span className="feature-list-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card card-pink hover-lift" style={{ padding: '24px' }}>
                <h3 className="card-title" style={{ color: 'white', marginBottom: '16px' }}>Example Quote Request</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Pickup', value: 'Coimbatore' },
                    { label: 'Delivery', value: 'Bangalore' },
                    { label: 'Material', value: 'Industrial Machinery' },
                    { label: 'Weight', value: '6 Ton' },
                    { label: 'Vehicle', value: '20 FT' },
                    { label: 'Loading Date', value: 'Required Date' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>{item.label}</span>
                      <span style={{ fontWeight: 600, fontSize: '14px', color: 'white' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-card glass-card-premium hover-lift" style={{ marginTop: '24px' }}>
                <div className="contact-card-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Phone size={24} color="var(--primary)" />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">Call Us Directly</span>
                  <a href="tel:6369844820" className="contact-card-value" style={{ textDecoration: 'none', color: '#0F172A' }}>6369844820</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
