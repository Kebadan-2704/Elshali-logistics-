'use client';

import { useState } from 'react';
import {
  Globe,
  MapPin,
  Truck,
  Anchor,
  Factory,
  Landmark,
  Layers,
  Settings,
  GitBranch,
  Cpu,
  Package,
  Map,
} from 'lucide-react';
import { corridors, tamilNaduHubs } from '@/data/routes';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, React.ElementType> = {
  anchor: Anchor,
  factory: Factory,
  landmark: Landmark,
  layers: Layers,
  settings: Settings,
  'git-branch': GitBranch,
  cpu: Cpu,
  package: Package,
  map: Map,
};

type FilterTab = 'all' | 'tamil-nadu' | 'pan-india';

function CorridorsGrid() {
  return (
    <>
      <h3 className="routes-subheading">Pan-India Interstate Corridors</h3>
      <div className="corridors-grid">
        {corridors.map((c) => (
          <div key={c.id} className="corridor-card">
            <div className="corridor-card-header">
              <span className="corridor-number">{c.id}</span>
              <h4 className="corridor-title">{c.title}</h4>
            </div>
            <p className="corridor-desc">{c.description}</p>
            <div className="corridor-states">
              {c.states.map((s) => (
                <div key={s} className="corridor-state">
                  <MapPin size={14} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function HubsGrid() {
  return (
    <>
      <h3 className="routes-subheading">Tamil Nadu Regional Hubs</h3>
      <div className="hubs-grid">
        {tamilNaduHubs.map((h) => {
          const Icon = iconMap[h.icon] || MapPin;
          return (
            <div key={h.name} className="hub-card">
              <div className="hub-icon-tile">
                <Icon size={18} />
              </div>
              <div>
                <div className="hub-name">{h.name}</div>
                <div className="hub-desc">{h.descriptor}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function Routes() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filterTabs = [
    { key: 'all' as const, label: 'All Corridors & Hubs', icon: Globe },
    { key: 'tamil-nadu' as const, label: 'Tamil Nadu Hubs', icon: MapPin },
    { key: 'pan-india' as const, label: 'Pan-India Corridors', icon: Truck },
  ];

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % filterTabs.length;
      setActiveTab(filterTabs[nextIndex].key);
      const nextEl = document.getElementById(`tab-${filterTabs[nextIndex].key}`);
      nextEl?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + filterTabs.length) % filterTabs.length;
      setActiveTab(filterTabs[prevIndex].key);
      const prevEl = document.getElementById(`tab-${filterTabs[prevIndex].key}`);
      prevEl?.focus();
    }
  };

  return (
    <section id="routes" className="routes-section" aria-labelledby="routes-heading">
      <div className="container">
        {/* Header */}
        <div className="routes-header">
          <div className="eyebrow pink" style={{ justifyContent: 'center' }}>
            OUR REACH &amp; NETWORK
          </div>
          <h2 id="routes-heading" className="section-heading" style={{ fontSize: '40px' }}>
            Pan-India Transit Corridors &amp;<br />
            <span className="pink">Regional Hubs</span>
          </h2>
          <p>
            Seamless connectivity across Tamil Nadu and major interstate trade corridors nationwide.
          </p>
        </div>

        {/* Filter pills with ARIA Tablist */}
        <div className="routes-filters" role="tablist" aria-label="Route category filters">
          {filterTabs.map((f, i) => (
            <button
              key={f.key}
              id={`tab-${f.key}`}
              role="tab"
              aria-selected={activeTab === f.key}
              aria-controls={`tabpanel-${f.key}`}
              tabIndex={activeTab === f.key ? 0 : -1}
              className={`route-filter ${activeTab === f.key ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab(f.key)}
              onKeyDown={(e) => handleTabKeyDown(e, i)}
              type="button"
            >
              <f.icon size={14} />
              {f.label}
            </button>
          ))}
        </div>

        {/* Content with ARIA Tabpanel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'all' && (
              <>
                <CorridorsGrid />
                <div style={{ marginTop: 48 }}>
                  <HubsGrid />
                </div>
              </>
            )}
            {activeTab === 'pan-india' && <CorridorsGrid />}
            {activeTab === 'tamil-nadu' && <HubsGrid />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
