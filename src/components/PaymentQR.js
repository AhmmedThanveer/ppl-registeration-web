import React, { useState } from 'react';

const UPI_ID = 'sirajudheenms8@oksbi';
const ACCOUNT_NAME = 'Suraju melethil';
const PAYMENT_QR_SRC = `${process.env.PUBLIC_URL}/assets/paymentqr.jpeg`;

const PaymentQR = ({ lang }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = PAYMENT_QR_SRC;
    a.download = 'paymentqr.jpeg';
    a.click();
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
        <img
          src={PAYMENT_QR_SRC}
          alt={lang === 'ml' ? ' പേമെന്റ് ക്യൂആർ' : 'Payment QR'}
          style={{ width: 200, height: 200, objectFit: 'contain', borderRadius: 12 }}
        />
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
          <div style={{
            fontFamily: 'Noto Sans Malayalam, Rajdhani, sans-serif',
            fontSize: '0.75rem',
            color: '#ddd',
            marginTop: 4,
          }}>
            {lang === 'ml' ? 'ബാൻക്ക് പേര്: ' : 'Bank Name: '}{ACCOUNT_NAME}
          </div>
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
