# ELSALI LOGISTICS — Commercial Freight & Logistics Platform

> High-performance digital platform for **ELSALI LOGISTICS**, specializing in LCV, HCV, and Pan-India freight transportation. Built with Next.js 16 (App Router), Tailwind CSS v4, and Motion.

---

## Overview

ELSALI LOGISTICS provides reliable, on-demand logistics solutions across Tamil Nadu and Pan-India corridors. This platform was reverse-engineered from reference specifications and hardened through an empirical, multi-engine audit (Pass A & Pass B) to ensure Core Web Vitals compliance, WCAG 2.2 AA accessibility, and seamless responsiveness across all screen sizes.

---

## Key Highlights & Verification Metrics

- **Desktop Lighthouse Performance**: **96 / 100** (FCP: 0.3s, LCP: 1.4s, TBT: 10ms, CLS: 0)
- **Accessibility**: **98 / 100 Desktop, 95 / 100 Mobile** (0 serious/critical axe-core violations across 5 user states)
- **Smoothness**: Solid **60 FPS** during continuous scrolling (p95 frame time: 16.7 ms, 0 frames > 50 ms)
- **Viewport Matrix**: **44 / 44 viewports passed** with 0 horizontal overflow (down to 320px narrow phones)
- **Cross-Browser Fidelity**: **100% pass rate (15/15)** across Blink (Chromium), Gecko (Firefox), and WebKit (Desktop Safari)
- **Production API Security**:
  - `/api/quote`: 11-field Zod validation, sliding-window rate limiting (5 req/min), honeypot spam protection, and WhatsApp/phone fallback
  - `/api/contact`: Zod schema validation, honeypot protection, and rate limiting
- **Media & Assets**: 100% self-hosted local WebP fleet photography under `/public/vehicles/` with [CREDITS.md](public/vehicles/CREDITS.md) and an optimized 26.5 KB brand mark

Detailed empirical audit logs and before/after metrics are available in:
- [AUDIT_REPORT.md](qa/reports/AUDIT_REPORT.md)
- [FIX_LOG.md](qa/reports/FIX_LOG.md)

---

## Tech Stack

- **Framework**: Next.js 16.3.8 (App Router, React 19)
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css`)
- **Animations**: Motion (Framer Motion) with `useReducedMotion()` accessible fallbacks
- **Validation**: Zod server-side schema validation
- **Testing & QA**: Playwright, `@axe-core/playwright`, Sharp, Linkinator, Lighthouse CDP
- **Deployment**: Zero-config Vercel / Node.js standalone

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Kebadan-2704/Elshali-logistics-.git
cd Elshali-logistics-

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Run TypeScript type check
npx tsc --noEmit

# Run ESLint
npm run lint

# Compile production bundle
npm run build

# Start production server
npm run start
```

### Running QA & Audit Suites

```bash
# Run Playwright functional tests across Chromium, Firefox & WebKit
npx playwright test qa/functional.spec.ts

# Run 44-viewport responsiveness sweep
npx playwright test qa/viewport-sweep.spec.ts

# Run axe-core accessibility audit
npx playwright test qa/a11y.spec.ts

# Run image and network integrity audit
npx playwright test qa/images.spec.ts
```

---

## Environment Variables

Copy `.env.example` to `.env.local` to configure optional production credentials:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, and robots.txt | `http://localhost:3000` |
| `RESEND_API_KEY` | Optional Resend API key for live email notifications | Empty (graceful 503 with WhatsApp fallback) |
| `CONTACT_EMAIL` | Target email for quote submissions | `elsalilogistics@gmail.com` |

---

## License

Proprietary commercial web application for **ELSALI LOGISTICS**. Fleet image licensing details are provided in [CREDITS.md](public/vehicles/CREDITS.md).
