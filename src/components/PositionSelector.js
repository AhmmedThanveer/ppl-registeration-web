import React, { useState } from 'react';

const positions = [
  {
    id: 'GK',
    name: 'Goalkeeper',
    color: '#FFD700',
    desc: 'The last line of defense',
    icon: (
      <svg viewBox="0 0 80 80" width="60" height="60">
        <defs>
          <radialGradient id="gkGrad" cx="40" cy="40" r="35">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="34" fill="url(#gkGrad)" />
        <circle cx="40" cy="30" r="12" fill="#fff" />
        <path d="M26 32 C26 20, 54 20, 54 32 C54 44, 26 44, 26 32 Z" fill="currentColor" opacity="0.88" />
        <circle cx="32" cy="29" r="2" fill="#111" />
        <circle cx="48" cy="29" r="2" fill="#111" />
        <path d="M32 36 Q40 42 48 36" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M24 42 Q40 24 56 42" stroke="#fff" strokeWidth="3" fill="none" opacity="0.85" />
        <rect x="22" y="48" width="36" height="14" rx="7" fill="currentColor" opacity="0.18" />
        <path d="M28 50 L36 46 L44 50 L52 46" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: 'Forward',
    name: 'Forward',
    color: '#E53E3E',
    desc: 'Striker at the front line',
    icon: (
      <svg viewBox="0 0 80 80" width="60" height="60">
        <defs>
          <radialGradient id="forwardGrad" cx="40" cy="40" r="35">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="34" fill="url(#forwardGrad)" />
        <path d="M24 35 C24 20, 56 20, 56 35 C56 50, 24 50, 24 35 Z" fill="currentColor" opacity="0.9" />
        <circle cx="40" cy="30" r="12" fill="#fff" />
        <path d="M29 29 Q40 20 51 29" stroke="#111" strokeWidth="3" fill="none" />
        <circle cx="34" cy="30" r="2" fill="#111" />
        <circle cx="46" cy="30" r="2" fill="#111" />
        <path d="M34 36 Q40 42 46 36" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M23 45 Q40 32 57 45" stroke="#fff" strokeWidth="3" fill="none" opacity="0.8" />
        <circle cx="58" cy="52" r="10" fill="#fff" opacity="0.95" />
        <path d="M55 50 L58 54 L62 49" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="58" cy="52" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'Wing Back',
    name: 'Wing Back',
    color: '#48BB78',
    desc: 'Dynamic wide player',
    icon: (
      <svg viewBox="0 0 80 80" width="60" height="60">
        <defs>
          <radialGradient id="wingGrad" cx="40" cy="40" r="35">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="34" fill="url(#wingGrad)" />
        <path d="M25 35 C25 20, 55 20, 55 35 C55 50, 25 50, 25 35 Z" fill="currentColor" opacity="0.85" />
        <circle cx="40" cy="30" r="12" fill="#fff" />
        <path d="M28 30 Q40 18 52 30" stroke="#111" strokeWidth="3" fill="none" />
        <circle cx="34" cy="30" r="2" fill="#111" />
        <circle cx="46" cy="30" r="2" fill="#111" />
        <path d="M34 36 Q40 42 46 36" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M20 52 Q40 35 60 52" stroke="#fff" strokeWidth="3" fill="none" opacity="0.8" />
        <path d="M14 45 L24 40 L24 50 Z" fill="currentColor" opacity="0.9" />
        <path d="M60 45 L70 40 L70 50 Z" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: 'Center Back',
    name: 'Center Back',
    color: '#4299E1',
    desc: 'Rock-solid defender',
    icon: (
      <svg viewBox="0 0 80 80" width="60" height="60">
        <defs>
          <radialGradient id="centerGrad" cx="40" cy="40" r="35">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="34" fill="url(#centerGrad)" />
        <path d="M30 30 C28 25, 52 25, 50 30 C48 35, 32 35, 30 30 Z" fill="currentColor" opacity="0.9" />
        <circle cx="40" cy="30" r="12" fill="#fff" />
        <path d="M32 30 Q40 22 48 30" stroke="#111" strokeWidth="3" fill="none" />
        <circle cx="34" cy="31" r="2" fill="#111" />
        <circle cx="46" cy="31" r="2" fill="#111" />
        <path d="M34 37 Q40 43 46 37" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M22 38 L30 28 L38 38 L46 28 L54 38" stroke="#fff" strokeWidth="3" fill="none" opacity="0.9" />
        <path d="M15 48 Q40 15 65 48 Q40 60 15 48 Z" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
];

const PositionSelector = ({ value, onChange, lang }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16, marginTop: 8,
      }}>
        {positions.map((pos) => {
          const isSelected = value === pos.id;
          const isHovered = hovered === pos.id;
          return (
            <div
              key={pos.id}
              onClick={() => onChange(pos.id)}
              onMouseEnter={() => setHovered(pos.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                background: isSelected
                  ? `linear-gradient(135deg, ${pos.color}22, ${pos.color}11)`
                  : isHovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                border: `2px solid ${isSelected ? pos.color : isHovered ? pos.color + '66' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 12,
                padding: '20px 12px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isSelected ? 'scale(1.04) translateY(-4px)' : isHovered ? 'scale(1.02) translateY(-2px)' : 'scale(1)',
                boxShadow: isSelected ? `0 8px 32px ${pos.color}33` : 'none',
              }}
            >
              {/* 3D icon container */}
              <div style={{
                color: pos.color,
                display: 'flex', justifyContent: 'center',
                marginBottom: 12,
                filter: isSelected ? `drop-shadow(0 0 12px ${pos.color}88)` : 'none',
                transform: isSelected ? 'scale(1.15) rotateY(15deg)' : isHovered ? 'scale(1.08) rotateY(8deg)' : 'scale(1)',
                transition: 'all 0.4s ease',
                transformStyle: 'preserve-3d',
              }}>
                {pos.icon}
              </div>

              <div style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: '1.1rem',
                letterSpacing: '2px',
                color: isSelected ? pos.color : '#fff',
              }}>
                {lang === 'ml' ? pos.mlName : pos.name}
              </div>
              <div style={{
                fontFamily: lang === 'ml' ? 'Noto Sans Malayalam' : 'Rajdhani',
                fontSize: '0.7rem',
                color: '#888',
                marginTop: 4,
              }}>
                {lang === 'ml' ? pos.mlDesc : pos.desc}
              </div>

              {/* Selected checkmark */}
              {isSelected && (
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  width: 20, height: 20, borderRadius: '50%',
                  background: pos.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', color: '#000', fontWeight: 900,
                }}>✓</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PositionSelector;
