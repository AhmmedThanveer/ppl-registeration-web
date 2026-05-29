import React, { useState, useEffect } from 'react';

const IntroScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('logo'); // logo -> text -> exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 1800);
    const t2 = setTimeout(() => setPhase('exit'), 3800);
    const t3 = setTimeout(() => onComplete(), 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'radial-gradient(ellipse at center, #1a1200 0%, #0A0A0A 70%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.6s ease',
      opacity: phase === 'exit' ? 0 : 1,
    }}>
      {/* Particle stars */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.random() * 3 + 1 + 'px',
          height: Math.random() * 3 + 1 + 'px',
          borderRadius: '50%',
          background: '#F5A623',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animation: `sparkle ${Math.random() * 2 + 1}s ease-in-out ${Math.random() * 2}s infinite`,
          opacity: 0
        }} />
      ))}

      {/* Logo */}
      <div style={{
        animation: 'flipLogo 1.6s cubic-bezier(0.68,-0.55,0.27,1.55) forwards',
        transformStyle: 'preserve-3d',
        marginBottom: 32,
        filter: 'drop-shadow(0 0 40px rgba(245,166,35,0.5))',
      }}>
        <PPLLogoSVG size={160} />
      </div>

      {/* Text */}
      <div style={{
        textAlign: 'center',
        opacity: phase === 'text' || phase === 'exit' ? 1 : 0,
        transform: phase === 'text' || phase === 'exit' ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
      }}>
        <div style={{
          fontFamily: 'Bebas Neue, cursive',
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          letterSpacing: '6px',
          background: 'linear-gradient(90deg, #C4821A, #FFD06B, #F5A623)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 2s linear infinite',
        }}>
          PUTHALIPPURAM PREMIER LEAGUE
        </div>
        <div style={{
          fontFamily: 'Noto Sans Malayalam, sans-serif',
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          color: '#F5A623',
          marginTop: 8,
          letterSpacing: 2,
        }}>
          പൂതലിപുറം പ്രീമിയർ ലീഗ്
        </div>
        <div style={{
          fontFamily: 'Bebas Neue, cursive',
          fontSize: 'clamp(1.2rem, 4vw, 2rem)',
          color: '#fff',
          letterSpacing: '8px',
          marginTop: 12,
        }}>
          ⚽ SEASON 2 ⚽
        </div>
        <div style={{
          fontFamily: 'Noto Sans Malayalam, sans-serif',
          fontSize: '0.9rem',
          color: '#888',
          marginTop: 6,
        }}>
          സീസൺ 2
        </div>
      </div>

      {/* Loading dots */}
      {phase === 'text' && (
        <div style={{ display: 'flex', gap: 8, marginTop: 40 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#F5A623',
              animation: `sparkle 0.8s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
};

// Inline SVG Logo (shield shape mimicking PPL logo colors)
const PPLLogoSVG = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
    {/* Shield outer */}
    <path d="M100 10 L185 45 L185 130 Q185 185 100 210 Q15 185 15 130 L15 45 Z"
      fill="#111" stroke="#F5A623" strokeWidth="3"/>
    {/* Shield left half gold */}
    <clipPath id="leftHalf">
      <rect x="15" y="10" width="85" height="200"/>
    </clipPath>
    <path d="M100 10 L185 45 L185 130 Q185 185 100 210 Q15 185 15 130 L15 45 Z"
      fill="#F5A623" clipPath="url(#leftHalf)"/>
    {/* Stars */}
    <text x="100" y="30" textAnchor="middle" fontSize="14" fill="#111">★</text>
    <text x="68" y="28" textAnchor="middle" fontSize="12" fill="#F5A623">★</text>
    <text x="132" y="28" textAnchor="middle" fontSize="12" fill="#F5A623">★</text>
    {/* PPL text */}
    <rect x="55" y="42" width="90" height="52" fill="#F5A623" rx="4"/>
    <text x="100" y="83" textAnchor="middle" fontSize="34" fontWeight="900"
      fontFamily="Arial Black" fill="white">PPL</text>
    {/* Banner */}
    <rect x="35" y="100" width="130" height="46" fill="#111" rx="4" stroke="#F5A623" strokeWidth="1.5"/>
    <text x="100" y="118" textAnchor="middle" fontSize="11" fontWeight="900"
      fontFamily="Arial Black" fill="#F5A623">PUTHALIPPURAM</text>
    <text x="100" y="135" textAnchor="middle" fontSize="11" fontWeight="900"
      fontFamily="Arial Black" fill="#F5A623">PREMIER LEAGUE</text>
    {/* Ball */}
    <circle cx="100" cy="178" r="22" fill="#ddd" stroke="#aaa" strokeWidth="1"/>
    <path d="M100 156 L108 170 L100 178 L92 170 Z" fill="#555"/>
    <path d="M78 175 L92 170 L100 178 L90 188 Z" fill="#555"/>
    <path d="M122 175 L108 170 L100 178 L110 188 Z" fill="#555"/>
  </svg>
);

export { PPLLogoSVG };
export default IntroScreen;
