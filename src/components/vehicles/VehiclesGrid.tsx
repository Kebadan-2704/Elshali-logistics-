'use client';

import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { vehicles, Vehicle } from '@/data/vehicles';
import { siteConfig } from '@/data/site';
import { useQuote } from '@/components/QuoteProvider';
import Card from '@/components/ui/Card';

export default function VehiclesGrid() {
  const { openQuote } = useQuote();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
      {vehicles.map((v: Vehicle, idx: number) => (
        <Card
          key={v.id}
          variant="glass"
          style={{
            padding: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', width: '100%', height: '220px', background: '#0B1222' }}>
            <Image
              src={v.image}
              alt={`${v.chip} - ${v.name} commercial logistics vehicle`}
              fill
              priority={idx < 2}
              loading={idx < 2 ? undefined : 'lazy'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
            <span
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(6, 11, 22, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#EC4899',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(236, 72, 153, 0.3)',
              }}
            >
              {v.chip}
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              {v.name}
            </h2>
            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
              {v.description}
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button
                type="button"
                onClick={() => openQuote(v.name)}
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #B8006D, #EC4899)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Request Rate <ArrowRight size={14} />
              </button>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F8FAFC',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                }}
                aria-label={`Call dispatch about ${v.name}`}
              >
                <Phone size={15} />
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

