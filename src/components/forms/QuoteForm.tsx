'use client';

import { useState, useRef } from 'react';
import {
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
  Truck,
} from 'lucide-react';
import { vehicles } from '@/data/vehicles';
import { siteConfig } from '@/data/site';
import { trackEvent } from '@/lib/analytics';

interface QuoteFormProps {
  preselectedVehicle?: string | null;
  onSuccess?: () => void;
  variant?: 'modal' | 'page';
  className?: string;
}

export default function QuoteForm({
  preselectedVehicle,
  onSuccess,
  variant = 'page',
  className = '',
}: QuoteFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const payload = {
      pickupLocation: (form.elements.namedItem('pickupLocation') as HTMLInputElement)?.value?.trim() || '',
      deliveryLocation: (form.elements.namedItem('deliveryLocation') as HTMLInputElement)?.value?.trim() || '',
      materialType: (form.elements.namedItem('materialType') as HTMLInputElement)?.value?.trim() || '',
      weight: (form.elements.namedItem('weight') as HTMLInputElement)?.value?.trim() || '',
      vehicleType: (form.elements.namedItem('vehicleType') as HTMLSelectElement)?.value || '',
      requiredDate: (form.elements.namedItem('requiredDate') as HTMLInputElement)?.value || '',
      fullName: (form.elements.namedItem('fullName') as HTMLInputElement)?.value?.trim() || '',
      companyName: (form.elements.namedItem('companyName') as HTMLInputElement)?.value?.trim() || '',
      phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value?.trim() || '',
      email: (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim() || '',
      additionalDetails: (form.elements.namedItem('additionalDetails') as HTMLTextAreaElement)?.value?.trim() || '',
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
        setErrorMessage(data.error || 'Failed to submit quote request. Please try again or call dispatch.');
        return;
      }

      setStatus('success');
      trackEvent({
        name: 'form_submit_quote',
        params: {
          vehicle: payload.vehicleType,
          pickup: payload.pickupLocation,
          dropoff: payload.deliveryLocation,
        },
      });
      if (data.data?.referenceId) {
        setReferenceId(data.data.referenceId);
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network connection lost. Please contact our dispatch team directly.');
    }
  };

  const isModal = variant === 'modal';

  if (status === 'success') {
    return (
      <div className={isModal ? 'modal-success' : 'form-success'}>
        <CheckCircle size={56} className="modal-success-icon" style={{ color: '#10b981', margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
          Quote Request Received!
        </h3>
        {referenceId && (
          <p style={{ fontSize: '14px', color: 'var(--accent, #ec4899)', fontWeight: 600, marginBottom: '12px' }}>
            Reference ID: {referenceId}
          </p>
        )}
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 20px' }}>
          Thank you for choosing {siteConfig.name}. Our dispatch coordinator will review your freight route requirements and contact you within 15–30 minutes with confirmed vehicle availability and rates.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
            className="modal-submit"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px' }}
          >
            <Phone size={16} /> Direct Dispatch: {siteConfig.phone}
          </a>
          <a
            href={`https://wa.me/91${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-submit"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', background: '#25D366', color: '#fff' }}
          >
            WhatsApp Dispatch
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={isModal ? 'modal-form' : `quote-form-grid ${className}`}
      noValidate={false}
    >
      {status === 'error' && (
        <div
          style={{
            gridColumn: '1 / -1',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: 12,
            padding: '14px 16px',
            color: '#f87171',
            fontSize: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            marginBottom: 16,
          }}
          role="alert"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 4, flexWrap: 'wrap' }}>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
              style={{ color: '#fff', textDecoration: 'underline', fontSize: 13, fontWeight: 600 }}
            >
              Call Dispatch: {siteConfig.phone}
            </a>
            <a
              href={`https://wa.me/91${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#25D366', textDecoration: 'underline', fontSize: 13, fontWeight: 600 }}
            >
              WhatsApp Dispatch
            </a>
          </div>
        </div>
      )}

      {/* Pickup location */}
      <div className="form-field">
        <label htmlFor={isModal ? 'q-pickup-modal' : 'q-pickup'} className="form-label">
          Pickup City / Location *
        </label>
        <div className="form-input-wrap">
          <MapPin size={14} className="form-input-icon" />
          <input
            id={isModal ? 'q-pickup-modal' : 'q-pickup'}
            name="pickupLocation"
            className="form-input"
            placeholder="e.g. Coimbatore, Tamil Nadu"
            required
            autoComplete="address-level2"
          />
        </div>
      </div>

      {/* Delivery location */}
      <div className="form-field">
        <label htmlFor={isModal ? 'q-delivery-modal' : 'q-delivery'} className="form-label">
          Delivery Destination *
        </label>
        <div className="form-input-wrap">
          <MapPin size={14} className="form-input-icon" />
          <input
            id={isModal ? 'q-delivery-modal' : 'q-delivery'}
            name="deliveryLocation"
            className="form-input"
            placeholder="e.g. Chennai / Mumbai / Hyderabad"
            required
            autoComplete="address-level2"
          />
        </div>
      </div>

      {/* Material */}
      <div className="form-field">
        <label htmlFor={isModal ? 'q-material-modal' : 'q-material'} className="form-label">
          Cargo / Material Type *
        </label>
        <div className="form-input-wrap">
          <Package size={14} className="form-input-icon" />
          <input
            id={isModal ? 'q-material-modal' : 'q-material'}
            name="materialType"
            className="form-input"
            placeholder="e.g. Textiles, Auto Parts, FMCG, Machinery"
            required
          />
        </div>
      </div>

      {/* Weight */}
      <div className="form-field">
        <label htmlFor={isModal ? 'q-weight-modal' : 'q-weight'} className="form-label">
          Approximate Weight / Volume
        </label>
        <div className="form-input-wrap">
          <Weight size={14} className="form-input-icon" />
          <input
            id={isModal ? 'q-weight-modal' : 'q-weight'}
            name="weight"
            className="form-input"
            placeholder="e.g. 5 Tons / 2,500 Kgs / 150 Boxes"
          />
        </div>
      </div>

      {/* Vehicle type */}
      <div className="form-field">
        <label htmlFor={isModal ? 'q-vehicle-modal' : 'q-vehicle'} className="form-label">
          Required Vehicle Type *
        </label>
        <div className="form-input-wrap">
          <Truck size={14} className="form-input-icon" />
          <select
            id={isModal ? 'q-vehicle-modal' : 'q-vehicle'}
            name="vehicleType"
            className="form-input"
            defaultValue={preselectedVehicle || vehicles[0]?.name || 'Tata Pickup'}
            required
          >
            {vehicles.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name} ({v.chip})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date */}
      <div className="form-field">
        <label htmlFor={isModal ? 'q-date-modal' : 'q-date'} className="form-label">
          Required Loading Date *
        </label>
        <div className="form-input-wrap">
          <Calendar size={14} className="form-input-icon" />
          <input
            id={isModal ? 'q-date-modal' : 'q-date'}
            name="requiredDate"
            className="form-input"
            type="date"
            min={todayStr}
            required
          />
        </div>
      </div>

      {/* Name */}
      <div className="form-field">
        <label htmlFor={isModal ? 'q-name-modal' : 'q-name'} className="form-label">
          Contact Name *
        </label>
        <div className="form-input-wrap">
          <User size={14} className="form-input-icon" />
          <input
            id={isModal ? 'q-name-modal' : 'q-name'}
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
        <label htmlFor={isModal ? 'q-company-modal' : 'q-company'} className="form-label">
          Company / Enterprise Name
        </label>
        <div className="form-input-wrap">
          <Building size={14} className="form-input-icon" />
          <input
            id={isModal ? 'q-company-modal' : 'q-company'}
            name="companyName"
            className="form-input"
            placeholder="Your business or enterprise name"
            autoComplete="organization"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="form-field">
        <label htmlFor={isModal ? 'q-phone-modal' : 'q-phone'} className="form-label">
          Mobile Number (10 Digits) *
        </label>
        <div className="form-input-wrap">
          <Phone size={14} className="form-input-icon" />
          <input
            id={isModal ? 'q-phone-modal' : 'q-phone'}
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

      {/* Email */}
      <div className="form-field">
        <label htmlFor={isModal ? 'q-email-modal' : 'q-email'} className="form-label">
          Email Address
        </label>
        <div className="form-input-wrap">
          <Mail size={14} className="form-input-icon" />
          <input
            id={isModal ? 'q-email-modal' : 'q-email'}
            name="email"
            className="form-input"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
          />
        </div>
      </div>

      {/* Additional details */}
      <div className="form-field full-width" style={{ gridColumn: '1 / -1' }}>
        <label htmlFor={isModal ? 'q-details-modal' : 'q-details'} className="form-label">
          Additional Cargo Requirements
        </label>
        <div className="form-input-wrap">
          <FileText size={14} className="form-input-icon" />
          <textarea
            id={isModal ? 'q-details-modal' : 'q-details'}
            name="additionalDetails"
            className="form-input"
            placeholder="Special dimensions, handling instructions, loading dock hours..."
            rows={3}
            style={{ height: 'auto', minHeight: '80px', paddingTop: '10px' }}
          />
        </div>
      </div>

      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Submit button */}
      <div style={{ gridColumn: '1 / -1', marginTop: 8 }}>
        <button
          type="submit"
          className={isModal ? 'modal-submit' : 'btn btn-primary btn-lg'}
          disabled={status === 'submitting'}
          style={!isModal ? { width: '100%', justifyContent: 'center' } : undefined}
        >
          <Send size={16} />
          {status === 'submitting' ? 'Submitting Quote Request...' : 'Submit Quote Request'}
        </button>
      </div>
    </form>
  );
}