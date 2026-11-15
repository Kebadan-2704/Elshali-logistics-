import { Phone } from 'lucide-react';
import { siteConfig } from '@/data/site';
import QuoteButton from './QuoteButton';

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Hero">
      {/* Background: Pure CSS gradient on mobile, highway fleet photography on desktop */}
      <div className="hero-bg">
        <picture className="hero-desktop-picture">
          <img
            src="/images/hero-logistics.webp"
            alt="ELSHALI LOGISTICS commercial road transport fleet on highway"
            fetchPriority="high"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '70% center',
            }}
          />
        </picture>
      </div>

      {/* Overlays */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dash" aria-hidden="true" />
          <span className="hero-eyebrow-text">ELSHALI LOGISTICS</span>
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1 }}>
          Reliable<br />
          Transportation.<br />
          <span className="pink-gradient">Timely Delivery.</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
            fontWeight: 500,
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 0.88)',
            marginTop: '16px',
            maxWidth: '560px',
            letterSpacing: 'normal',
          }}
        >
          LCV &amp; HCV Road Freight Transport in Coimbatore, Tamil Nadu and Pan-India
        </p>

        {/* Buttons */}
        <div className="hero-buttons">
          <QuoteButton />

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
