'use client';

import { useEffect, useRef } from 'react';
import {
  Factory,
  HardHat,
  BarChart3,
  Package,
  Truck,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { useQuote } from './QuoteProvider';

const solutions = [
  {
    icon: Factory,
    title: 'Manufacturers',
    description: 'Regular movement of raw materials, components and finished goods.',
    highlight: true,
  },
  {
    icon: HardHat,
    title: 'Industries',
    description: 'Transportation of industrial materials and equipment.',
    highlight: false,
  },
  {
    icon: BarChart3,
    title: 'Traders',
    description: 'Movement of goods between suppliers, warehouses and customers.',
    highlight: false,
  },
  {
    icon: Package,
    title: 'Distributors',
    description: 'Regular delivery and distribution transportation.',
    highlight: true,
  },
  {
    icon: Truck,
    title: 'Logistics Companies',
    description: 'Vehicle placement support for additional transportation requirements.',
    highlight: false,
  },
  {
    icon: Building2,
    title: 'Corporate Companies',
    description: 'Dedicated transportation arrangements based on business requirements.',
    highlight: true,
  },
];

export default function BusinessSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openQuote } = useQuote();

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
      id="business-solutions"
      className="biz-section"
      aria-labelledby="biz-heading"
      ref={sectionRef}
    >
      <div className="container">
        <div className="biz-header reveal">
          <div className="eyebrow magenta" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-dash" aria-hidden="true" />
            BUSINESS SOLUTIONS
          </div>
          <h2
            id="biz-heading"
            className="section-heading"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--color-ink)', textAlign: 'center' }}
          >
            Transportation Solutions<br />
            <span className="magenta">For Every Business</span>
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '560px', margin: '16px auto 0', color: 'var(--color-slate-500)' }}>
            ELSALI LOGISTICS supports manufacturers, industries, traders, distributors, logistics companies and corporate enterprises.
          </p>
        </div>

        <div className="biz-grid">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`biz-card ${s.highlight ? 'highlight' : ''} reveal`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="biz-card-icon">
                <s.icon size={28} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <button
                className="biz-card-link"
                onClick={() => openQuote()}
                aria-label={`Get a quote for ${s.title}`}
              >
                Get a Quote
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
