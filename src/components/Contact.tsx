'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Truck, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site';
import ContactForm from './forms/ContactForm';

export default function Contact() {
  const [lrInput, setLrInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lr = lrInput.trim();
    if (!lr) return;
    const msg = `Hello ${siteConfig.name} Dispatch Desk, please provide real-time tracking status for LR / Consignment #${lr}.`;
    window.open(`https://wa.me/91${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-left">
            <div className="eyebrow pink" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} />
              CONTACT US
            </div>
            <h2 id="contact-heading" className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.2 }}>
              Let&apos;s Move Your<br />
              <span className="pink">Cargo Forward</span>
            </h2>
            <p>
              Have questions about our logistics services or need a custom shipping solution?
              Our team is ready to help you plan, track, and manage your cargo with confidence.
            </p>

            {/* Quick Track Consignment / LR Card */}
            <div
              style={{
                background: 'rgba(236, 72, 153, 0.06)',
                border: '1px solid rgba(236, 72, 153, 0.25)',
                borderRadius: '14px',
                padding: '18px 20px',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Truck size={18} style={{ color: '#EC4899' }} />
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>
                  Track Consignment / Lorry Receipt (LR)
                </h3>
              </div>
              <p style={{ fontSize: '12.5px', color: '#94A3B8', margin: '0 0 12px', lineHeight: 1.5 }}>
                Enter your LR number to receive immediate live vehicle location and transit updates via 24/7 WhatsApp dispatch.
              </p>
              <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="e.g. ELS-748921"
                  value={lrInput}
                  onChange={(e) => setLrInput(e.target.value)}
                  aria-label="Consignment or LR reference number"
                  style={{
                    flex: '1 1 180px',
                    padding: '8px 12px',
                    fontSize: '13px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '8px 14px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    background: '#25D366',
                    color: '#060B16',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <MessageCircle size={14} /> Track via WhatsApp
                </button>
              </form>
            </div>

            <h3 className="contact-info-heading">Contact Information</h3>
            <p className="contact-info-hint">Reach out to us through any of the channels below.</p>

            <div className="contact-tiles">
              <a href={`mailto:${siteConfig.email}`} className="contact-tile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-tile-icon">
                  <Mail size={14} />
                </div>
                <div>
                  <div className="contact-tile-label">Email</div>
                  <div className="contact-tile-value">{siteConfig.email}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-slate-400)', marginTop: '2px' }}>{siteConfig.email2}</div>
                </div>
              </a>
              <div className="contact-tile">
                <div className="contact-tile-icon">
                  <Phone size={14} />
                </div>
                <div>
                  <div className="contact-tile-label">Direct Dispatch Lines</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <a href={`tel:${siteConfig.phone}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>+91 {siteConfig.phone}</a>
                    <a href={`tel:${siteConfig.phone2}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>+91 {siteConfig.phone2}</a>
                    <a href={`tel:${siteConfig.phone3}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>+91 {siteConfig.phone3}</a>
                  </div>
                </div>
              </div>
              <div className="contact-tile">
                <div className="contact-tile-icon">
                  <MapPin size={14} />
                </div>
                <div>
                  <div className="contact-tile-label">Registered Office &amp; Hub</div>
                  <div className="contact-tile-value">{siteConfig.address}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-pink-400)', marginTop: '4px', fontWeight: 700 }}>
                    GSTIN: {siteConfig.gstin}
                  </div>
                </div>
              </div>
            </div>

            <p className="contact-tagline">RELIABLE LOGISTICS. STRONGER TOMORROWS.</p>
          </div>

          {/* Right: Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
