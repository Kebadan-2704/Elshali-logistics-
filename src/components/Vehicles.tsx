'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Plus } from 'lucide-react';
import { vehicles } from '@/data/vehicles';
import { useQuote } from './QuoteProvider';

function VehicleRow({
  items,
  defaultActive,
}: {
  items: typeof vehicles;
  defaultActive: number;
}) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const { openQuote } = useQuote();

  return (
    <div className="vehicles-row">
      {items.map((v, i) => {
        const isActive = activeIndex === i;

        return (
          <article
            key={v.id}
            className={`vehicle-card ${isActive ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
          >
            {/* Background image via next/image */}
            <div className="vehicle-card-bg">
              <Image
                src={v.image}
                alt={`${v.chip} - ${v.name}`}
                fill
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 35vw, 25vw"
                quality={80}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="vehicle-card-overlay" aria-hidden="true" />

            {/* Content */}
            <div className="vehicle-card-content">
              <div>
                <span className={`vehicle-chip ${isActive ? 'active' : 'inactive'}`}>
                  {v.chip}
                </span>
              </div>

              <div>
                {isActive ? (
                  <div className="vehicle-expanded">
                    <div className="vehicle-expanded-name">{v.name}</div>
                    <div className="vehicle-expanded-desc">{v.description}</div>
                    <button
                      type="button"
                      className="vehicle-request-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuote(v.name);
                      }}
                      aria-label={`REQUEST VEHICLE — ${v.name}`}
                    >
                      REQUEST VEHICLE
                      <span className="vehicle-request-badge" aria-hidden="true">
                        <ArrowRight size={12} />
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="vehicle-collapsed">
                    <div className="vehicle-collapsed-name">{v.name}</div>
                    <button
                      type="button"
                      className="vehicle-collapsed-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(i);
                      }}
                      aria-label={`Expand details for ${v.name}`}
                      aria-expanded="false"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function Vehicles() {
  const row1 = vehicles.slice(0, 4);
  const row2 = vehicles.slice(4, 8);

  return (
    <section id="vehicles" className="vehicles-section" aria-labelledby="vehicles-heading">
      <div className="container">
        {/* Header */}
        <div className="vehicles-header">
          <div className="eyebrow magenta" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-dash" aria-hidden="true" />
            OUR VEHICLES
          </div>
          <h2
            id="vehicles-heading"
            className="section-heading"
            style={{ fontSize: 'clamp(26px, 4.5vw, 48px)', color: 'var(--color-ink)', lineHeight: 1.2 }}
          >
            Vehicles For Every<br />
            <span className="magenta">Transportation Requirement</span>
          </h2>
          <p>
            Tap or hover over any vehicle card below to view details and request a freight rate quote.
          </p>
        </div>

        {/* Two rows without hardcoded fixed heights */}
        <VehicleRow items={row1} defaultActive={0} />
        <VehicleRow items={row2} defaultActive={0} />
      </div>
    </section>
  );
}
