import React from 'react';

const DrugWarning = ({ lang }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a0000, #200000)',
      border: '2px solid #E53E3E',
      borderRadius: 12,
      padding: '20px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated red glow border */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 12,
        boxShadow: 'inset 0 0 20px rgba(229,62,62,0.15)',
        animation: 'pulse 2s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>

      {/* Diagonal stripe background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'repeating-linear-gradient(45deg, #E53E3E 0px, #E53E3E 8px, transparent 8px, transparent 20px)',
        borderRadius: 12,
      }}/>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {/* No-drugs icon */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 56, height: 56,
            borderRadius: '50%',
            border: '3px solid #E53E3E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            background: 'rgba(229,62,62,0.1)',
          }}>
            <span style={{ fontSize: '1.8rem' }}>💊</span>
            {/* Cross-out line */}
            <div style={{
              position: 'absolute',
              width: '120%', height: 3,
              background: '#E53E3E',
              transform: 'rotate(-45deg)',
              borderRadius: 2,
            }}/>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: '1.3rem',
            letterSpacing: '3px',
            color: '#E53E3E',
            marginBottom: 4,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>⚠</span>
            {lang === 'ml' ? 'ഡ്രഗ്‌സ് നിഷിദ്ധം' : 'ANTI-DOPING POLICY'}
          </div>

          <div style={{
            fontFamily: lang === 'ml' ? 'Noto Sans Malayalam' : 'Rajdhani',
            fontSize: lang === 'ml' ? '0.9rem' : '1rem',
            color: '#ffaaaa',
            lineHeight: 1.6,
            marginBottom: 8,
          }}>
            {lang === 'ml'
              ? 'ഈ ടൂർണമെന്റിൽ ഡ്രഗ്‌സ്, മദ്യം, അല്ലെങ്കിൽ ഏതെങ്കിലും നിരോധിത വസ്തുക്കൾ ഉപയോഗിക്കുന്നത് കർശനമായി നിരോധിക്കപ്പെട്ടിരിക്കുന്നു. ലംഘനങ്ങൾ ഉടൻ അയോഗ്യതയ്ക്ക് കാരണമാകും.'
              : 'Use of drugs, alcohol, or any prohibited substances is strictly banned in this tournament. Violations result in immediate disqualification and lifetime ban.'
            }
          </div>

          <div style={{
            fontFamily: lang === 'ml' ? 'Noto Sans Malayalam' : 'Rajdhani',
            fontSize: '0.8rem',
            color: '#ff6666',
            fontWeight: 600,
          }}>
            {lang === 'ml'
              ? '🚫 ഡ്രഗ്‌സ് ഇല്ല • 🚫 മദ്യം ഇല്ല • ✅ ക്ലീൻ ഗെയിം'
              : '🚫 NO DRUGS • 🚫 NO ALCOHOL • ✅ CLEAN GAME ONLY'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugWarning;
