# PRAYAAN 2026 — MCA Tech Fest | SNGCE

> **An immersive, cinematic event portal** built for **PRAYAAN 2026**, the annual national technical festival hosted by the **Department of Computer Applications (MCA)** at **Sree Narayana Gurukulam College of Engineering (SNGCE)**, Kolenchery, Kerala.

📅 **Event Date:** October 30, 2026  
📍 **Venue:** SNGCE Campus, Kadayiruppu, Kolenchery, Ernakulam, Kerala  
🔗 **Repository:** [https://github.com/srjofficial/prayan-2026](https://github.com/srjofficial/prayan-2026)

---

## 🌐 Live Preview & Hosting

Designed for instant, high-performance deployment on **[Vercel](https://vercel.com)**:
- Zero-config Next.js App Router deployment
- Automatic Turbopack-optimized production builds
- Integrated Google Sheets registration backend

---

## ⚡ Core Features & Highlights

- **Symmetric Wave Entry Loader** — High-performance audio-wave pulse loader setting the atmosphere.
- **Cinematic "Man on Cliff" Scroll Animation** — 208 high-resolution WebP frames orchestrated via GSAP ScrollTrigger & Canvas, featuring dual responsive pipelines (landscape for desktop and focused portrait for mobile).
- **Matched Hero Action CTAs** — Obsidian black & stellar gold synchronized buttons (`EXPLORE EVENTS →` and `REGISTER NOW →`) with smooth anchor scrolling.
- **Interactive Fun Games Explorer** — Interactive selector showcasing the 5 mini-games (*വട്ടം മൂടാം, വട്ടത്തിലാകാം!*, *കാറ്റല്ല, പേപ്പറാ!*, *ബലൂൺ പോയാൽ കപ്പ് പോയി!*, *പൊട്ടുമോ ഇല്ലയോ?*, *പേനയ്ക്ക് കുപ്പിയോട് പ്രണയം*) with objectives, bulleted directives, pro-tips, and tiered pricing.
- **8 Flagship Events with Event Guidelines**:
  1. **Blind Typing Competition** — ₹40 / participant (Solo)
  2. **Website in 60 Minutes** — ₹100 / team (2 members)
  3. **AI Prompt Engineering** — ₹50 / participant (Solo)
  4. **Tech Charades** — ₹100 / team (2 members)
  5. **Tech Mystery Hunt** — ₹150 / team (2–3 members)
  6. **Fun Games Arena** — ₹20 / game (All 5 Games Combo Pass: ₹100) • On-Spot Entry
  7. **Spot Choreo** — ₹100 / head (Solo)
  8. **Reel Making** — ₹100 / team (2 members)
- **Automated Registration & Payments** — Per-event UPI payment QR lightbox, QR code download, image receipt upload verification, and live Google Sheets storage via Google Apps Script.

---

## 📁 Project Structure

```
prayan-2026/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout, fonts, and global metadata
│   ├── page.tsx                # Homepage (Hero + Cliff Animation + Events Showcase + Footer)
│   ├── loading.tsx             # Global loading boundary
│   ├── events/
│   │   └── [id]/
│   │       ├── page.tsx        # Event details & Event Guidelines
│   │       └── register/
│   │           └── page.tsx    # Event registration form with QR payment & receipt upload
│   └── api/
│       ├── register/
│       │   └── route.ts        # POST endpoint: writes registrations to Google Sheets
│       └── download-qr/
│           └── route.ts        # API endpoint for downloading event QR codes
│
├── components/                 # React UI Components
│   ├── CliffScrollAnimation.tsx# 208-frame Apple-style canvas scroll sequence
│   ├── FunGamesShowcase.tsx    # 5 mini-games interactive tab explorer & fee tier cards
│   ├── EventsShowcase.tsx      # All events showcase grid
│   ├── SiteFooter.tsx          # College, department info, and campus directions
│   ├── FloatingSpores.tsx      # Atmospheric spore particles
│   ├── StrangerThingsHero.tsx  # Fixed navigation and festival title
│   ├── ui/
│   │   ├── shiny-button.tsx    # Animated metallic shimmer button
│   │   └── ...                 # Radix UI primitives
│   └── loading-ui/
│       └── symmetric-wave.tsx  # Symmetric audio wave loader
│
├── lib/
│   ├── stranger-events-data.tsx# Master event registry (fees, rules, timings, venues, QR codes)
│   └── utils.ts                # Class merge utility (cn)
│
├── public/
│   ├── frames/
│   │   ├── cliff-webp/         # Desktop landscape WebP frames (0001–0208)
│   │   └── cliff-mobile-webp/  # Mobile portrait WebP frames (0001–0208)
│   ├── images/
│   │   ├── qr/                 # Official event payment QR codes
│   │   └── events/             # High-res poster assets
│   └── fonts/                  # Custom display typography
│
├── .env.example                # Template for environment variables
├── package.json                # Project dependencies & scripts
└── tailwind.config.ts          # Custom theme tokens & keyframe animations
```

---

## ⚙️ Environment Configuration

Create a `.env.local` or `.env` file in the root directory:

```env
GOOGLE_SHEET_URL="https://script.google.com/macros/s/YOUR_APPS_SCRIPT_DEPLOYMENT_ID/exec"
```

### Google Sheets Apps Script Setup:
1. Create a Google Sheet to record registrations.
2. Open **Extensions → Apps Script** and deploy a Web App with `doPost(e)`.
3. Set access to **"Anyone"** and copy the deployment URL into `GOOGLE_SHEET_URL`.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm**, **pnpm**, or **yarn**

### Local Installation

```bash
# Clone the repository
git clone https://github.com/srjofficial/prayan-2026.git
cd prayan-2026

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm run start
```

---

## ☁️ Deploying to Vercel

1. Import the repository `srjofficial/prayan-2026` in the [Vercel Dashboard](https://vercel.com/new).
2. Framework preset will automatically be set to **Next.js**.
3. Under **Environment Variables**, add:
   - **Key:** `GOOGLE_SHEET_URL`
   - **Value:** Your Google Apps Script deployment URL
4. Click **Deploy**.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React Framework with App Router & Turbopack |
| **TypeScript** | Type-safe code architecture |
| **Tailwind CSS** | Custom theme palette (Void Black, Stellar Gold, Solar Copper) |
| **GSAP & ScrollTrigger** | High-performance frame-by-frame canvas scrubbing |
| **Framer Motion** | Micro-interactions and animated UI cards |
| **Lucide Icons** | Vector iconography |

---

## 🏛️ Organized By

**Department of Computer Applications (MCA)**  
**Sree Narayana Gurukulam College of Engineering (SNGCE)**  
Kolenchery, Ernakulam, Kerala – 682311

- 🌐 College Website: [sngce.ac.in](https://sngce.ac.in)
- 📍 Location: Kadayiruppu, Kolenchery, Kochi, Kerala
