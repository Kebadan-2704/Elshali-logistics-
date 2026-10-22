'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';

const steps = [
  { title: 'Share Requirement', text: 'Customer shares transportation requirement with our team.' },
  { title: 'Collect Details', text: 'We collect route, material, weight, dimensions and vehicle requirements.' },
  { title: 'Freight Quotation', text: 'We provide the best possible freight quotation for your cargo.' },
  { title: 'Rate Confirmation', text: 'After rate confirmation, suitable vehicle is arranged.' },
  { title: 'Vehicle Dispatch', text: 'Vehicle reports at the pickup location as scheduled.' },
  { title: 'Loading & Dispatch', text: 'Loading and dispatch coordination is completed.' },
  { title: 'Transit Monitoring', text: 'Transit movement is monitored and coordinated in real-time.' },
  { title: 'Delivery', text: 'Vehicle reaches the delivery location on time.' },
  { title: 'POD Collection', text: 'Delivery confirmation and POD collection are coordinated.' },
  { title: 'Documentation', text: 'Required documents are submitted for billing and records.' },
];

export default function ProcessPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Our Process</span>
        <h1 className="page-hero-title">
          Vehicle Placement <span className="highlight">Process</span>
        </h1>
        <p className="page-hero-subtitle">
          Our streamlined 10-step process ensures smooth transportation from requirement to delivery.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="process-timeline animate-fade-up">
            {steps.map((step, i) => (
              <div key={i} className="process-step">
                <div className="process-step-number">{String(i + 1).padStart(2, '0')}</div>
                <div className="process-step-content">
                  <div className="process-step-title">Step {i + 1}: {step.title}</div>
                  <div className="process-step-text">{step.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
