'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

export default function FaqAccordion({
  items,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about commercial freight carriage, vehicle placement, and documentation.',
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-container" style={{ marginTop: '56px', marginBottom: '40px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(236, 72, 153, 0.1)',
            border: '1px solid rgba(236, 72, 153, 0.25)',
            color: '#EC4899',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '12px',
          }}
        >
          <HelpCircle size={14} />
          <span>HELP &amp; FREIGHT GUIDANCE</span>
        </div>
        <h2 style={{ fontSize: 'clamp(24px, 3.8vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '840px', margin: '0 auto' }}>
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              style={{
                borderRadius: '14px',
                background: isOpen ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                border: isOpen ? '1px solid rgba(236, 72, 153, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: isOpen ? '#FFFFFF' : '#E2E8F0',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                <span>{item.question}</span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? 'rgba(236, 72, 153, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: isOpen ? '#EC4899' : '#94A3B8',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <ChevronDown size={16} />
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 22px 20px',
                    color: '#94A3B8',
                    fontSize: '14.5px',
                    lineHeight: 1.7,
                    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                    paddingTop: '14px',
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

