import React, { useState, useRef } from 'react';
import IntroScreen from './components/IntroScreen';
import PositionSelector from './components/PositionSelector';
import PaymentQR from './components/PaymentQR';
import DrugWarning from './components/DrugWarning';
import SuccessModal from './components/SuccessModal';
import { PPLLogoSVG } from './components/IntroScreen';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const t = {
  en: {
    title: 'PLAYER REGISTRATION',
    subtitle: 'Season 2 — Register Now',
    name: 'Full Name',
    namePh: 'Enter your full name',
    email: 'Email Address',
    emailPh: 'your@email.com',
    phone: 'Phone Number (India)',
    phonePh: '+91 89436 98542',
    position: 'Playing Position',
    blood: 'Blood Group',
    photo: 'Player Photo',
    aadhar: 'Aadhar Card Photo',
    payment: 'Payment Screenshot',
    photoHint: 'Upload clear passport-size photo',
    aadharHint: 'Upload front side of Aadhar card',
    paymentHint: 'Upload payment confirmation screenshot',
    submit: 'SUBMIT REGISTRATION',
    required: 'Required field',
    selectBlood: 'Select blood group',
    paySection: 'Registration Fee Payment',
    antiDrug: 'Anti-Drug Commitment',
    lang: 'മലയാളം',
    uploading: 'Uploading...',
    uploaded: 'Uploaded ✓',
    tapUpload: 'Tap to upload',
  },
  ml: {
    title: 'കളിക്കാരുടെ രെജിസ്ട്രേഷൻ',
    subtitle: 'സീസൺ 2 — ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യൂ',
    name: 'മുഴുവൻ പേര്',
    namePh: 'നിങ്ങളുടെ മുഴുവൻ പേർ നൽകുക',
    email: 'ഇമെയിൽ വിലാസം',
    emailPh: 'your@email.com',
    phone: 'ഫോൺ നമ്പർ (ഇന്ത്യ)',
    phonePh: '+91 89436 98542',
    position: 'കളിക്കുന്ന പൊസിഷൻ',
    blood: 'രക്തഗ്രൂപ്പ്',
    photo: 'കളിക്കാരന്റെ ഫോട്ടോ',
    aadhar: 'ആധാർ കാർഡ് ഫോട്ടോ',
    payment: 'പേമെന്റ് സ്ക്രീൻഷോട്ട്',
    photoHint: 'വ്യക്തമായ പാസ്‌പോർട്ട് ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
    aadharHint: 'ആധാർ കാർഡിന്റെ മുൻഭാഗം അപ്‌ലോഡ് ചെയ്യുക',
    paymentHint: 'പേമെന്റ് സ്ഥിരീകരണ സ്ക്രീൻഷോട്ട് അപ്‌ലോഡ് ചെയ്യുക',
    submit: 'രജിസ്ട്രേഷൻ സമർപ്പിക്കുക',
    required: 'നിർബന്ധിത ഫീൽഡ്',
    selectBlood: 'രക്തഗ്രൂപ്പ് തിരഞ്ഞെടുക്കുക',
    paySection: 'രജിസ്ട്രേഷൻ ഫീ പേമെന്റ്',
    antiDrug: 'ഡ്രഗ്-വിരുദ്ധ പ്രതിജ്ഞ',
    lang: 'English',
    uploading: 'അപ്‌ലോഡ് ചെയ്യുന്നു...',
    uploaded: 'അപ്‌ലോഡ് ആയി ✓',
    tapUpload: 'അപ്‌ലോഡ് ചെയ്യാൻ ടാപ്പ് ചെയ്യുക',
  }
};

const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwyzp11UQQrDfSIe7kDZgXQVWFAhGs5LnXQXggJvAMZXD1Z4VLqCz6J60JLqmIs7HXiIw/exec';

const fileToBase64 = (file) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = (e) => resolve(e.target.result);
  reader.readAsDataURL(file);
});

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [lang, setLang] = useState('en');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', position: '', bloodGroup: '',
  });
  const [files, setFiles] = useState({
    photo: null, aadhar: null, payment: null,
  });
  const [previews, setPreviews] = useState({
    photo: null, aadhar: null, payment: null,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputs = {
    photo: useRef(), aadhar: useRef(), payment: useRef(),
  };

  const tx = t[lang];

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }));
  };

  const handleFileChange = (field) => async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = await fileToBase64(file);
    setFiles(f => ({ ...f, [field]: file }));
    setPreviews(p => ({ ...p, [field]: preview }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    if (!form.phone.trim() || !/^(\+91|91|0)?[6-9]\d{9}$/.test(form.phone.replace(/\s/g,''))) errs.phone = true;
    if (!form.position) errs.position = true;
    if (!form.bloodGroup) errs.bloodGroup = true;
    if (!files.photo) errs.photo = true;
    if (!files.aadhar) errs.aadhar = true;
    if (!files.payment) errs.payment = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      const firstErr = document.querySelector('[data-error="true"]');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitting(true);

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      position: form.position,
      bloodGroup: form.bloodGroup,
      photoName: files.photo ? files.photo.name : '',
      aadharName: files.aadhar ? files.aadhar.name : '',
      paymentName: files.payment ? files.payment.name : '',
      date: new Date().toLocaleString(),
    };

    try {
      if (GOOGLE_SHEET_WEB_APP_URL && !GOOGLE_SHEET_WEB_APP_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL')) {
        await fetch(GOOGLE_SHEET_WEB_APP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      setSuccess(true);
    } catch (error) {
      console.error('Submit failed', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccess(false);
    setForm({ name: '', email: '', phone: '', position: '', bloodGroup: '' });
    setFiles({ photo: null, aadhar: null, payment: null });
    setPreviews({ photo: null, aadhar: null, payment: null });
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  const isML = lang === 'ml';

  return (
    <div className="pitch-bg" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(180deg, #000 0%, rgba(0,0,0,0.9) 100%)',
        borderBottom: '2px solid rgba(245,166,35,0.3)',
        padding: '16px 20px',
        position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{
          maxWidth: 720, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <PPLLogoSVG size={44} />
            <div>
              <div style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: '1.1rem',
                letterSpacing: '3px',
                background: 'linear-gradient(90deg, #F5A623, #FFD06B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {isML ? 'പൂതലിപുറം പ്രീമിയർ ലീഗ്' : 'PUTHALIPPURAM PREMIER LEAGUE'}
              </div>
              <div style={{
                fontFamily: isML ? 'Noto Sans Malayalam' : 'Rajdhani',
                fontSize: '0.7rem',
                color: '#888',
                letterSpacing: 1,
              }}>
                {isML ? 'സീസൺ 2 • 2026' : 'SEASON 2 • 2026'}
              </div>
            </div>
          </div>
          {/* Language toggle */}
          <button
            onClick={() => setLang(l => l === 'en' ? 'ml' : 'en')}
            style={{
              background: 'rgba(245,166,35,0.15)',
              border: '1px solid rgba(245,166,35,0.4)',
              borderRadius: 20,
              padding: '6px 16px',
              color: '#F5A623',
              cursor: 'pointer',
              fontFamily: 'Noto Sans Malayalam, Rajdhani, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            {tx.lang}
          </button>
        </div>
      </header>

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #111 0%, #1a1200 50%, #111 100%)',
        borderBottom: '1px solid rgba(245,166,35,0.15)',
        padding: '32px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Football field lines decoration */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'radial-gradient(circle at 50% 100%, #F5A623 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}/>
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 300, height: 300,
          borderRadius: '50%',
          border: '1px solid rgba(245,166,35,0.08)',
          pointerEvents: 'none',
        }}/>

        <div style={{
          fontFamily: 'Bebas Neue, cursive',
          fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
          letterSpacing: '6px',
          lineHeight: 1,
          marginBottom: 8,
        }}
          className="gold-shimmer"
        >
          {tx.title}
        </div>
        <div style={{
          fontFamily: isML ? 'Noto Sans Malayalam' : 'Rajdhani',
          fontSize: '1rem',
          color: '#888',
          letterSpacing: 2,
        }}>
          ⚽ {tx.subtitle} ⚽
        </div>
      </div>

      {/* Main form */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px 60px' }}>

        {/* Drug warning at top */}
        <div style={{ marginBottom: 32 }}>
          <SectionTitle icon="🚫" title={tx.antiDrug} isML={isML} />
          <DrugWarning lang={lang} />
        </div>

        {/* Personal Info */}
        <div style={{ marginBottom: 32 }}>
          <SectionTitle icon="👤" title={isML ? 'വ്യക്തിഗത വിവരങ്ങൾ' : 'PERSONAL INFORMATION'} isML={isML} />

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            padding: 24,
          }}>
            {/* Name */}
            <FormField
              label={tx.name} labelML={isML ? '' : 'പേര്'}
              error={errors.name} required isML={isML}
            >
              <input
                className="form-input"
                placeholder={tx.namePh}
                value={form.name}
                onChange={handleChange('name')}
                data-error={errors.name || undefined}
                style={errors.name ? { borderColor: '#E53E3E' } : {}}
              />
            </FormField>

            {/* Email */}
            <FormField label={tx.email} labelML={isML ? '' : 'ഇമെയിൽ'} error={errors.email} required isML={isML}>
              <input
                className="form-input"
                type="email"
                placeholder={tx.emailPh}
                value={form.email}
                onChange={handleChange('email')}
                style={errors.email ? { borderColor: '#E53E3E' } : {}}
              />
            </FormField>

            {/* Phone */}
            <FormField label={tx.phone} labelML={isML ? '' : 'ഫോൺ നമ്പർ'} error={errors.phone} required isML={isML}>
              <input
                className="form-input"
                type="tel"
                placeholder={tx.phonePh}
                value={form.phone}
                onChange={handleChange('phone')}
                style={errors.phone ? { borderColor: '#E53E3E' } : {}}
              />
            </FormField>

            {/* Blood Group */}
            <FormField label={tx.blood} labelML={isML ? '' : 'രക്തഗ്രൂപ്പ്'} error={errors.bloodGroup} required isML={isML}>
              <select
                className="form-input"
                value={form.bloodGroup}
                onChange={handleChange('bloodGroup')}
                style={errors.bloodGroup ? { borderColor: '#E53E3E' } : {}}
              >
                <option value="">{tx.selectBlood}</option>
                {bloodGroups.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* Position Selection */}
        <div style={{ marginBottom: 32 }}>
          <SectionTitle icon="⚽" title={isML ? 'പൊസിഷൻ' : 'SELECT POSITION'} isML={isML} />
          <div
            data-error={errors.position || undefined}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${errors.position ? '#E53E3E' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 12, padding: 16,
            }}
          >
            <PositionSelector
              value={form.position}
              onChange={(pos) => {
                setForm(f => ({ ...f, position: pos }));
                setErrors(er => ({ ...er, position: '' }));
              }}
              lang={lang}
            />
            {errors.position && (
              <div style={{ color: '#E53E3E', fontSize: '0.8rem', marginTop: 8 }}>
                {isML ? 'പൊസിഷൻ തിരഞ്ഞെടുക്കുക' : 'Please select a position'}
              </div>
            )}
          </div>
        </div>

        {/* Document Uploads */}
        <div style={{ marginBottom: 32 }}>
          <SectionTitle icon="📎" title={isML ? 'ഡോക്യുമെന്റ് അപ്‌ലോഡ്' : 'DOCUMENT UPLOADS'} isML={isML} />
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: 24,
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <UploadField
              label={tx.photo}
              hint={tx.photoHint}
              preview={previews.photo}
              onUpload={handleFileChange('photo')}
              inputRef={fileInputs.photo}
              error={errors.photo}
              tx={tx}
              accept="image/*"
              icon="🧑"
            />
            <UploadField
              label={tx.aadhar}
              hint={tx.aadharHint}
              preview={previews.aadhar}
              onUpload={handleFileChange('aadhar')}
              inputRef={fileInputs.aadhar}
              error={errors.aadhar}
              tx={tx}
              accept="image/*,.pdf"
              icon="🪪"
            />
            <UploadField
              label={tx.payment}
              hint={tx.paymentHint}
              preview={previews.payment}
              onUpload={handleFileChange('payment')}
              inputRef={fileInputs.payment}
              error={errors.payment}
              tx={tx}
              accept="image/*"
              icon="💸"
            />
          </div>
        </div>

        {/* Payment QR */}
        <div style={{ marginBottom: 32 }}>
          <SectionTitle icon="💳" title={tx.paySection} isML={isML} />
          <PaymentQR lang={lang} />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            width: '100%',
            background: submitting
              ? 'rgba(245,166,35,0.3)'
              : 'linear-gradient(135deg, #F5A623, #C4821A)',
            color: submitting ? '#888' : '#000',
            border: 'none',
            padding: '20px',
            fontFamily: 'Bebas Neue, cursive',
            fontSize: '1.5rem',
            letterSpacing: '4px',
            cursor: submitting ? 'not-allowed' : 'pointer',
            borderRadius: 8,
            transition: 'all 0.3s ease',
            boxShadow: submitting ? 'none' : '0 8px 32px rgba(245,166,35,0.3)',
            transform: submitting ? 'scale(0.98)' : 'scale(1)',
          }}
        >
          {submitting
            ? (isML ? 'അപ്‌ലോഡ് ചെയ്യുന്നു...' : 'PROCESSING...')
            : tx.submit
          }
        </button>

        {/* Anti-drug footer */}
        <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            fontFamily: isML ? 'Noto Sans Malayalam' : 'Rajdhani',
            fontSize: '0.8rem', color: '#555',
          }}>
            {isML
              ? '🚫 ഡ്രഗ്‌സ് ഇല്ലാതെ • ⚽ ക്ലീൻ ഫുട്ബോൾ • 🏆 PPL സീസൺ 2'
              : '🚫 Drug Free • ⚽ Clean Football • 🏆 PPL Season 2'}
          </div>
        </div>
      </main>

      {success && (
        <SuccessModal
          playerName={form.name}
          lang={lang}
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
}

// Section title component
const SectionTitle = ({ icon, title, isML }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    marginBottom: 16,
  }}>
    <span style={{ fontSize: '1.2rem' }}>{icon}</span>
    <div style={{
      fontFamily: isML ? 'Noto Sans Malayalam' : 'Bebas Neue, cursive',
      fontSize: isML ? '1.1rem' : '1.3rem',
      letterSpacing: isML ? 1 : '3px',
      color: '#F5A623',
    }}>
      {title}
    </div>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(245,166,35,0.4), transparent)' }}/>
  </div>
);

// Form field wrapper
const FormField = ({ label, labelML, error, required, children, isML }) => (
  <div className="form-group" data-error={error ? 'true' : undefined}>
    <label className="form-label" style={error ? { color: '#E53E3E' } : {}}>
      {label} {required && <span style={{ color: '#E53E3E' }}>*</span>}
    </label>
    {!isML && labelML && (
      <span className="form-label-ml">{labelML}</span>
    )}
    {children}
    {error && (
      <div style={{ color: '#E53E3E', fontSize: '0.75rem', marginTop: 4 }}>
        {isML ? 'ഈ ഫീൽഡ് ആവശ്യമാണ്' : 'This field is required'}
      </div>
    )}
  </div>
);

// Upload field component
const UploadField = ({ label, hint, preview, onUpload, inputRef, error, tx, accept, icon }) => (
  <div data-error={error ? 'true' : undefined}>
    <label className="form-label" style={error ? { color: '#E53E3E' } : {}}>
      {icon} {label} <span style={{ color: '#E53E3E' }}>*</span>
    </label>
    <div
      className={`upload-area ${preview ? 'uploaded' : ''}`}
      style={error ? { borderColor: '#E53E3E' } : {}}
      onClick={() => inputRef.current && inputRef.current.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onUpload}
        style={{ display: 'none' }}
      />
      {preview ? (
        <div>
          {preview.startsWith('data:image') ? (
            <img
              src={preview}
              alt="preview"
              style={{
                maxHeight: 120, maxWidth: '100%',
                borderRadius: 8, marginBottom: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            />
          ) : (
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>📄</div>
          )}
          <div style={{ color: '#48BB78', fontSize: '0.85rem', fontWeight: 600 }}>
            {tx.uploaded}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '2.5rem', marginBottom: 8, opacity: 0.6 }}>⬆️</div>
          <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: 4 }}>{tx.tapUpload}</div>
          <div style={{ color: '#555', fontSize: '0.75rem' }}>{hint}</div>
        </div>
      )}
    </div>
    {error && (
      <div style={{ color: '#E53E3E', fontSize: '0.75rem', marginTop: 4 }}>
        {tx.required}
      </div>
    )}
  </div>
);

export default App;
