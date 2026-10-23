'use client';

import { useEffect, useRef } from 'react';
import {
  MessageSquareText,
  ClipboardList,
  Calculator,
  Handshake,
  Truck,
  PackageCheck,
  Radio,
  MapPin,
  FileCheck,
  FileText,
} from 'lucide-react';

const steps = [
  {
    icon: MessageSquareText,
    title: 'Share Your Requirement',
    description: 'Customer shares transportation requirement with our team.',
  },
  {
    icon: ClipboardList,
    title: 'Requirement Collection',
    description: 'We collect route, material, weight, dimensions and vehicle details.',
  },
  {
    icon: Calculator,
    title: 'Freight Quotation',
    description: 'We provide the best possible freight quotation for your route.',
  },
  {
    icon: Handshake,
    title: 'Rate Confirmation',
    description: 'After rate confirmation, suitable vehicle is arranged.',
  },
  {
    icon: Truck,
    title: 'Vehicle Placement',
    description: 'Vehicle reports at the pickup location on scheduled date.',
  },
  {
    icon: PackageCheck,
    title: 'Loading & Dispatch',
    description: 'Loading and dispatch coordination is completed.',
  },
  {
    icon: Radio,
    title: 'Transit Monitoring',
    description: 'Transit movement is monitored and coordinated.',
  },
  {
    icon: MapPin,
    title: 'Delivery',
    description: 'Vehicle reaches the delivery location safely.',
  },
  {
    icon: FileCheck,
    title: 'POD Collection',
    description: 'Delivery confirmation and POD collection are coordinated.',
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Required documents are submitted for billing.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      className="process-section"
      aria-labelledby="process-heading"
      ref={sectionRef}
    >
      <div className="container">
        <div className="process-header reveal">
          <div className="eyebrow magenta" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-dash" aria-hidden="true" />
            OUR PROCESS
          </div>
          <h2
            id="process-heading"
            className="section-heading"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'white', textAlign: 'center' }}
          >
            Vehicle Placement Process —<br />
            <span className="pink">Simple, Transparent, Reliable.</span>
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '16px auto 0', color: 'var(--color-slate-400)' }}>
            From your initial inquiry to final delivery, we coordinate every step of the transportation process.
          </p>
        </div>

        <div className="process-timeline">
          {steps.map((step, i) => (
            <div
              key={i}
              className="process-step reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="process-step-number">
                <span>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="process-step-connector" aria-hidden="true" />
              <div className="process-step-card">
                <div className="process-step-icon">
                  <step.icon size={22} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
