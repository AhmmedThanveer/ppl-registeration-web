import React, { useEffect, useState } from 'react';

const SuccessModal = ({ playerName, lang, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const mlMessage = `🎉 ${playerName} - നിങ്ങളുടെ രജിസ്ട്രേഷൻ വിജയകരമായി പൂർത്തിയാക്കി!
PPL സീസൺ 2 ലേക്ക് സ്വാഗതം! ⚽
ടീം മാനേജ്‌മെന്റ് ഉടൻ ബന്ധപ്പെടും.`;

  const enMessage = `🎉 ${playerName} — Your registration is complete!
Welcome to PPL Season 2! ⚽
Team management will contact you shortly.`;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(4px)',
      padding: 20,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s ease',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0f1a00, #001a0f)',
        border: '2px solid #48BB78',
        borderRadius: 16,
        padding: '40px 32px',
        maxWidth: 480,
        width: '100%',
        textAlign: 'center',
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(30px)',
        transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: '0 0 60px rgba(72,187,120,0.3)',
      }}>
        {/* Checkmark animation */}
        <div style={{
          width: 80, height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #48BB78, #276749)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '2.5rem',
          boxShadow: '0 0 30px rgba(72,187,120,0.4)',
          animation: 'float 2s ease-in-out infinite',
        }}>
          ✓
        </div>

        <div style={{
          fontFamily: 'Bebas Neue, cursive',
          fontSize: '2rem',
          letterSpacing: '4px',
          color: '#48BB78',
          marginBottom: 8,
        }}>
          {lang === 'ml' ? 'രജിസ്ട്രേഷൻ വിജയം!' : 'REGISTRATION SUCCESS!'}
        </div>

        <div style={{
          fontFamily: 'Noto Sans Malayalam, sans-serif',
          fontSize: '1rem',
          color: '#fff',
          lineHeight: 1.8,
          marginBottom: 24,
          whiteSpace: 'pre-line',
        }}>
          {lang === 'ml' ? mlMessage : enMessage}
        </div>

        {/* Also show Malayalam message always */}
        {lang !== 'ml' && (
          <div style={{
            fontFamily: 'Noto Sans Malayalam, sans-serif',
            fontSize: '0.9rem',
            color: '#aaa',
            lineHeight: 1.8,
            marginBottom: 24,
            padding: '12px 16px',
            background: 'rgba(72,187,120,0.08)',
            borderRadius: 8,
            border: '1px solid rgba(72,187,120,0.2)',
          }}>
            {mlMessage}
          </div>
        )}

        {/* PPL badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(245,166,35,0.1)',
          border: '1px solid rgba(245,166,35,0.3)',
          borderRadius: 30,
          padding: '8px 20px',
          marginBottom: 24,
        }}>
          <span>⭐</span>
          <span style={{
            fontFamily: 'Bebas Neue, cursive',
            letterSpacing: 2,
            color: '#F5A623',
          }}>PPL SEASON 2 PLAYER</span>
          <span>⭐</span>
        </div>

        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', fontSize: '1.1rem' }}
        >
          {lang === 'ml' ? 'ശരി, നന്ദി! 🙏' : 'AWESOME, THANKS! 🙏'}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
