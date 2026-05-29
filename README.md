# PPL Season 2 - Player Registration Web App

**Puthalippuram Premier League (PPL) — Season 2**
പൂതലിപുറം പ്രീമിയർ ലീഗ് സീസൺ 2

---

## Features

- ⚽ Football-themed dark UI with gold accents
- 🔄 Logo flip intro animation
- 🌐 English / Malayalam language toggle
- 🎮 3D-style position selector (GK, Forward, Wing Back, Center Back)
- 📸 Photo upload (Player photo, Aadhar card, Payment screenshot)
- 💳 Payment QR code with download option & UPI ID display
- 🚫 Anti-drug warning section
- 📊 Registration data exported to Excel (.xlsx)
- ✅ Malayalam success message on submission
- 📱 Mobile-responsive design

---

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
cd ppl-registration
npm install
```

### Running Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The `build/` folder will contain the production-ready files.

---

## Form Fields

| Field | Type | Required |
|-------|------|----------|
| Full Name | Text | Yes |
| Email Address | Email | Yes |
| Phone Number (Indian format) | Tel | Yes |
| Playing Position | 3D Selector | Yes |
| Blood Group | Dropdown | Yes |
| Player Photo | Image Upload | Yes |
| Aadhar Card Photo | Image Upload | Yes |
| Payment Screenshot | Image Upload | Yes |

---

## Position Options

- **GK** — Goalkeeper (ഗോൾകീപ്പർ)
- **Forward** — Striker (ഫോർവേഡ്)
- **Wing Back** — Wide Player (വിംഗ് ബാക്ക്)
- **Center Back** — Defender (സെന്റർ ബാക്ക്)

---

## Customization

### Update Payment Details
Edit `src/components/PaymentQR.js`:
```js
const UPI_ID = 'puthalippuramppl@upi'; // Change to real UPI ID
```
Replace the QR code SVG with a real QR image for production.

### Update Registration Fee
Add fee amount in `src/components/PaymentQR.js`.

---

## Tech Stack

- React 18
- SheetJS (xlsx) for Excel export
- Google Fonts: Bebas Neue, Rajdhani, Noto Sans Malayalam
- Pure CSS animations

---

## Project Structure

```
src/
  App.js                    # Main app with form logic
  index.js                  # Entry point
  index.css                 # Global styles & animations
  components/
    IntroScreen.js          # Logo flip intro animation
    PositionSelector.js     # 3D position cards
    PaymentQR.js            # QR code + UPI display
    DrugWarning.js          # Anti-drug section
    SuccessModal.js         # Malayalam success message
```

---

*© 2024 Puthalippuram Premier League — Season 2*
