'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useScroll, useTransform, motion, useReducedMotion } from 'motion/react';
import { SquareCheckBig, ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { useQuote } from './QuoteProvider';

const N = services.length; // 9

function ServiceCard({
  service,
  index,
  scrollYProgress,
}: {
  service: (typeof services)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const isFirst = index === 0;
  const isLast = index === N - 1;

  // Each card has a window across scrollYProgress [0, 1]
  const cardStart = index / N;
  const cardFull = isFirst ? 0 : (index - 0.25) / N;
  const cardEnd = (index + 0.85) / N;
  const cardExit = (index + 1.1) / N;

  const combinedY = useTransform(scrollYProgress, (pos) => {
    if (isFirst) {
      if (pos < cardEnd) return 0;
      const t = Math.min(1, Math.max(0, (pos - cardEnd) / (cardExit - cardEnd)));
      return -24 * t;
    }
    if (pos < cardFull) {
      const t = Math.min(1, Math.max(0, (pos - (cardStart - 0.5 / N)) / (cardFull - (cardStart - 0.5 / N))));
      return 50 * (1 - t);
    }
    if (pos < cardEnd || isLast) return 0;
    const t = Math.min(1, Math.max(0, (pos - cardEnd) / (cardExit - cardEnd)));
    return -24 * t;
  });

  const combinedOpacity = useTransform(scrollYProgress, (pos) => {
    if (isFirst) {
      if (pos < cardEnd) return 1;
      const t = Math.min(1, Math.max(0, (pos - cardEnd) / (cardExit - cardEnd)));
      return 1 - t;
    }
    if (pos < cardFull) {
      const t = Math.min(1, Math.max(0, (pos - (cardStart - 0.5 / N)) / (cardFull - (cardStart - 0.5 / N))));
      return t;
    }
    if (pos < cardEnd || isLast) return 1;
    const t = Math.min(1, Math.max(0, (pos - cardEnd) / (cardExit - cardEnd)));
    return 1 - t;
  });

  const combinedScale = useTransform(scrollYProgress, (pos) => {
    if (isFirst) {
      if (pos < cardEnd) return 1;
      const t = Math.min(1, Math.max(0, (pos - cardEnd) / (cardExit - cardEnd)));
      return 1 - 0.04 * t;
    }
    if (pos < cardFull) {
      const t = Math.min(1, Math.max(0, (pos - (cardStart - 0.5 / N)) / (cardFull - (cardStart - 0.5 / N))));
      return 0.96 + 0.04 * t;
    }
    if (pos < cardEnd || isLast) return 1;
    const t = Math.min(1, Math.max(0, (pos - cardEnd) / (cardExit - cardEnd)));
    return 1 - 0.04 * t;
  });

  const toneClass =
    service.tone === 'magenta'
      ? 'tone-magenta'
      : service.tone === 'frost'
        ? 'tone-frost'
        : 'tone-light';

  return (
    <motion.div
      className={`service-card ${toneClass}`}
      style={{
        y: combinedY,
        opacity: combinedOpacity,
        scale: combinedScale,
        zIndex: index,
      }}
    >
      <span className="service-card-number" aria-hidden="true">{service.id}</span>
      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.description}</p>
      <span className="service-card-features-label">FEATURES INCLUDED</span>
      <div className="service-card-features">
        {service.features.map((f, j) => (
          <div key={j} className="service-card-feature">
            <SquareCheckBig size={17} />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Mobile & reduced-motion fallback card
function ServiceCardMobile({ service }: { service: (typeof services)[number] }) {
  const toneClass =
    service.tone === 'magenta'
      ? 'tone-magenta'
      : service.tone === 'frost'
        ? 'tone-frost'
        : 'tone-light';

  return (
    <div className={`service-card ${toneClass}`}>
      <span className="service-card-number" aria-hidden="true">{service.id}</span>
      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.description}</p>
      <span className="service-card-features-label">FEATURES INCLUDED</span>
      <div className="service-card-features">
        {service.features.map((f, j) => (
          <div key={j} className="service-card-feature">
            <SquareCheckBig size={17} />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesStack() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const { openQuote } = useQuote();

  return (
    <section
      id="services"
      ref={ref}
      className={`services-section ${shouldReduceMotion ? 'reduced-motion' : ''}`}
      aria-labelledby="services-heading"
    >
      <div className="services-stage">
        {/* Left panel */}
        <div className="services-left">
          <Image
            src="/images/hero-logistics.webp"
            alt="Commercial freight truck fleet"
            fill
            sizes="(max-width: 1024px) 100vw, 548px"
            quality={80}
            style={{ objectFit: 'cover' }}
          />
          <div className="services-left-overlay" aria-hidden="true" />
          <div className="services-left-content">
            <h2 id="services-heading" className="services-left-title">
              OUR<br />SERVICES
            </h2>
            <button className="services-view-btn" onClick={() => openQuote()}>
              View all services
              <span className="badge" aria-hidden="true">
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>

        {/* Right panel — card deck */}
        <div className="services-deck">
          {shouldReduceMotion
            ? services.map((s) => <ServiceCardMobile key={s.id} service={s} />)
            : services.map((s, i) => (
                <ServiceCard
                  key={s.id}
                  service={s}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
