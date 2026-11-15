import React from 'react';
import { Star, Quote } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  author: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  date?: string;
}

/**
 * Verified customer reviews registry.
 * Defaulted to empty array until owner confirms client permissions & signed review quotes.
 * Tracked in OWNER_ACTIONS.md.
 */
export const testimonialsData: TestimonialItem[] = [];

export default function Testimonials() {
  // Renders null when no verified client reviews exist, preventing fabricated content.
  if (!testimonialsData || testimonialsData.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="testimonials-section" aria-label="Customer Reviews">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="eyebrow magenta" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-dash" aria-hidden="true" />
            CLIENT FEEDBACK
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#fff', marginTop: '12px' }}>
            Verified Shipper &amp; Factory Reviews
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Quote size={24} style={{ color: '#EC4899', marginBottom: '16px' }} />
                <p style={{ color: '#CBD5E1', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={14} style={{ color: '#FBBF24', fill: '#FBBF24' }} />
                  ))}
                </div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '15px' }}>{t.author}</div>
                <div style={{ color: '#94A3B8', fontSize: '13px' }}>{t.role}, {t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

