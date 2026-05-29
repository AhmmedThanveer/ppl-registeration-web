import React, { useState, useEffect } from 'react';

const logoSrc = `${process.env.PUBLIC_URL}/assets/ppl-logo.png`;

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
        <PPLLogoSVG size={220} />
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

// Logo image loaded from public assets (PDF/png upload)
const PPLLogoSVG = ({ size = 120 }) => (
  <img
    src={logoSrc}
    alt="PPL Logo"
    width={size}
    height="auto"
    style={{
      width: size,
      height: 'auto',
      display: 'block',
      objectFit: 'contain',
      maxWidth: '100%',
    }}
    onError={(event) => {
      event.currentTarget.onerror = null;
      event.currentTarget.style.display = 'none';
    }}
  />
);

export { PPLLogoSVG };
export default IntroScreen;
