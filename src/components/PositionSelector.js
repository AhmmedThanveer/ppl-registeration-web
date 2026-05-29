import React, { useState } from 'react';

const positions = [
  {
    id: 'GK',
    name: 'Goalkeeper',
    color: '#FFD700',
    desc: 'The last line of defense',
    icon: (
      <svg viewBox="0 0 80 80" width="60" height="60">
        {/* Keeper gloves */}
        <rect x="10" y="25" width="25" height="35" rx="8" fill="currentColor" opacity="0.9"/>
        <rect x="45" y="25" width="25" height="35" rx="8" fill="currentColor" opacity="0.9"/>
        <circle cx="40" cy="20" r="12" fill="currentColor" opacity="0.7"/>
        {/* Goal net lines */}
        <line x1="5" y1="5" x2="5" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
        <line x1="75" y1="5" x2="75" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
        <line x1="5" y1="5" x2="75" y2="5" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
        {[15,25,35,45,55,65].map(x => (
          <line key={x} x1={x} y1="5" x2={x} y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        ))}
        {[15,25,35,45,55].map(y => (
          <line key={y} x1="5" y1={y} x2="75" y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        ))}
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
        {/* Boot + ball */}
        <ellipse cx="40" cy="50" rx="20" ry="8" fill="currentColor" opacity="0.3"/>
        <circle cx="55" cy="45" r="14" fill="currentColor" opacity="0.85"/>
        <path d="M55 31 L60 42 L55 45 L50 42 Z" fill="rgba(0,0,0,0.3)"/>
        <path d="M41 43 L50 42 L55 45 L47 52 Z" fill="rgba(0,0,0,0.3)"/>
        {/* Shoe */}
        <path d="M15 55 Q20 45 30 48 L35 60 Q25 65 15 60 Z" fill="currentColor" opacity="0.9"/>
        <rect x="28" y="43" width="8" height="18" rx="3" fill="currentColor" opacity="0.9"/>
        {/* Speed lines */}
        <line x1="5" y1="35" x2="22" y2="38" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        <line x1="5" y1="42" x2="20" y2="44" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        <line x1="5" y1="48" x2="18" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
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
        {/* Arrow showing movement */}
        <path d="M10 40 Q20 15 50 20" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.5" strokeDasharray="4,3"/>
        <path d="M50 20 L42 28 M50 20 L58 28" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.5"/>
        {/* Player body */}
        <circle cx="62" cy="32" r="10" fill="currentColor" opacity="0.85"/>
        <path d="M52 42 Q62 50 72 42 L72 62 L52 62 Z" fill="currentColor" opacity="0.7"/>
        {/* Ball */}
        <circle cx="20" cy="58" r="10" fill="currentColor" opacity="0.6"/>
        <path d="M20 48 L24 56 L20 58 L16 56 Z" fill="rgba(0,0,0,0.25)"/>
        {/* Pitch line */}
        <line x1="5" y1="72" x2="75" y2="72" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
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
        {/* Shield */}
        <path d="M40 10 L65 22 L65 45 Q65 62 40 70 Q15 62 15 45 L15 22 Z"
          fill="currentColor" opacity="0.85"/>
        <path d="M40 20 L56 28 L56 44 Q56 56 40 62 Q24 56 24 44 L24 28 Z"
          fill="rgba(0,0,0,0.2)"/>
        {/* Tick / checkmark */}
        <path d="M30 40 L37 48 L52 32" stroke="white" strokeWidth="4" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
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
