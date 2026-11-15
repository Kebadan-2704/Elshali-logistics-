'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { verifiedClients } from '@/data/clients';
import { ShieldCheck, Award, Building2, ExternalLink, X, LayoutGrid, PlayCircle } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Automotive & Heavy',
  'Industrial Engineering',
  'Infrastructure & Steel',
  'Electronics & Power',
  'FMCG & Consumer',
] as const;

export default function ClientMarquee() {
  const [boardOpen, setBoardOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  // Focus restoration & Escape key handler for modal
  useEffect(() => {
    if (!boardOpen) return;

    // Focus close button on open
    setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBoardOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [boardOpen]);

  const closeBoard = () => {
    setBoardOpen(false);
    triggerRef.current?.focus();
  };

  // Infinite ticker streams
  const half = Math.ceil(verifiedClients.length / 2);
  const row1 = verifiedClients.slice(0, half);
  const row2 = verifiedClients.slice(half);

  const row1Loop = [...row1, ...row1];
  const row2Loop = [...row2, ...row2];

  // Filtered clients for grid view
  const filteredClients = useMemo(() => {
    if (activeCategory === 'All') return verifiedClients;
    return verifiedClients.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  if (verifiedClients.length === 0) {
    const sectors = [
      { name: 'Automotive & Heavy Engineering', count: '15+ OEM Corridors', desc: 'Plant-to-plant component movement, chassis transfer & casting transport.' },
      { name: 'Industrial Machinery & Pumps', count: 'Daily Coimbatore Hubs', desc: 'Precision CNC tooling, textile machinery, electric motors & submersible pump haulage.' },
      { name: 'Infrastructure, Metals & Steel', count: 'Heavy Cargo Solutions', desc: 'TMT bars, structural steel, coiled sheets, cement & industrial fabrication loads.' },
      { name: 'Electrical & Power Systems', count: 'Containerized Movement', desc: 'Switchgear, solar transformers, panels, and heavy electrical assemblies.' },
      { name: 'FMCG & Consumer Goods', count: 'Dedicated PTL / FTL', desc: 'Primary factory dispatch and regional DC distribution with verified delivery receipts.' },
    ];

    return (
      <section id="clients" className="clients-section" aria-label="Commercial Transport Sectors Served">
        <div className="clients-ambient-glow" />
        <div className="clients-container">
          <div className="clients-header">
            <div className="section-tag">
              <Building2 size={13} className="text-magenta-400" />
              <span>COMMERCIAL SECTORS SERVED</span>
            </div>
            <h2 className="clients-title">
              Specialized Freight Transport For <span className="text-gradient">Core Industries</span>
            </h2>
            <p className="clients-subtitle">
              ELSHALI LOGISTICS operates dedicated commercial road freight corridors connecting Coimbatore manufacturing clusters with major industrial hubs across Tamil Nadu and Pan-India.
            </p>
            <div className="clients-metrics">
              <div className="client-metric-pill">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>GST Compliant Carriage (Act 2007)</span>
              </div>
              <div className="client-metric-pill">
                <Award size={14} className="text-pink-400" />
                <span>Pan-India Route Coverage</span>
              </div>
            </div>
          </div>
          <div className="client-directory-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', padding: '0 24px' }}>
            {sectors.map((s, i) => (
              <div key={i} className="client-grid-card" style={{ padding: '24px 20px', flexDirection: 'column', alignItems: 'flex-start', minHeight: 'auto' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#EC4899', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.count}</span>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', marginTop: '6px', marginBottom: '8px' }}>{s.name}</h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="clients-footer-note" style={{ marginTop: '36px' }}>
            <span>Transporter partner portfolio updated periodically under verified consignor billing and dispatch manifests.</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="clients" className="clients-section" aria-label="Our Corporate Clients and Partners">
      {/* Ambient background glow */}
      <div className="clients-ambient-glow" />

      {/* Accessible screen-reader list of clients */}
      <ul className="sr-only" aria-label="Official Corporate Client Brands">
        {verifiedClients.map((client) => (
          <li key={`sr-${client.id}`}>
            {client.name} — {client.category}
          </li>
        ))}
      </ul>

      <div className="clients-container">
        {/* Section Header */}
        <div className="clients-header">
          <div className="section-tag">
            <Building2 size={13} className="text-magenta-400" />
            <span>VERIFIED CORPORATE PARTNERS</span>
          </div>

          <h2 className="clients-title">
            Trusted by India&apos;s Leading <span className="text-gradient">Industrial &amp; Global Brands</span>
          </h2>

          <p className="clients-subtitle">
            Enterprise manufacturing giants, automotive OEMs, and infrastructure conglomerates rely on
            ELSHALI LOGISTICS for daily plant placement, factory-to-hub distribution, and Pan-India freight dispatch.
          </p>

          {/* Quick trust metrics */}
          <div className="clients-metrics">
            <div className="client-metric-pill">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>100% Verified Transporter Records</span>
            </div>
            <div className="client-metric-pill">
              <Award size={14} className="text-pink-400" />
              <span>{verifiedClients.length} Enterprise Conglomerates</span>
            </div>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setBoardOpen(true)}
              className="client-board-trigger"
              aria-label="View Official Board - Verified corporate partnership board"
            >
              <span>View Official Board</span>
              <ExternalLink size={12} />
            </button>
          </div>

          {/* Layout View Switcher */}
          <div className="client-layout-toggle" role="tablist" aria-label="Client layout view">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'marquee'}
              onClick={() => setViewMode('marquee')}
              className={`client-toggle-btn ${viewMode === 'marquee' ? 'active' : ''}`}
            >
              <PlayCircle size={14} />
              <span>Running Stream</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              className={`client-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              <LayoutGrid size={14} />
              <span>Directory Grid ({verifiedClients.length})</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: RUNNING SHOW / INFINITE MARQUEE */}
        {viewMode === 'marquee' ? (
          <div className="marquee-wrapper">
            {/* Row 1 - Leftward scroll */}
            <div className="marquee-track-container" aria-hidden="true">
              <div className="marquee-track marquee-left">
                {row1Loop.map((client, idx) => (
                  <div key={`r1-${client.id}-${idx}`} className="client-logo-card" title={client.name}>
                    <div className="client-logo-inner">
                      <Image
                        src={client.image}
                        alt={client.name}
                        width={180}
                        height={60}
                        sizes="(max-width: 640px) 160px, 200px"
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: 'auto',
                          height: 'auto',
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                    <span className="client-card-caption">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Rightward scroll */}
            <div className="marquee-track-container mt-4" aria-hidden="true">
              <div className="marquee-track marquee-right">
                {row2Loop.map((client, idx) => (
                  <div key={`r2-${client.id}-${idx}`} className="client-logo-card" title={client.name}>
                    <div className="client-logo-inner">
                      <Image
                        src={client.image}
                        alt={client.name}
                        width={180}
                        height={60}
                        sizes="(max-width: 640px) 160px, 200px"
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: 'auto',
                          height: 'auto',
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                    <span className="client-card-caption">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: CATEGORY DIRECTORY GRID */
          <div className="client-directory-container">
            {/* Category Filter Pills */}
            <div className="client-category-filters" role="tablist" aria-label="Filter clients by industry">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`client-cat-pill ${activeCategory === cat ? 'active' : ''}`}
                >
                  <span>{cat}</span>
                  <span className="cat-count">
                    {cat === 'All' ? verifiedClients.length : verifiedClients.filter((c) => c.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Clean Structured Grid */}
            <div className="client-directory-grid">
              {filteredClients.map((client) => (
                <div key={`grid-${client.id}`} className="client-grid-card" title={client.name}>
                  <div className="client-logo-inner">
                    <Image
                      src={client.image}
                      alt={client.name}
                      width={180}
                      height={60}
                      sizes="(max-width: 640px) 140px, 180px"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div className="client-grid-meta">
                    <span className="client-grid-name">{client.name}</span>
                    <span className="client-grid-cat">{client.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verification Subtext */}
        <div className="clients-footer-note">
          <span>Official transport partner portfolio verified via GST registration &amp; corporate plant logistics records.</span>
        </div>
      </div>

      {/* Full Partnership Board Lightbox Modal */}
      {boardOpen && (
        <div
          className="client-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Official Corporate Client Partnership Board"
          onClick={closeBoard}
        >
          <div className="client-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="client-modal-header">
              <div>
                <h3 className="client-modal-title">Official Corporate Client Partnership Board</h3>
                <p className="client-modal-desc">
                  ELSHALI LOGISTICS AND TRANSPORT &bull; Building Stronger Partnerships for a Growing India
                </p>
              </div>
              <button
                ref={modalCloseBtnRef}
                type="button"
                className="client-modal-close"
                onClick={closeBoard}
                aria-label="Close board modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="client-modal-body">
              <Image
                src="/images/clients-board.webp"
                alt="Official 50 Enterprise Client Partnership Board of ELSHALI LOGISTICS"
                width={1024}
                height={583}
                sizes="(max-width: 1024px) 100vw, 1024px"
                style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
