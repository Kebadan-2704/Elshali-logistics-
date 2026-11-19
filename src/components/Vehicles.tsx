'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, Phone, ShieldCheck, Gauge, Box, Maximize2, Sparkles, Cuboid } from 'lucide-react';
import { vehicles } from '@/data/vehicles';
import { siteConfig } from '@/data/site';
import { useQuote } from './QuoteProvider';
import VehicleSchematic from './vehicles/VehicleSchematic';

const CATEGORIES = [
  { id: 'all', label: 'All Fleet Solutions', count: 8 },
  { id: 'light', label: 'Light Commercial (1–3.5T)', count: 2 },
  { id: 'medium', label: 'Medium Freight (4–10T)', count: 3 },
  { id: 'heavy', label: 'Heavy Haulage (12–25T+)', count: 3 },
] as const;

export default function Vehicles() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // Default to 6 (24 Ft High-Cube Multi-Axle) to immediately showcase the 3D model the client inspected
  const [selectedVehicleId, setSelectedVehicleId] = useState<number>(6);
  const [viewMode, setViewMode] = useState<'studio' | 'cad'>('studio');
  const { openQuote } = useQuote();

  // 3D tilt state for interactive depth
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -yPos * 10, // rotateX degrees
      y: xPos * 14,  // rotateY degrees
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const filteredVehicles = useMemo(() => {
    if (activeCategory === 'all') return vehicles;
    return vehicles.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  const activeVehicle = useMemo(() => {
    return vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
  }, [selectedVehicleId]);

  return (
    <section id="vehicles" className="vehicles-section" aria-labelledby="vehicles-heading">
      <div className="container">
        {/* Header */}
        <div className="vehicles-header">
          <div className="eyebrow pink" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-dash" aria-hidden="true" />
            COMMERCIAL ROAD FLEET
          </div>
          <h2
            id="vehicles-heading"
            className="section-heading"
            style={{ fontSize: 'clamp(26px, 4.2vw, 46px)', color: '#FFFFFF', lineHeight: 1.2 }}
          >
            Engineered Fleet Solutions For<br />
            <span className="pink">Every Industrial Cargo Requirement</span>
          </h2>
          <p style={{ color: 'var(--color-slate-400)', maxWidth: '660px', margin: '14px auto 0', fontSize: '15px' }}>
            Photorealistic 3D commercial vehicle models with verified payload ratings, cargo deck dimensions, and placement-ready commercial vehicle configurations across South India and Pan-India corridors.
          </p>

          {/* Category Filter Pills */}
          <div className="fleet-filter-bar" role="tablist" aria-label="Fleet Categories">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`fleet-filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    const inCategory = cat.id === 'all' || vehicles.some(v => v.category === cat.id && v.id === selectedVehicleId);
                    if (!inCategory) {
                      const firstInCat = vehicles.find(v => v.category === cat.id);
                      if (firstInCat) setSelectedVehicleId(firstInCat.id);
                    }
                  }}
                >
                  <span>{cat.label}</span>
                  <span className="fleet-filter-count">{cat.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Vehicle 3D Stage & Inspector */}
        <div className="fleet-inspector-card">
          <div className="fleet-inspector-grid">
            {/* Left: 3D Studio Showcase / CAD Blueprint */}
            <div className="fleet-schematic-pane">
              <div className="fleet-schematic-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="fleet-spec-badge">
                    <Sparkles size={13} className="text-pink-400" />
                    {viewMode === 'studio' ? '3D STUDIO MODEL' : 'VERIFIED CAD BLUEPRINT'}
                  </span>
                  <span className="fleet-category-tag">{activeVehicle.categoryLabel}</span>
                </div>

                {/* View Mode Toggle Switch */}
                <div className="fleet-view-toggle" role="group" aria-label="Vehicle Visualization Mode">
                  <button
                    type="button"
                    className={`fleet-toggle-btn ${viewMode === 'studio' ? 'active' : ''}`}
                    onClick={() => setViewMode('studio')}
                  >
                    <Cuboid size={13} />
                    <span>3D Model</span>
                  </button>
                  <button
                    type="button"
                    className={`fleet-toggle-btn ${viewMode === 'cad' ? 'active' : ''}`}
                    onClick={() => setViewMode('cad')}
                  >
                    <Maximize2 size={13} />
                    <span>CAD Blueprint</span>
                  </button>
                </div>
              </div>

              {/* 3D Visualizer Stage */}
              {viewMode === 'studio' ? (
                <div
                  ref={stageRef}
                  className="fleet-3d-stage"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  }}
                >
                  {/* Holographic HUD Overlay */}
                  <div className="fleet-3d-hud">
                    <div className="fleet-hud-chip top-left">
                      <span className="fleet-hud-dot" />
                      <span>1:1 COMMERCIAL RATIO</span>
                    </div>
                    <div className="fleet-hud-chip top-right">
                      <span>DECK: {activeVehicle.deckDimensions}</span>
                    </div>
                  </div>

                  {/* 3D Render Image */}
                  <div className="fleet-3d-image-wrap">
                    <Image
                      src={activeVehicle.image3d}
                      alt={`3D CGI model of ${activeVehicle.name}`}
                      width={1024}
                      height={576}
                      priority
                      className="fleet-3d-image"
                    />
                  </div>

                  {/* Floor Reflection and Glow Underbody */}
                  <div className="fleet-3d-floor-glow" aria-hidden="true" />

                  {/* Bottom Spec Floating Tags */}
                  <div className="fleet-3d-bottom-bar">
                    <div className="fleet-hud-chip bottom-left">
                      <span>MAX PAYLOAD: {activeVehicle.payload}</span>
                    </div>
                    <div className="fleet-hud-chip bottom-right">
                      <span>BODY: {activeVehicle.bodyType}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Vector CAD Blueprint */
                <VehicleSchematic type={activeVehicle.schematic} className="fleet-schematic-display" />
              )}

              <div className="fleet-schematic-footer">
                <div className="fleet-schematic-feature">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>{activeVehicle.keyFeature}</span>
                </div>
                <div className="fleet-interactive-hint">
                  {viewMode === 'studio' ? '✦ Hover to tilt in 3D perspective' : '✦ Technical dimension matrix'}
                </div>
              </div>
            </div>

            {/* Right: Technical Spec Matrix & Rate Action */}
            <div className="fleet-details-pane">
              <div className="fleet-details-top">
                <div className="fleet-name-wrap">
                  <span className="fleet-chip-pill">{activeVehicle.chip}</span>
                  <h3 className="fleet-active-name">{activeVehicle.name}</h3>
                </div>
                <p className="fleet-active-desc">{activeVehicle.description}</p>
              </div>

              {/* 4 Technical Parameter Boxes */}
              <div className="fleet-specs-grid">
                <div className="fleet-spec-box">
                  <div className="fleet-spec-label">
                    <Gauge size={13} className="text-pink-400" />
                    PAYLOAD CAPACITY
                  </div>
                  <div className="fleet-spec-value">{activeVehicle.payload}</div>
                </div>

                <div className="fleet-spec-box">
                  <div className="fleet-spec-label">
                    <Maximize2 size={13} className="text-pink-400" />
                    DECK DIMENSIONS
                  </div>
                  <div className="fleet-spec-value">{activeVehicle.deckDimensions}</div>
                </div>

                <div className="fleet-spec-box">
                  <div className="fleet-spec-label">
                    <Box size={13} className="text-pink-400" />
                    BODY STRUCTURE
                  </div>
                  <div className="fleet-spec-value" style={{ fontSize: '13px' }}>
                    {activeVehicle.bodyType}
                  </div>
                </div>

                <div className="fleet-spec-box">
                  <div className="fleet-spec-label">
                    <ShieldCheck size={13} className="text-pink-400" />
                    TRANSIT GEOGRAPHY
                  </div>
                  <div className="fleet-spec-value" style={{ fontSize: '13px' }}>
                    {activeVehicle.transitRange}
                  </div>
                </div>
              </div>

              {/* Ideal Industrial Cargo */}
              <div className="fleet-ideal-cargo">
                <span className="fleet-ideal-label">RECOMMENDED CARGO &amp; INDUSTRIES:</span>
                <p className="fleet-ideal-text">{activeVehicle.idealFor}</p>
              </div>

              {/* Actions */}
              <div className="fleet-action-row">
                <button
                  type="button"
                  className="fleet-btn-quote"
                  onClick={() => openQuote(activeVehicle.name)}
                >
                  REQUEST FREIGHT QUOTE FOR THIS VEHICLE
                  <ArrowRight size={15} />
                </button>

                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="fleet-btn-call"
                  aria-label="Call dispatch desk"
                >
                  <Phone size={15} />
                  <span>CALL DISPATCH</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Quick Selector Matrix (All 8 Vehicles in 3D) */}
        <div className="fleet-selector-heading">
          <div className="eyebrow pink" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
            SELECT ANY VEHICLE TO INSPECT 3D MODEL &amp; TECHNICAL BLUEPRINT
          </div>
        </div>

        <div className="fleet-matrix-grid">
          {filteredVehicles.map((v) => {
            const isSelected = v.id === activeVehicle.id;
            return (
              <button
                key={v.id}
                type="button"
                className={`fleet-matrix-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedVehicleId(v.id)}
                aria-pressed={isSelected}
              >
                <div className="fleet-matrix-top">
                  <span className="fleet-matrix-chip">{v.chip}</span>
                  <span className="fleet-matrix-cat">{v.categoryLabel}</span>
                </div>

                {/* 3D Vehicle Render Showcase */}
                <div className="fleet-matrix-visual">
                  <div className="fleet-matrix-thumb-stage">
                    <Image
                      src={v.image3d}
                      alt={`${v.name} 3D commercial model`}
                      width={480}
                      height={270}
                      className="fleet-matrix-thumb-img"
                    />
                    <span className="fleet-matrix-3d-pill">✦ 3D</span>
                  </div>
                </div>

                <div className="fleet-matrix-info">
                  <h4 className="fleet-matrix-name">{v.name}</h4>
                  <div className="fleet-matrix-subspecs">
                    <span>{v.payload}</span>
                    <span className="bullet-sep">&bull;</span>
                    <span>{v.deckDimensions}</span>
                  </div>
                </div>

                <div className="fleet-matrix-btn-tag">
                  {isSelected ? 'CURRENTLY INSPECTING' : 'INSPECT 3D MODEL & RATE →'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
