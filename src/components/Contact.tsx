'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/data/site';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem('email') as HTMLInputElement)?.value || '',
      phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value || '',
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '',
      website: (form.elements.namedItem('website') as HTMLInputElement)?.value || '',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message.');
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Network error occurred. Please call or message us on WhatsApp.');
    }
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-grid">
          {/* Left */}
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

            <h4 className="contact-info-heading">Contact Information</h4>
            <p className="contact-info-hint">Reach out to us through any of the channels below.</p>

            <div className="contact-tiles">
              <a href={`mailto:${siteConfig.email}`} className="contact-tile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-tile-icon">
                  <Mail size={14} />
                </div>
                <div>
                  <div className="contact-tile-label">Email</div>
                  <div className="contact-tile-value">{siteConfig.email}</div>
                </div>
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="contact-tile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-tile-icon">
                  <Phone size={14} />
                </div>
                <div>
                  <div className="contact-tile-label">Phone</div>
                  <div className="contact-tile-value">{siteConfig.phone}</div>
                </div>
              </a>
              <div className="contact-tile">
                <div className="contact-tile-icon">
                  <MapPin size={14} />
                </div>
                <div>
                  <div className="contact-tile-label">Location</div>
                  <div className="contact-tile-value">{siteConfig.address}</div>
                </div>
              </div>
            </div>

            <p className="contact-tagline">RELIABLE LOGISTICS. STRONGER TOMORROWS.</p>
          </div>

          {/* Right — form card */}
          <div className="contact-form-card">
            <h3>Send us a message</h3>
            <p>Fill out the form below and our team will get back to you shortly.</p>

            {status === 'success' ? (
              <div className="form-success">
                <CheckCircle size={48} />
                <h4>Message Sent!</h4>
                <p>Thank you — our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {status === 'error' && (
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid #ef4444',
                      borderRadius: 10,
                      padding: '10px 14px',
                      color: '#f87171',
                      fontSize: 14,
                      marginBottom: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                    role="alert"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                      <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} style={{ color: '#fff', textDecoration: 'underline', fontSize: 13 }}>
                        Call: {siteConfig.phone}
                      </a>
                      <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontSize: 13 }}>
                        WhatsApp Dispatch
                      </a>
                    </div>
                  </div>
                )}

                <div className="form-field">
                  <label htmlFor="contact-name" className="form-label">Full Name</label>
                  <div className="form-input-wrap">
                    <User size={14} className="form-input-icon" />
                    <input
                      id="contact-name"
                      name="name"
                      className="form-input"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email" className="form-label">Email Address</label>
                  <div className="form-input-wrap">
                    <Mail size={14} className="form-input-icon" />
                    <input
                      id="contact-email"
                      name="email"
                      className="form-input"
                      type="email"
                      placeholder="Enter your email address"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-phone" className="form-label">Phone Number</label>
                  <div className="form-input-wrap">
                    <Phone size={14} className="form-input-icon" />
                    <input
                      id="contact-phone"
                      name="phone"
                      className="form-input"
                      type="tel"
                      inputMode="tel"
                      placeholder="10-digit mobile number"
                      pattern="[6-9][0-9]{9}"
                      title="Enter a valid 10-digit Indian mobile number"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <div className="form-input-wrap">
                    <MessageSquare size={14} className="form-input-icon" />
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-input"
                      placeholder="Type your cargo inquiry..."
                      required
                    />
                  </div>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  className="form-submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
