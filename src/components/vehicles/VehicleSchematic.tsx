'use client';

interface VehicleSchematicProps {
  type: 'mini' | 'pickup' | '14ft' | '17ft' | '20ft' | '24ft' | '26ft' | '32ft';
  className?: string;
}

// Module-level wheel component to avoid re-creation on render
function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className="schematic-wheel">
      <circle cx={cx} cy={cy} r={13} fill="#060B16" stroke="currentColor" strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={8} fill="rgba(184, 0, 109, 0.25)" stroke="#EC4899" strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={3} fill="#FFFFFF" />
      {/* Lug nuts / spokes */}
      <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke="#EC4899" strokeWidth={1} strokeOpacity={0.8} />
      <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="#EC4899" strokeWidth={1} strokeOpacity={0.8} />
    </g>
  );
}

export default function VehicleSchematic({ type, className = '' }: VehicleSchematicProps) {
  return (
    <div className={`vehicle-schematic-wrap ${className}`}>
      <svg
        viewBox="0 0 320 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="vehicle-schematic-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bodyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#B8006D" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="cabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0B132B" stopOpacity="0.8" />
          </linearGradient>
          <pattern id="gridPattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(236, 72, 153, 0.08)" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Blueprint background grid */}
        <rect x="8" y="8" width="304" height="114" rx="10" fill="url(#gridPattern)" />

        {/* Ground baseline */}
        <line x1="16" y1="108" x2="304" y2="108" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* 1. MINI / DOST */}
        {type === 'mini' && (
          <g>
            {/* Cargo Bay */}
            <rect x="105" y="42" width="145" height="52" rx="4" fill="url(#bodyGlow)" stroke="#EC4899" strokeWidth="2" />
            <line x1="105" y1="68" x2="250" y2="68" stroke="rgba(236, 72, 153, 0.35)" strokeWidth="1" strokeDasharray="4 2" />
            <line x1="155" y1="42" x2="155" y2="94" stroke="rgba(236, 72, 153, 0.35)" strokeWidth="1" />
            <line x1="205" y1="42" x2="205" y2="94" stroke="rgba(236, 72, 153, 0.35)" strokeWidth="1" />

            {/* Cab */}
            <path
              d="M 55 94 L 55 58 Q 55 46 68 46 L 98 46 Q 104 46 104 54 L 104 94 Z"
              fill="url(#cabGrad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Windshield */}
            <path d="M 62 52 L 85 52 L 85 68 L 62 68 Z" fill="rgba(255, 255, 255, 0.15)" stroke="#EC4899" strokeWidth="1.2" />
            {/* Headlight */}
            <rect x="52" y="74" width="4" height="8" rx="2" fill="#FFD700" />
            {/* Front Bumper */}
            <rect x="48" y="88" width="12" height="6" rx="2" fill="#FFFFFF" opacity="0.6" />

            {/* Chassis Underbody */}
            <rect x="55" y="94" width="195" height="4" fill="#FFFFFF" opacity="0.4" />

            {/* Dimension guide */}
            <text x="177" y="27" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">7.5 FT DECK</text>

            {/* Wheels */}
            <Wheel cx={78} cy={102} />
            <Wheel cx={210} cy={102} />
          </g>
        )}

        {/* 2. TATA PICKUP / 407 */}
        {type === 'pickup' && (
          <g>
            {/* Cargo Deck / Drop Gate */}
            <rect x="110" y="46" width="155" height="48" rx="4" fill="url(#bodyGlow)" stroke="#EC4899" strokeWidth="2" />
            {/* Stanchions */}
            <line x1="110" y1="46" x2="110" y2="34" stroke="#EC4899" strokeWidth="2" />
            <line x1="160" y1="46" x2="160" y2="34" stroke="#EC4899" strokeWidth="2" />
            <line x1="210" y1="46" x2="210" y2="34" stroke="#EC4899" strokeWidth="2" />
            <line x1="265" y1="46" x2="265" y2="34" stroke="#EC4899" strokeWidth="2" />
            <line x1="110" y1="34" x2="265" y2="34" stroke="#EC4899" strokeWidth="2" strokeDasharray="6 3" />

            {/* Commercial Cab */}
            <path
              d="M 50 94 L 50 64 L 68 44 L 102 44 Q 108 44 108 52 L 108 94 Z"
              fill="url(#cabGrad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Windshield */}
            <path d="M 68 48 L 96 48 L 96 66 L 62 66 Z" fill="rgba(255, 255, 255, 0.18)" stroke="#EC4899" strokeWidth="1.2" />
            {/* Headlight */}
            <rect x="47" y="72" width="4" height="10" rx="2" fill="#FFD700" />
            {/* Grille */}
            <line x1="50" y1="78" x2="58" y2="78" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="50" y1="82" x2="58" y2="82" stroke="#EC4899" strokeWidth="1.5" />

            {/* Chassis Underbody */}
            <rect x="50" y="94" width="215" height="5" fill="#FFFFFF" opacity="0.4" />

            {/* Dimension guide */}
            <text x="187" y="25" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">9.5 FT HEAVY DECK</text>

            {/* Wheels */}
            <Wheel cx={76} cy={102} />
            <Wheel cx={222} cy={102} />
          </g>
        )}

        {/* 3. 14 FT CONTAINER */}
        {type === '14ft' && (
          <g>
            {/* 14 Ft Container Box */}
            <rect x="100" y="28" width="168" height="66" rx="4" fill="url(#bodyGlow)" stroke="#EC4899" strokeWidth="2" />
            {/* Vertical Corrugations */}
            <line x1="130" y1="28" x2="130" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="160" y1="28" x2="160" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="190" y1="28" x2="190" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="220" y1="28" x2="220" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="250" y1="28" x2="250" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />

            {/* Modern Aerodynamic Cab */}
            <path
              d="M 46 94 L 46 56 Q 46 44 58 38 L 78 30 L 98 28 L 98 94 Z"
              fill="url(#cabGrad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Roof Deflector */}
            <path d="M 68 34 L 98 28" stroke="#EC4899" strokeWidth="2" />
            {/* Windshield */}
            <path d="M 58 46 L 88 40 L 88 64 L 54 64 Z" fill="rgba(255, 255, 255, 0.18)" stroke="#EC4899" strokeWidth="1.2" />
            {/* Dual Headlights */}
            <rect x="43" y="68" width="4" height="6" rx="1" fill="#FFD700" />
            <rect x="43" y="78" width="4" height="6" rx="1" fill="#FFD700" />

            {/* Chassis Underbody */}
            <rect x="46" y="94" width="222" height="5" fill="#FFFFFF" opacity="0.4" />

            {/* Dimension guide */}
            <text x="184" y="20" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">14 FT ALL-WEATHER CONTAINER</text>

            {/* Wheels */}
            <Wheel cx={72} cy={102} />
            <Wheel cx={230} cy={102} />
          </g>
        )}

        {/* 4. 17 FT FREIGHTLINER */}
        {type === '17ft' && (
          <g>
            {/* 17 Ft High Container Box */}
            <rect x="96" y="24" width="182" height="70" rx="4" fill="url(#bodyGlow)" stroke="#EC4899" strokeWidth="2" />
            {/* Ribs */}
            <line x1="125" y1="24" x2="125" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="155" y1="24" x2="155" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="185" y1="24" x2="185" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="215" y1="24" x2="215" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="245" y1="24" x2="245" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />

            {/* Cab */}
            <path
              d="M 42 94 L 42 52 Q 42 38 56 32 L 80 24 L 94 24 L 94 94 Z"
              fill="url(#cabGrad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Windshield */}
            <path d="M 54 42 L 84 36 L 84 62 L 50 62 Z" fill="rgba(255, 255, 255, 0.18)" stroke="#EC4899" strokeWidth="1.2" />
            <rect x="39" y="66" width="4" height="14" rx="2" fill="#FFD700" />

            {/* Chassis Underbody */}
            <rect x="42" y="94" width="236" height="5" fill="#FFFFFF" opacity="0.4" />

            <text x="187" y="17" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">17 FT HIGH-CUBE FREIGHTLINER</text>

            <Wheel cx={68} cy={102} />
            <Wheel cx={242} cy={102} />
          </g>
        )}

        {/* 5. 20 FT MULTI-AXLE */}
        {type === '20ft' && (
          <g>
            {/* 20 Ft Container */}
            <rect x="92" y="22" width="190" height="72" rx="4" fill="url(#bodyGlow)" stroke="#EC4899" strokeWidth="2" />
            {/* Container Doors and Locks */}
            <line x1="125" y1="22" x2="125" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="160" y1="22" x2="160" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="195" y1="22" x2="195" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="230" y1="22" x2="230" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="265" y1="22" x2="265" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />

            {/* Heavy Cab */}
            <path
              d="M 38 94 L 38 48 Q 38 34 52 28 L 76 22 L 90 22 L 90 94 Z"
              fill="url(#cabGrad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <path d="M 50 38 L 80 32 L 80 58 L 46 58 Z" fill="rgba(255, 255, 255, 0.18)" stroke="#EC4899" strokeWidth="1.2" />
            <rect x="35" y="64" width="4" height="16" rx="2" fill="#FFD700" />

            {/* Chassis Underbody */}
            <rect x="38" y="94" width="244" height="5" fill="#FFFFFF" opacity="0.4" />

            <text x="187" y="15" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">20 FT HEAVY MULTI-AXLE (8-10 TON)</text>

            {/* 6-Wheeler Axle Setup */}
            <Wheel cx={64} cy={102} />
            <Wheel cx={228} cy={102} />
            <Wheel cx={256} cy={102} />
          </g>
        )}

        {/* 6. 24 FT HIGH-CUBE */}
        {type === '24ft' && (
          <g>
            {/* 24 Ft Box Container */}
            <rect x="88" y="18" width="202" height="76" rx="4" fill="url(#bodyGlow)" stroke="#EC4899" strokeWidth="2" />
            <line x1="120" y1="18" x2="120" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="155" y1="18" x2="155" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="190" y1="18" x2="190" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="225" y1="18" x2="225" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="260" y1="18" x2="260" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />

            {/* Heavy Interstate Cab */}
            <path
              d="M 34 94 L 34 46 Q 34 30 48 24 L 72 18 L 86 18 L 86 94 Z"
              fill="url(#cabGrad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <path d="M 46 34 L 76 28 L 76 56 L 42 56 Z" fill="rgba(255, 255, 255, 0.18)" stroke="#EC4899" strokeWidth="1.2" />
            <rect x="31" y="62" width="4" height="18" rx="2" fill="#FFD700" />

            {/* Chassis Underbody */}
            <rect x="34" y="94" width="256" height="5" fill="#FFFFFF" opacity="0.4" />

            <text x="189" y="12" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">24 FT HIGH-CUBE MULTI-AXLE (10-12 TON)</text>

            <Wheel cx={60} cy={102} />
            <Wheel cx={236} cy={102} />
            <Wheel cx={264} cy={102} />
          </g>
        )}

        {/* 7. 26 FT FREIGHTLINER */}
        {type === '26ft' && (
          <g>
            {/* 26 Ft Heavy Container */}
            <rect x="84" y="16" width="210" height="78" rx="4" fill="url(#bodyGlow)" stroke="#EC4899" strokeWidth="2" />
            <line x1="115" y1="16" x2="115" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="148" y1="16" x2="148" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="180" y1="16" x2="180" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="212" y1="16" x2="212" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="244" y1="16" x2="244" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />
            <line x1="274" y1="16" x2="274" y2="94" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" />

            {/* Heavy Cab */}
            <path
              d="M 30 94 L 30 42 Q 30 26 46 20 L 70 16 L 82 16 L 82 94 Z"
              fill="url(#cabGrad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <path d="M 42 30 L 72 26 L 72 54 L 38 54 Z" fill="rgba(255, 255, 255, 0.18)" stroke="#EC4899" strokeWidth="1.2" />
            <rect x="27" y="60" width="4" height="20" rx="2" fill="#FFD700" />

            {/* Chassis Underbody */}
            <rect x="30" y="94" width="264" height="5" fill="#FFFFFF" opacity="0.4" />

            <text x="189" y="10" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">26 FT HEAVY HAULAGE FREIGHTLINER</text>

            <Wheel cx={56} cy={102} />
            <Wheel cx={220} cy={102} />
            <Wheel cx={246} cy={102} />
            <Wheel cx={272} cy={102} />
          </g>
        )}

        {/* 8. 32 FT SXL / MXL MULTI-AXLE TRAILER */}
        {type === '32ft' && (
          <g>
            {/* Massive 32 Ft Semi-Trailer */}
            <rect x="94" y="12" width="206" height="82" rx="4" fill="url(#bodyGlow)" stroke="#EC4899" strokeWidth="2.2" />
            <line x1="125" y1="12" x2="125" y2="94" stroke="rgba(236, 72, 153, 0.45)" strokeWidth="1.5" />
            <line x1="158" y1="12" x2="158" y2="94" stroke="rgba(236, 72, 153, 0.45)" strokeWidth="1.5" />
            <line x1="190" y1="12" x2="190" y2="94" stroke="rgba(236, 72, 153, 0.45)" strokeWidth="1.5" />
            <line x1="222" y1="12" x2="222" y2="94" stroke="rgba(236, 72, 153, 0.45)" strokeWidth="1.5" />
            <line x1="254" y1="12" x2="254" y2="94" stroke="rgba(236, 72, 153, 0.45)" strokeWidth="1.5" />
            <line x1="282" y1="12" x2="282" y2="94" stroke="rgba(236, 72, 153, 0.45)" strokeWidth="1.5" />

            {/* Articulation Hitch & Kingpin */}
            <rect x="80" y="74" width="16" height="8" rx="2" fill="#EC4899" />

            {/* Prime Mover Tractor Unit */}
            <path
              d="M 22 94 L 22 46 Q 22 28 38 22 L 66 18 L 82 18 L 82 82 L 72 82 L 72 94 Z"
              fill="url(#cabGrad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <path d="M 34 32 L 64 28 L 64 54 L 30 54 Z" fill="rgba(255, 255, 255, 0.2)" stroke="#EC4899" strokeWidth="1.2" />
            {/* Exhaust Stack */}
            <line x1="78" y1="18" x2="78" y2="10" stroke="#EC4899" strokeWidth="2" />
            <rect x="19" y="62" width="4" height="20" rx="2" fill="#FFD700" />

            {/* Trailer Underbody */}
            <rect x="94" y="94" width="206" height="5" fill="#FFFFFF" opacity="0.4" />

            <text x="197" y="8" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">32 FT SXL / MXL MULTI-AXLE PRIME MOVER (15-25+ TON)</text>

            {/* Tractor Wheels */}
            <Wheel cx={44} cy={102} />
            <Wheel cx={72} cy={102} />

            {/* Trailer Tridem / Tandem Wheels */}
            <Wheel cx={222} cy={102} />
            <Wheel cx={248} cy={102} />
            <Wheel cx={274} cy={102} />
          </g>
        )}
      </svg>
    </div>
  );
}
