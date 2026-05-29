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
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffd43b" stopOpacity="0.16" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="64" height="64" rx="16" fill="url(#gkGrad)" />
        <path d="M18 25 C18 18, 40 14, 62 25 C60 34, 54 38, 40 38 C26 38, 20 34, 18 25 Z" fill="#fff" opacity="0.95" />
        <path d="M20 25 Q26 18 32 24 Q40 16 48 24 Q54 18 60 25" stroke="#111" strokeWidth="2" fill="none" />
        <circle cx="28" cy="30" r="3" fill="#111" />
        <circle cx="52" cy="30" r="3" fill="#111" />
        <path d="M30 37 Q40 44 50 37" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M18 34 C18 42, 26 52, 40 52 C54 52, 62 42, 62 34" fill="#ffde6e" opacity="0.98" />
        <path d="M24 38 L56 38 L48 58 L32 58 Z" fill="#fff" opacity="0.6" />
        <path d="M25 39 L35 25 L45 39" stroke="#111" strokeWidth="2" fill="none" opacity="0.7" />
        <circle cx="20" cy="56" r="6" fill="#fff" opacity="0.9" />
        <path d="M16 54 L24 58 M24 54 L16 58" stroke="#111" strokeWidth="1.4" />
        <path d="M40 62 C45 58, 55 58, 60 62" stroke="#ffca2c" strokeWidth="3" fill="none" opacity="0.8" />
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
          <linearGradient id="forwardCard" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="64" height="64" rx="16" fill="url(#forwardCard)" />
        <path d="M22 28 C22 18, 58 18, 58 28 C58 38, 22 38, 22 28 Z" fill="#fff" />
        <path d="M24 28 Q28 18 36 24 Q44 18 52 28" stroke="#111" strokeWidth="2" fill="none" />
        <circle cx="30" cy="31" r="2.5" fill="#111" />
        <circle cx="50" cy="31" r="2.5" fill="#111" />
        <path d="M30 36 Q40 44 50 36" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M18 36 C18 46, 62 46, 62 36 C62 52, 18 52, 18 36 Z" fill="#f87171" />
        <path d="M22 38 L58 38 L52 58 L28 58 Z" fill="#fff" opacity="0.78" />
        <path d="M26 40 L38 30 L50 40" stroke="#111" strokeWidth="2" fill="none" opacity="0.8" />
        <circle cx="60" cy="54" r="8" fill="#fff" />
        <path d="M56 52 L61 57 M61 52 L56 57" stroke="#111" strokeWidth="1.4" />
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
          <linearGradient id="wingCard" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="64" height="64" rx="16" fill="url(#wingCard)" />
        <path d="M20 26 C20 18, 60 18, 60 26 C60 34, 20 34, 20 26 Z" fill="#fff" />
        <path d="M22 26 Q28 18 36 24 Q44 18 52 26" stroke="#111" strokeWidth="2" fill="none" />
        <circle cx="28" cy="30" r="2.5" fill="#111" />
        <circle cx="52" cy="30" r="2.5" fill="#111" />
        <path d="M28 36 Q40 44 52 36" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M18 40 C18 50, 62 50, 62 40 C62 54, 18 54, 18 40 Z" fill="#6ee7b7" opacity="0.95" />
        <path d="M24 42 L56 42 L48 60 L32 60 Z" fill="#fff" opacity="0.7" />
        <path d="M26 44 L36 34 L46 44" stroke="#111" strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M12 54 L22 48 L22 58 Z" fill="#34d399" opacity="0.85" />
        <path d="M68 54 L58 48 L58 58 Z" fill="#34d399" opacity="0.85" />
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
          <linearGradient id="centerCard" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="64" height="64" rx="16" fill="url(#centerCard)" />
        <path d="M22 28 C22 20, 58 20, 58 28 C58 36, 22 36, 22 28 Z" fill="#fff" />
        <path d="M24 28 Q30 20 38 26 Q46 20 54 28" stroke="#111" strokeWidth="2" fill="none" />
        <circle cx="30" cy="31" r="2.5" fill="#111" />
        <circle cx="50" cy="31" r="2.5" fill="#111" />
        <path d="M30 36 Q40 43 50 36" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M18 39 C18 46, 62 46, 62 39 C62 53, 18 53, 18 39 Z" fill="#93c5fd" opacity="0.95" />
        <path d="M22 42 L58 42 L52 60 L28 60 Z" fill="#fff" opacity="0.76" />
        <path d="M26 44 L38 34 L50 44" stroke="#111" strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M16 54 L24 48 L24 58 Z" fill="#60a5fa" opacity="0.85" />
        <path d="M64 54 L56 48 L56 58 Z" fill="#60a5fa" opacity="0.85" />
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
