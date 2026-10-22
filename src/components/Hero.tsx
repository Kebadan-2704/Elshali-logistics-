'use client';

import Image from 'next/image';
import { useQuote } from './QuoteProvider';
import { Phone, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/site';

export default function Hero() {
  const { openQuote } = useQuote();

  return (
    <section id="hero" className="hero" aria-label="Hero">
      {/* Background image */}
      <div className="hero-bg">
        <Image
          src="/images/hero-logistics.webp"
          alt="Semi-truck freight convoy on highway at sunset"
          fill
          priority
          sizes="100vw"
          quality={80}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Overlays */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dash" aria-hidden="true" />
          <span className="hero-eyebrow-text">ELSALI LOGISTICS</span>
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1 }}>
          Reliable<br />
          Transportation.<br />
          <span className="pink-gradient">Timely Delivery.</span>
        </h1>

        {/* Buttons */}
        <div className="hero-buttons">
          <button
            className="btn-primary-pill"
            onClick={() => openQuote()}
          >
            GET A QUOTE
            <span className="arrow-badge" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </button>

          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
            className="btn-ghost-pill"
          >
            <Phone size={16} className="icon" />
            CALL US
          </a>
        </div>
      </div>
    </section>
  );
}
