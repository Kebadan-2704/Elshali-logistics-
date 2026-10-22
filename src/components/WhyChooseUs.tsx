'use client';

import { useEffect, useRef } from 'react';
import {
  BadgePercent,
  Zap,
  ShieldCheck,
  Clock,
  Headset,
  Globe,
  HeartHandshake,
  Lock,
} from 'lucide-react';
import { whyItems } from '@/data/why';
import { useQuote } from './QuoteProvider';

const iconMap: Record<string, React.ElementType> = {
  'badge-percent': BadgePercent,
  zap: Zap,
  'shield-check': ShieldCheck,
  clock: Clock,
  headset: Headset,
  globe: Globe,
  'heart-handshake': HeartHandshake,
  lock: Lock,
};

export default function WhyChooseUs() {
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
      id="why-choose-us"
      className="why-section"
      aria-labelledby="why-heading"
      ref={sectionRef}
    >
      <div className="container">
        <div className="why-header reveal">
          <div className="eyebrow magenta" style={{ justifyContent: 'center' }}>
            WHY CHOOSE US
          </div>
          <h2 id="why-heading" className="section-heading" style={{ fontSize: '44px', color: 'var(--color-ink)' }}>
            Built on Trust,<br />
            <span className="magenta">Driven by Service.</span>
          </h2>
          <p>
            We understand that timely transport and dependable vehicle placement are critical
            to your supply chain. Here&apos;s why businesses trust ELSALI LOGISTICS.
          </p>
        </div>

        <div className="why-grid">
          {whyItems.map((item, i) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <div
                key={i}
                className="why-card reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="why-card-header">
                  <div className="why-card-icon">
                    <Icon size={24} />
                  </div>
                  <span className="why-card-number">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <button
            className="btn-primary-pill"
            onClick={() => openQuote()}
            style={{ padding: '16px 36px', fontSize: '15px' }}
          >
            GET A QUOTE
          </button>
        </div>
      </div>
    </section>
  );
}
