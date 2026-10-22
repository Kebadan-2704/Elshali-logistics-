'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Truck,
  X,
  MapPin,
  Package,
  Weight,
  Calendar,
  User,
  Building,
  Phone,
  Mail,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useQuote } from './QuoteProvider';
import { vehicles } from '@/data/vehicles';
import { siteConfig } from '@/data/site';

export default function QuoteModal() {
  const { isOpen, preselectedVehicle, closeQuote } = useQuote();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleClose = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
    closeQuote();
  }, [closeQuote]);

  // Track trigger element
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus trap + ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Return focus on close
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const payload = {
      pickupLocation: (form.elements.namedItem('pickupLocation') as HTMLInputElement)?.value || '',
      deliveryLocation: (form.elements.namedItem('deliveryLocation') as HTMLInputElement)?.value || '',
      materialType: (form.elements.namedItem('materialType') as HTMLInputElement)?.value || '',
      weight: (form.elements.namedItem('weight') as HTMLInputElement)?.value || '',
      vehicleType: (form.elements.namedItem('vehicleType') as HTMLSelectElement)?.value || '',
      requiredDate: (form.elements.namedItem('requiredDate') as HTMLInputElement)?.value || '',
      fullName: (form.elements.namedItem('fullName') as HTMLInputElement)?.value || '',
      companyName: (form.elements.namedItem('companyName') as HTMLInputElement)?.value || '',
      phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem('email') as HTMLInputElement)?.value || '',
      additionalDetails: (form.elements.namedItem('additionalDetails') as HTMLTextAreaElement)?.value || '',
      website: (form.elements.namedItem('website') as HTMLInputElement)?.value || '',
    };

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit quote request.');
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Network connection lost. Please call our dispatch team directly.');
    }
  };

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="modal-panel" ref={panelRef}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-icon">
            <Truck size={20} />
          </div>
          <div className="modal-header-text">
            <h2 id="quote-modal-title">Request Freight Rate Quote</h2>
            <p>ELSALI LOGISTICS Pan-India Commercial Transport Services</p>
          </div>
          <button
            className="modal-close"
            onClick={handleClose}
            ref={closeRef}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {status === 'success' ? (
            <div className="modal-success">
              <CheckCircle size={56} className="modal-success-icon" />
              <h3>Quote Request Received!</h3>
              <p>
                Thank you for choosing ELSALI LOGISTICS. Our logistics team will review your freight route
                specifications and contact you shortly with competitive market rates.
              </p>
              <div style={{ marginTop: 20 }}>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="modal-submit"
                  style={{ textDecoration: 'none', display: 'inline-flex' }}
                >
                  <Phone size={16} /> Direct Dispatch: {siteConfig.phone}
                </a>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="modal-form" noValidate={false}>
              {status === 'error' && (
                <div
                  style={{
                    gridColumn: '1 / -1',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid #ef4444',
                    borderRadius: 12,
                    padding: '12px 16px',
                    color: '#f87171',
                    fontSize: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                  role="alert"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AlertCircle size={18} />
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
                      href={siteConfig.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#fff', textDecoration: 'underline', fontSize: 13 }}
                    >
                      WhatsApp Dispatch
                    </a>
                  </div>
                </div>
              )}

              {/* Pickup location */}
              <div className="form-field">
                <label htmlFor="q-pickup" className="form-label">
                  Pickup City / Area *
                </label>
                <div className="form-input-wrap">
                  <MapPin size={14} className="form-input-icon" />
                  <input
                    id="q-pickup"
                    name="pickupLocation"
                    className="form-input"
                    placeholder="e.g. Coimbatore, Tamil Nadu"
                    required
                  />
                </div>
              </div>

              {/* Delivery location */}
              <div className="form-field">
                <label htmlFor="q-delivery" className="form-label">
                  Destination / Delivery City *
                </label>
                <div className="form-input-wrap">
                  <MapPin size={14} className="form-input-icon" />
                  <input
                    id="q-delivery"
                    name="deliveryLocation"
                    className="form-input"
                    placeholder="e.g. Bangalore, Karnataka"
                    required
                  />
                </div>
              </div>

              {/* Material */}
              <div className="form-field">
                <label htmlFor="q-material" className="form-label">
                  Commodity / Cargo Type *
                </label>
                <div className="form-input-wrap">
                  <Package size={14} className="form-input-icon" />
                  <input
                    id="q-material"
                    name="materialType"
                    className="form-input"
                    placeholder="e.g. Textiles, Auto Parts, FMCG"
                    required
                  />
                </div>
              </div>

              {/* Weight */}
              <div className="form-field">
                <label htmlFor="q-weight" className="form-label">
                  Estimated Weight / Volume
                </label>
                <div className="form-input-wrap">
                  <Weight size={14} className="form-input-icon" />
                  <input
                    id="q-weight"
                    name="weight"
                    className="form-input"
                    placeholder="e.g. 5 Tons / 120 Boxes"
                  />
                </div>
              </div>

              {/* Vehicle type */}
              <div className="form-field">
                <label htmlFor="q-vehicle" className="form-label">
                  Required Vehicle Class *
                </label>
                <div className="form-input-wrap">
                  <Truck size={14} className="form-input-icon" />
                  <select
                    id="q-vehicle"
                    name="vehicleType"
                    className="form-input"
                    defaultValue={preselectedVehicle || '32 Ft SXL / MXL'}
                    required
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} — {v.chip}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="form-field">
                <label htmlFor="q-date" className="form-label">
                  Expected Loading Date *
                </label>
                <div className="form-input-wrap">
                  <Calendar size={14} className="form-input-icon" />
                  <input
                    id="q-date"
                    name="requiredDate"
                    className="form-input"
                    type="date"
                    min={todayStr}
                    required
                    style={{ paddingLeft: 42 }}
                  />
                </div>
              </div>

              {/* Name */}
              <div className="form-field">
                <label htmlFor="q-name" className="form-label">
                  Full Name *
                </label>
                <div className="form-input-wrap">
                  <User size={14} className="form-input-icon" />
                  <input
                    id="q-name"
                    name="fullName"
                    className="form-input"
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div className="form-field">
                <label htmlFor="q-company" className="form-label">
                  Company Name
                </label>
                <div className="form-input-wrap">
                  <Building size={14} className="form-input-icon" />
                  <input
                    id="q-company"
                    name="companyName"
                    className="form-input"
                    placeholder="Your enterprise / business name"
                    autoComplete="organization"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="form-field">
                <label htmlFor="q-phone" className="form-label">
                  Mobile / Phone Number *
                </label>
                <div className="form-input-wrap">
                  <Phone size={14} className="form-input-icon" />
                  <input
                    id="q-phone"
                    name="phone"
                    className="form-input"
                    type="tel"
                    inputMode="tel"
                    placeholder="10-digit mobile number"
                    pattern="[6-9][0-9]{9}"
                    title="Enter a valid 10-digit Indian mobile number starting with 6-9"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-field">
                <label htmlFor="q-email" className="form-label">
                  Email Address
                </label>
                <div className="form-input-wrap">
                  <Mail size={14} className="form-input-icon" />
                  <input
                    id="q-email"
                    name="email"
                    className="form-input"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Additional details */}
              <div className="form-field full-width">
                <label htmlFor="q-details" className="form-label">
                  Additional Cargo Details
                </label>
                <div className="form-input-wrap">
                  <FileText size={14} className="form-input-icon" />
                  <textarea
                    id="q-details"
                    name="additionalDetails"
                    className="form-input"
                    placeholder="Dimensions, special handling requirements or delivery schedule..."
                    style={{ height: 90, paddingTop: 12 }}
                  />
                </div>
              </div>

              {/* Honeypot field - visually hidden, non-focusable */}
              <input
                type="text"
                name="website"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Submit */}
              <button type="submit" className="modal-submit" disabled={status === 'submitting'}>
                <Send size={16} />
                {status === 'submitting' ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
