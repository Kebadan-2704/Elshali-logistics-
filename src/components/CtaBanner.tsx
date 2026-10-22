'use client';

import { Truck, ArrowRight, Phone } from 'lucide-react';
import { useQuote } from './QuoteProvider';
import { siteConfig } from '@/data/site';

export default function CtaBanner() {
  const { openQuote } = useQuote();

  return (
    <div className="container" style={{ padding: '0 24px' }}>
      <div className="cta-banner" role="complementary" aria-label="Call to action">
        <div className="cta-icon-circle">
          <Truck size={24} color="white" />
        </div>
        <h2 className="section-heading" style={{ fontSize: '44px', lineHeight: 1.3, color: 'var(--color-ink)' }}>
          Need a Vehicle for Your<br />
          <span className="magenta">Next Shipment?</span>
        </h2>
        <p>
          Share your pickup, delivery and cargo requirements with us and our team will
          help you with the right transportation solution.
        </p>
        <div className="cta-buttons">
          <button className="btn-primary-pill" onClick={() => openQuote()}>
            GET A QUOTE
            <span className="arrow-badge" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </button>
          <a href={`tel:${siteConfig.phone}`} className="cta-outline-btn">
            <Phone size={16} />
            CALL NOW
          </a>
        </div>
      </div>
    </div>
  );
}
