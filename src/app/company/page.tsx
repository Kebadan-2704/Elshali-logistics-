'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { Building2, Landmark, User, Phone, Mail, Globe, Lock } from 'lucide-react';

const coverage = ['North India', 'South India', 'East India', 'West India', 'Central India', 'Pan-India'];
const additionalNumbers = ['8667049878', '8610814831', '9667225840', '9442444820'];

export default function CompanyPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Company Information</span>
        <h1 className="page-hero-title">
          <span className="highlight">ELSALI LOGISTICS</span>
        </h1>
        <p className="page-hero-subtitle">
          Reliable Transportation. Professional Service. Pan-India Reach.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="split-layout animate-fade-up">
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '32px' }}>
                Company <span className="highlight">Details</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Company Name', value: 'ELSALI LOGISTICS', icon: Building2 },
                  { label: 'GSTIN', value: '33DQAPA3611N1Z8', icon: Landmark },
                  { label: 'Contact Person', value: 'C. ARUN KUMAR', icon: User },
                  { label: 'Primary Contact', value: '6369844820', icon: Phone },
                  { label: 'Email', value: 'elshalilogistics@gmail.com', icon: Mail },
                ].map((item, i) => (
                  <div key={i} className="contact-card glass-card-premium hover-lift">
                    <div className="contact-card-icon" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <item.icon size={20} color="var(--accent)" strokeWidth={1.5} />
                    </div>
                    <div className="contact-card-content">
                      <span className="contact-card-label">{item.label}</span>
                      <span className="contact-card-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '32px' }}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
                  Additional Contact Numbers
                </h3>
                <div className="grid-2">
                  {additionalNumbers.map((num, i) => (
                    <a key={i} href={`tel:${num}`} className="contact-card glass-card-premium hover-lift" style={{ textDecoration: 'none' }}>
                      <div className="contact-card-icon" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <Phone size={18} color="var(--accent)" strokeWidth={1.5} />
                      </div>
                      <div className="contact-card-content">
                        <span className="contact-card-value">{num}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="card card-pink hover-lift" style={{ marginBottom: '24px' }}>
                <h3 className="card-title" style={{ marginBottom: '20px', color: 'white' }}>Our Coverage</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {coverage.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                      <Globe size={16} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
                      <span style={{ fontWeight: 600, fontSize: '14px', color: 'white' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card glass-card-premium hover-lift">
                <div className="card-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Lock size={28} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <h3 className="card-title">GST Compliant</h3>
                <p className="card-text">
                  All our transportation services are fully GST-compliant with proper documentation support for billing and records.
                </p>
                <p style={{ marginTop: '12px', fontSize: '14px', fontWeight: 600, color: 'var(--accent)' }}>
                  GSTIN: 33DQAPA3611N1Z8
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
