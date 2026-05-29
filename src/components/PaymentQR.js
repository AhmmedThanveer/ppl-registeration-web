import React, { useState } from 'react';

const UPI_ID = 'puthalippuramppl@upi';

// Generate a simple QR-like SVG pattern (placeholder)
const QRPattern = () => {
  const size = 200;
  const cell = 5;
  const cols = size / cell;
  // Fixed seed pattern for a "QR-like" look
  const seed = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1,0,1,0,0,1,1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,0,0,1,1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1],
    [1,1,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,0,1],
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <rect width={size} height={size} fill="white"/>
      {/* Corner squares (finder patterns) */}
      {[[8,8],[148,8],[8,148]].map(([cx,cy],i) => (
        <g key={i}>
          <rect x={cx} y={cy} width={44} height={44} fill="#111" rx="4"/>
          <rect x={cx+6} y={cy+6} width={32} height={32} fill="white"/>
          <rect x={cx+12} y={cy+12} width={20} height={20} fill="#111" rx="2"/>
        </g>
      ))}
      {/* Data modules pattern */}
      {seed.map((row, ri) =>
        row.map((cell, ci) => cell ? (
          <rect key={`${ri}-${ci}`}
            x={60 + ci * 4} y={60 + ri * 4}
            width={3.5} height={3.5}
            fill="#111" rx="0.5"
          />
        ) : null)
      )}
      {/* PPL text in center */}
      <text x={size/2} y={size/2 + 4} textAnchor="middle"
        fontFamily="Arial Black" fontSize="14" fontWeight="900" fill="#F5A623">
        PPL
      </text>
    </svg>
  );
};

const PaymentQR = ({ lang }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const svg = document.getElementById('ppl-qr-svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PPL-Payment-QR.svg';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1200, #1a1a00)',
      border: '1px solid rgba(245,166,35,0.3)',
      borderRadius: 12,
      padding: 24,
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'Bebas Neue, cursive',
        fontSize: '1.3rem',
        letterSpacing: '3px',
        color: '#F5A623',
        marginBottom: 4,
      }}>
        {lang === 'ml' ? 'പേമെന്റ് ക്യൂആർ കോഡ്' : 'PAYMENT QR CODE'}
      </div>
      <div style={{
        fontFamily: lang === 'ml' ? 'Noto Sans Malayalam' : 'Rajdhani',
        fontSize: '0.8rem',
        color: '#888',
        marginBottom: 16,
      }}>
        {lang === 'ml' ? 'സ്കാൻ ചെയ്ത് പേ ചെയ്യുക' : 'Scan to pay registration fee'}
      </div>

      {/* QR code */}
      <div style={{
        display: 'inline-block',
        padding: 12,
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 0 30px rgba(245,166,35,0.3)',
        animation: 'float 3s ease-in-out infinite',
        marginBottom: 16,
      }}>
        <div id="ppl-qr-svg">
          <QRPattern />
        </div>
      </div>

      {/* UPI ID */}
      <div style={{
        background: 'rgba(245,166,35,0.1)',
        border: '1px solid rgba(245,166,35,0.3)',
        borderRadius: 8,
        padding: '10px 20px',
        marginBottom: 16,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ fontSize: '1.2rem' }}>💳</span>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: 1 }}>UPI ID</div>
          <div style={{
            fontFamily: 'Rajdhani',
            fontWeight: 700,
            color: '#F5A623',
            fontSize: '1rem',
            letterSpacing: 1,
          }}>{UPI_ID}</div>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(UPI_ID); }}
          style={{
            background: 'transparent', border: '1px solid rgba(245,166,35,0.4)',
            borderRadius: 4, padding: '4px 8px', color: '#F5A623',
            cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'Rajdhani',
          }}
        >
          {lang === 'ml' ? 'കോപ്പി' : 'COPY'}
        </button>
      </div>

      {/* Download button */}
      <div>
        <button
          onClick={handleDownload}
          className="btn-primary"
          style={{ fontSize: '0.9rem', padding: '10px 24px' }}
        >
          {downloaded
            ? (lang === 'ml' ? '✓ ഡൗൺലോഡ് ആയി!' : '✓ DOWNLOADED!')
            : (lang === 'ml' ? '⬇ QR ഡൗൺലോഡ് ചെയ്യുക' : '⬇ DOWNLOAD QR')
          }
        </button>
      </div>
    </div>
  );
};

export default PaymentQR;
