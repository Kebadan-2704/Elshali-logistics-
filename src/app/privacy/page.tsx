import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | ELSALI LOGISTICS',
  description: 'Privacy Policy and data governance practices for ELSALI LOGISTICS freight and logistics solutions.',
};

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--color-navy-950)', minHeight: '100vh', padding: '120px 24px 80px', color: 'white' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--color-pink-400)',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(184, 0, 109, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pink-400)' }}>
            <Shield size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Privacy Policy</h1>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 12, padding: '12px 16px', marginBottom: 32, color: 'var(--color-slate-400)', fontSize: 13 }}>
          <strong>NOTE:</strong> DRAFT TEMPLATE FOR ELSALI LOGISTICS — REVIEW BY LEGAL BEFORE PUBLISHING.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontSize: 15, lineHeight: 1.7, color: 'var(--color-slate-300)' }}>
          <section>
            <h2 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>1. Information We Collect</h2>
            <p>
              When requesting freight quotes or contacting ELSALI LOGISTICS, we collect business contact information, including your full name, company name, telephone number, email address, freight commodity details, pickup location, and destination city. This information is solely used to evaluate freight feasibility, calculate rate quotes, and arrange vehicle placement.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>2. How We Use Your Information</h2>
            <p>
              We use customer information strictly for dispatch coordination, transport billing, vehicle tracking notifications, and compliance with statutory transport regulations across Tamil Nadu and interstate corridors. We do not sell, rent, or trade your personal or enterprise data to third-party advertisers.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>3. Data Storage & Security</h2>
            <p>
              All inquiry and dispatch communications are transmitted via encrypted HTTPS channels. Access to cargo records is restricted strictly to authorized logistics operations personnel.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>4. Contact for Privacy Inquiries</h2>
            <p>
              For any questions regarding your data or our freight transport privacy practices, contact us directly at <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--color-pink-400)' }}>{siteConfig.email}</a> or call <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} style={{ color: 'var(--color-pink-400)' }}>{siteConfig.phone}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
