'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Phone, Gauge, Maximize2, Box } from 'lucide-react';
import { vehicles, Vehicle } from '@/data/vehicles';
import { siteConfig } from '@/data/site';
import { useQuote } from '@/components/QuoteProvider';

export default function VehiclesGrid() {
  const { openQuote } = useQuote();
  const [activeTab, setActiveTab] = useState<'all' | 'light' | 'medium' | 'heavy'>('all');

  const filtered = activeTab === 'all' ? vehicles : vehicles.filter((v) => v.category === activeTab);

  return (
    <div>
      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '36px',
        }}
      >
        {[
          { id: 'all', label: 'All Fleet (8)' },
          { id: 'light', label: 'Light Commercial (1–3.5T)' },
          { id: 'medium', label: 'Medium Freight (4–10T)' },
          { id: 'heavy', label: 'Heavy Haulage (12–25T+)' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: isActive
                  ? 'linear-gradient(135deg, #B8006D, #EC4899)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
                border: isActive ? '1px solid rgba(236, 72, 153, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isActive ? '0 8px 24px -6px rgba(184, 0, 109, 0.4)' : 'none',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {filtered.map((v: Vehicle) => (
          <div
            key={v.id}
            style={{
              background: 'linear-gradient(145deg, rgba(11, 20, 38, 0.85) 0%, rgba(6, 11, 22, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
            }}
          >
            {/* Top Badge */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  background: 'rgba(184, 0, 109, 0.15)',
                  border: '1px solid rgba(236, 72, 153, 0.35)',
                  color: '#EC4899',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  letterSpacing: '0.06em',
                }}
              >
                {v.chip}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {v.categoryLabel}
              </span>
            </div>

            {/* 3D Model Stage */}
            <div
              style={{
                position: 'relative',
                background: 'radial-gradient(ellipse at bottom, rgba(184, 0, 109, 0.15) 0%, rgba(6, 11, 22, 0.8) 75%)',
                borderRadius: '14px',
                padding: '8px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                marginBottom: '18px',
                overflow: 'hidden',
                aspectRatio: '16 / 9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={v.image3d}
                alt={`${v.name} 3D commercial model`}
                width={640}
                height={360}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.6))',
                  transition: 'transform 0.3s ease',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(6, 11, 22, 0.8)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(236, 72, 153, 0.4)',
                  borderRadius: '6px',
                  padding: '2px 8px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#EC4899',
                  letterSpacing: '0.05em',
                }}
              >
                ✦ 3D MODEL
              </span>
            </div>

            {/* Title & Description */}
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              {v.name}
            </h2>
            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '16px' }}>
              {v.description}
            </p>

            {/* Technical Specs Pill Matrix */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#EC4899', fontWeight: 700 }}>
                  <Gauge size={11} />
                  PAYLOAD
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                  {v.payload}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#EC4899', fontWeight: 700 }}>
                  <Maximize2 size={11} />
                  DECK SIZE
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                  {v.deckDimensions}
                </div>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#EC4899', fontWeight: 700 }}>
                  <Box size={11} />
                  BODY TYPE
                </div>
                <div style={{ fontSize: '12px', color: '#E2E8F0', marginTop: '2px' }}>
                  {v.bodyType}
                </div>
              </div>
            </div>

            {/* Key Feature */}
            <div
              style={{
                fontSize: '12px',
                color: '#34D399',
                background: 'rgba(52, 211, 153, 0.08)',
                border: '1px solid rgba(52, 211, 153, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>✓</span>
              <span>{v.keyFeature}</span>
            </div>

            {/* CTAs */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => openQuote(v.name)}
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, #B8006D, #EC4899)',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px -4px rgba(184, 0, 109, 0.4)',
                }}
              >
                REQUEST QUOTE
                <ArrowRight size={14} />
              </button>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                }}
                aria-label={`Call dispatch for ${v.name}`}
              >
                <Phone size={15} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
