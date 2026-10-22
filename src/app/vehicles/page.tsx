'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { Truck, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const vehicleCategories = [
  {
    title: 'Small Vehicles & Local Express',
    subtitle: 'Ideal for city logistics, intra-city deliveries, and urgent small-batch transport.',
    image: '/small-vehicle-fleet.jpg',
    vehicles: [
      {
        name: 'Tata Ace',
        payload: '750 kg',
        length: '7 ft',
        image: 'https://images.unsplash.com/photo-1586191582056-a6f9595d7f35?auto=format&fit=crop&w=600&q=80',
        desc: 'Compact mini truck for narrow city lanes & quick deliveries.'
      },
      {
        name: 'Pickup Truck',
        payload: '1.2 Ton',
        length: '8 ft',
        image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=600&q=80',
        desc: 'High payload commercial pickup for intra-state cargo.'
      },
      {
        name: 'Ashok Leyland Dost',
        payload: '1.5 Ton',
        length: '8.5 ft',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80',
        desc: 'Heavy-duty mini commercial vehicle with power steering.'
      },
      {
        name: 'Mini Delivery Truck',
        payload: '2 Ton',
        length: '9 ft',
        image: 'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=600&q=80',
        desc: 'Weatherproof closed delivery van for electronics & retail.'
      },
    ],
  },
  {
    title: 'LCV (Light Commercial Vehicles)',
    subtitle: 'Designed for medium payload distribution, regional routes, and commercial supplies.',
    image: '/hero-logistics.jpg',
    vehicles: [
      {
        name: '2 Ton LCV',
        payload: '2,000 kg',
        length: '10 ft',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
        desc: 'Ideal for medium batch distribution & regional parcel dispatch.'
      },
      {
        name: '3 Ton Container',
        payload: '3,000 kg',
        length: '12 ft',
        image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
        desc: 'Full metal body container protecting cargo from weather.'
      },
      {
        name: '4 Ton Open / Closed',
        payload: '4,000 kg',
        length: '14 ft',
        image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80',
        desc: 'Versatile 14ft vehicle for FMCG, agricultural & industrial supplies.'
      },
      {
        name: '6 Ton Fleet Truck',
        payload: '6,000 kg',
        length: '17 ft',
        image: 'https://images.unsplash.com/photo-1506306420419-04144e78f654?auto=format&fit=crop&w=600&q=80',
        desc: 'High cubic capacity LCV for bulk commercial goods.'
      },
    ],
  },
  {
    title: 'Medium & Heavy Commercial Fleet (HCV)',
    subtitle: 'High capacity long-haul freight transport across national industrial corridors.',
    image: '/hcv-truck-fleet.jpg',
    vehicles: [
      {
        name: '7 Ton Container',
        payload: '7,000 kg',
        length: '19 ft',
        image: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=600&q=80',
        desc: 'Long distance 19ft container for high value cargo.'
      },
      {
        name: '9 Ton Multi-Utility',
        payload: '9,000 kg',
        length: '20 ft',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
        desc: 'Multi-axle rigid truck engineered for highway freight.'
      },
      {
        name: '10 Ton Heavy Hauler',
        payload: '10,000 kg',
        length: '22 ft',
        image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80',
        desc: '10-ton capacity for raw materials, machinery & steel.'
      },
      {
        name: '12 Ton Container',
        payload: '12,000 kg',
        length: '24 ft',
        image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80',
        desc: 'Heavy long-haul sealed container truck for pan-India logistics.'
      },
      {
        name: '14 Ton Freighter',
        payload: '14,000 kg',
        length: '28 ft',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
        desc: '28ft high-volume freight carrier for manufacturing hubs.'
      },
      {
        name: '16 Ton Open Body',
        payload: '16,000 kg',
        length: '32 ft',
        image: 'https://images.unsplash.com/photo-1501700493788-df1a4347900d?auto=format&fit=crop&w=600&q=80',
        desc: 'Open body truck for crane loading & oversized materials.'
      },
      {
        name: '18 Ton Multi-Axle',
        payload: '18,000 kg',
        length: '32 ft',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80',
        desc: 'Heavy multi-axle freight carrier with enhanced stability.'
      },
      {
        name: '20 Ton Heavy Duty',
        payload: '20,000 kg',
        length: '32 ft',
        image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80',
        desc: 'Ultra heavy duty commercial hauler for industrial plants.'
      },
    ],
  },
  {
    title: 'Large Vehicles & Special Multi-Axle Trailers',
    subtitle: 'Over-dimensional cargo, heavy industrial machinery, and high-volume container transport.',
    image: '/hero-logistics.jpg',
    vehicles: [
      {
        name: '20 FT High-Cube Container',
        payload: '15 Ton',
        length: '20 ft',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        desc: 'Standard 20ft ISO container trailer for port & industrial goods.'
      },
      {
        name: '22 FT Industrial Container',
        payload: '18 Ton',
        length: '22 ft',
        image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=600&q=80',
        desc: '22ft high capacity container trailer with lock mechanisms.'
      },
      {
        name: '24 FT Multi-Axle Cargo',
        payload: '20 Ton',
        length: '24 ft',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
        desc: '24ft multi-axle heavy cargo trailer for inter-state transport.'
      },
      {
        name: '28 FT Heavy Hauler',
        payload: '22 Ton',
        length: '28 ft',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
        desc: '28ft heavy duty container trailer with air suspension.'
      },
      {
        name: '32 FT MX Trailer',
        payload: '25 Ton',
        length: '32 ft',
        image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80',
        desc: '32ft multi-axle high volume trailer for corporate freight.'
      },
      {
        name: 'Multi-Axle Heavy Express',
        payload: '30 Ton+',
        length: '32-40 ft',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        desc: 'Heavy multi-axle express trailer for heavy machinery.'
      },
      {
        name: 'Low Bed / Flatbed Trailer',
        payload: '40 Ton+',
        length: '40 ft',
        image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80',
        desc: 'Specialized low-bed flatbed trailer for over-dimensional cargo (ODC).'
      },
    ],
  },
];

export default function VehiclesPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-hero">
        <div className="page-hero-glow"></div>
        <span className="section-badge">Verified Fleet & Technical Specifications</span>
        <h1 className="page-hero-title">
          Vehicle <span className="highlight">Fleet Catalog</span>
        </h1>
        <p className="page-hero-subtitle">
          We maintain and dispatch GPS-enabled, fully verified commercial vehicles customized to your exact payload, route, and security specifications across Pan-India routes.
        </p>
      </section>

      <section className="section section-dark">
        <div className="container">
          {vehicleCategories.map((cat, i) => (
            <div key={i} className="animate-fade-up" style={{ marginBottom: '80px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                alignItems: 'center',
                marginBottom: '36px',
                background: '#FFFFFF',
                padding: '28px',
                borderRadius: '20px',
                border: '1px solid rgba(197, 160, 89, 0.2)',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '44px', height: '44px', background: 'rgba(197, 160, 89, 0.15)', borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8C6D23'
                    }}>
                      <Truck size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>{cat.title}</h2>
                      <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>{cat.vehicles.length} Vehicle Models Available</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>{cat.subtitle}</p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#0F1E36', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#C5A059" /> GPS Tracked
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#0F1E36', fontWeight: 600 }}>
                      <ShieldCheck size={16} color="#C5A059" /> Fully Insured
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#0F1E36', fontWeight: 600 }}>
                      <Zap size={16} color="#C5A059" /> On-Demand Dispatch
                    </div>
                  </div>
                </div>

                <div style={{ position: 'relative', height: '220px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15, 30, 54, 0.1) 0%, rgba(15, 30, 54, 0.4) 100%)'
                  }}></div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {cat.vehicles.map((v, j) => (
                  <div key={j} className="card glass-card-premium hover-lift" style={{ padding: 0, overflow: 'hidden', borderRadius: '16px' }}>
                    <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden' }}>
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(15, 30, 54, 0.1) 0%, rgba(15, 30, 54, 0.6) 100%)'
                      }}></div>

                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        background: 'rgba(15, 30, 54, 0.85)',
                        color: '#D4AF37',
                        borderRadius: '20px',
                        border: '1px solid rgba(197, 160, 89, 0.4)',
                        backdropFilter: 'blur(8px)'
                      }}>
                        {v.payload}
                      </span>
                    </div>

                    <div style={{ padding: '20px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                        {v.name}
                      </div>

                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '14px' }}>
                        {v.desc}
                      </p>

                      <div style={{
                        paddingTop: '12px',
                        borderTop: '1px solid rgba(15, 23, 42, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        color: '#0F1E36',
                        fontWeight: 600
                      }}>
                        <span>Length: <strong style={{ color: '#8C6D23' }}>{v.length}</strong></span>
                        <span style={{ color: '#166534', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ● Verified & Ready
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="card glass-card-premium animate-fade-up" style={{ textAlign: 'center', padding: '48px 32px', background: '#FFFFFF', border: '1px solid rgba(197, 160, 89, 0.3)' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
              Need a Custom Vehicle Specification or Special Trailer?
            </h3>
            <p className="card-text" style={{ fontSize: '16px', marginBottom: '28px', maxWidth: '640px', margin: '0 auto 28px' }}>
              Vehicle availability and load matching are configured specifically for your route and freight weight. Reach out to our logistics planners for instant dispatch setup.
            </p>
            <Link href="/quote" className="btn btn-primary btn-lg">
              Book Custom Vehicle Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
