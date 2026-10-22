'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { FileText, CheckCircle2, ClipboardList, Truck, User, DollarSign, BarChart3, Building2 } from 'lucide-react';

const docs = [
  { icon: FileText, title: 'LR Support', text: 'Lorry Receipt documentation for all shipments.' },
  { icon: CheckCircle2, title: 'POD Support', text: 'Proof of Delivery coordination and collection.' },
  { icon: ClipboardList, title: 'Delivery Confirmation', text: 'Real-time delivery status confirmation.' },
  { icon: Truck, title: 'Vehicle Details', text: 'Complete vehicle information and registration details.' },
  { icon: User, title: 'Driver Details', text: 'Verified driver information and contact details.' },
  { icon: DollarSign, title: 'Freight Documentation', text: 'Complete freight rate and charges documentation.' },
  { icon: BarChart3, title: 'Billing Documentation', text: 'Professional billing and invoice support.' },
  { icon: Building2, title: 'GSTIN Details', text: 'GST-compliant documentation for all transactions.' },
];

export default function DocumentationPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Documentation</span>
        <h1 className="page-hero-title">
          Transport <span className="highlight">Documentation</span>
        </h1>
        <p className="page-hero-subtitle">
          We support proper transportation documentation and delivery coordination. Proper documentation helps maintain transparency between the customer, transporter and consignee.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header animate-fade-up">
            <span className="section-badge">Documents & Support</span>
            <h2 className="section-title">
              Complete Documentation <span className="highlight">Support</span>
            </h2>
          </div>

          <div className="grid-4 animate-fade-up" style={{ transitionDelay: '0.2s' }}>
            {docs.map((d, i) => (
              <div key={i} className="card glass-card-premium hover-lift" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="card-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <d.icon size={24} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <h3 className="card-title" style={{ fontSize: '16px' }}>{d.title}</h3>
                <p className="card-text">{d.text}</p>
              </div>
            ))}
          </div>

          <div className="card card-pink animate-fade-up" style={{ textAlign: 'center', padding: '48px', marginTop: '48px' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
              Transparency Through Documentation
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto' }}>
              Proper documentation helps maintain transparency between the customer, transporter and consignee. All required documents are provided for seamless billing and record-keeping.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
