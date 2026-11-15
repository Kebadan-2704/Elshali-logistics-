'use client';

import { useState } from 'react';
import { Mail, Phone, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { trackEvent } from '@/lib/analytics';

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

export default function ContactForm({ className = '', onSuccess }: ContactFormProps) {
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
      trackEvent({ name: 'form_submit_contact', params: { name: payload.name } });
      if (onSuccess) onSuccess();
    } catch {
      setStatus('error');
      setErrorMessage('Network error occurred. Please call or message us on WhatsApp.');
    }
  };

  return (
    <div className={`contact-form-card ${className}`}>
      <h3>Send us a message</h3>
      <p>Fill out the form below and our dispatch team will get back to you shortly.</p>

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
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  style={{ color: '#fff', textDecoration: 'underline', fontSize: 13 }}
                >
                  Call: {siteConfig.phone}
                </a>
                <a
                  href={`https://wa.me/91${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#fff', textDecoration: 'underline', fontSize: 13 }}
                >
                  WhatsApp Dispatch
                </a>
              </div>
            </div>
          )}

          <div className="form-field">
            <label htmlFor="contact-name" className="form-label">Full Name *</label>
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
            <label htmlFor="contact-email" className="form-label">Email Address *</label>
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
            <label htmlFor="contact-phone" className="form-label">Phone Number *</label>
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
            <label htmlFor="contact-message" className="form-label">Message *</label>
            <div className="form-input-wrap">
              <MessageSquare size={14} className="form-input-icon" />
              <textarea
                id="contact-message"
                name="message"
                className="form-input"
                placeholder="Type your cargo requirement or route details..."
                required
              />
            </div>
          </div>

          {/* Spam Honeypot */}
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
  );
}

