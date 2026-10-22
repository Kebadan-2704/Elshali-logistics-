'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Truck, ShieldCheck, Clock, Target, Eye, Headset } from 'lucide-react';

const values = [
  {
    label: 'MISSION',
    icon: Target,
    title: 'Our Mission',
    body: 'Fast & reliable LCV & HCV freight transport across India.',
  },
  {
    label: 'VISION',
    icon: Eye,
    title: 'Our Vision',
    body: "To be India's most trusted partner in freight logistics.",
  },
  {
    label: 'SAFETY',
    icon: ShieldCheck,
    title: 'Safety Promise',
    body: '100% cargo safety with verified drivers and secure transit.',
  },
  {
    label: 'SUPPORT',
    icon: Headset,
    title: '24/7 Support',
    body: 'Real-time tracking and 24/7 dedicated dispatch support.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="about-heading"
      ref={sectionRef}
    >
      <div className="container">
        <div className="about-grid">
          {/* Left — image card */}
          <div className="about-image-card reveal">
            <Image
              src="/images/warehouse-interior.webp"
              alt="Modern logistics warehouse interior with storage racks and organized pallet goods"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={80}
              style={{ objectFit: 'cover' }}
            />
            {/* Floating badge */}
            <div className="about-badge">
              <div className="about-badge-label">COMMITMENT</div>
              <div className="about-badge-text">Reliable &amp; Timely Delivery</div>
            </div>
            {/* Bottom glass strip */}
            <div className="about-glass-strip">
              <div className="about-glass-item">
                <Truck size={18} className="about-glass-icon" />
                <div className="about-glass-text">
                  <strong>Safe</strong>
                  <span>Handling</span>
                </div>
              </div>
              <div className="about-glass-item">
                <ShieldCheck size={18} className="about-glass-icon" />
                <div className="about-glass-text">
                  <strong>Secure</strong>
                  <span>Transit</span>
                </div>
              </div>
              <div className="about-glass-item">
                <Clock size={18} className="about-glass-icon" />
                <div className="about-glass-text">
                  <strong>On-Time</strong>
                  <span>Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — copy */}
          <div className="about-copy reveal">
            <div className="eyebrow magenta">ABOUT ELSALI</div>
            <h2 id="about-heading" className="section-heading" style={{ fontSize: '40px', color: 'var(--color-ink)' }}>
              Moving Businesses Forward,<br />
              <span className="magenta">One Delivery at a Time.</span>
            </h2>
            <p>
              Dependable LCV &amp; HCV freight solutions across Tamil Nadu and Pan India.
              We arrange suitable vehicles based on customer requirements, route, material,
              capacity and vehicle size — ensuring every shipment reaches its destination
              safely and on time.
            </p>
          </div>
        </div>

        {/* Four value cards */}
        <div className="about-values">
          {values.map((v, i) => (
            <div
              key={i}
              className="value-card reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="value-card-header">
                <span className="value-card-label">{v.label}</span>
                <v.icon size={18} className="value-card-icon" />
              </div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
