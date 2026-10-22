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

        {/* Filter pills */}
        <div className="routes-filters">
          {([
            { key: 'all' as const, label: 'All', icon: Globe },
            { key: 'tamil-nadu' as const, label: 'Tamil Nadu', icon: MapPin },
            { key: 'pan-india' as const, label: 'Pan India', icon: Truck },
          ]).map((f) => (
            <button
              key={f.key}
              className={`route-filter ${activeTab === f.key ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab(f.key)}
            >
              <f.icon size={14} />
              {f.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
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
