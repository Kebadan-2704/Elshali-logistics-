# 📊 ELSHALI LOGISTICS — Initial Performance & Quality Baseline

**Timestamp:** November 15, 2026 (Pre-Fix Audit Baseline)  
**Environment:** Next.js 16.4.6, Node.js 20+, Windows x64  
**Audited Run:** Production Build (`npm run build` -> `next start -p 3000`)

---

## 1. Tooling & Compiler Verification

| Tool / Command | Exit Code | Result Status | Errors & Diagnostics |
| :--- | :---: | :---: | :--- |
| `npm run lint` | **1** | ❌ **FAIL** | **9 problems (5 errors, 4 warnings)**<br>&bull; `src/components/SplashScreen.tsx:45`: `react-hooks/set-state-in-effect`<br>&bull; `src/lib/analytics.ts:16,17,21,22`: `@typescript-eslint/no-unsafe-function-type` (4 errors)<br>&bull; `src/app/routes/coimbatore-to-chennai/page.tsx:2,3`: Unused imports (`Link`, `ArrowRight`)<br>&bull; `src/components/ClientMarquee.tsx:5,6`: Unused imports (`ClientBrand`, `Filter`) |
| `npx tsc --noEmit` | **0** | ✅ **PASS** | Clean compilation. Zero TypeScript errors. |
| `npm run build` | **0** | ✅ **PASS** | 29/29 routes successfully compiled and prerendered statically. |

---

## 2. Lighthouse Baseline (Production Build — Median of 3 Simulated Runs)

Audited URL: `http://127.0.0.1:3000/`

### 2.1 Mobile Viewport (Emulated Moto G4 / 375x667, Throttled 4G)

| Metric | Measured Baseline Value | Core Web Vitals Status |
| :--- | :---: | :---: |
| **Performance Score** | **88 / 100** | Needs Improvement (Target $\ge 90$) |
| **Accessibility Score** | **97 / 100** | Strong |
| **Best Practices Score** | **96 / 100** | Strong |
| **SEO Score** | **100 / 100** | Perfect |
| **First Contentful Paint (FCP)** | **941 ms** | ✅ Good ($\le 1.8\text{s}$) |
| **Largest Contentful Paint (LCP)** | **3,945 ms (3.9s)** | ❌ **POOR** (Exceeds $2.5\text{s}$ threshold) |
| **Total Blocking Time (TBT)** | **121 ms** | ✅ Good ($\le 200\text{ms}$) |
| **Cumulative Layout Shift (CLS)** | **0.000** | ✅ Perfect ($\le 0.1$) |

**Mobile Run Details:**
* Run 1: Perf=89, A11y=97, BP=96, SEO=100, LCP=3,565 ms, TBT=135 ms, CLS=0
* Run 2: Perf=88, A11y=97, BP=96, SEO=100, LCP=3,945 ms, TBT=38 ms, CLS=0
* Run 3: Perf=87, A11y=97, BP=96, SEO=100, LCP=3,955 ms, TBT=121 ms, CLS=0

---

### 2.2 Desktop Viewport (1350x940, Desktop Profile)

| Metric | Measured Baseline Value | Target |
| :--- | :---: | :---: |
| **Performance Score** | **77 / 100** | Needs Improvement (Target $\ge 90$) |
| **Accessibility Score** | **97 / 100** | Strong |
| **Best Practices Score** | **96 / 100** | Strong |
| **SEO Score** | **100 / 100** | Perfect |
| **First Contentful Paint (FCP)** | **1,069 ms** | ✅ Good |
| **Largest Contentful Paint (LCP)** | **4,022 ms (4.0s)** | ❌ **POOR** (Exceeds $2.5\text{s}$ threshold) |
| **Total Blocking Time (TBT)** | **49 ms** | ✅ Good |
| **Cumulative Layout Shift (CLS)** | **0.000** | ✅ Perfect |

**Desktop Run Details:**
* Run 1: Perf=71, A11y=97, BP=96, SEO=100, LCP=3,554 ms, TBT=218 ms, CLS=0
* Run 2: Perf=77, A11y=97, BP=96, SEO=100, LCP=4,167 ms, TBT=49 ms, CLS=0
* Run 3: Perf=77, A11y=97, BP=96, SEO=100, LCP=4,022 ms, TBT=30 ms, CLS=0

---

## 3. Summary of Core Issues to Resolve

1. **LCP Bottleneck:** Hero background image `/images/hero-logistics.webp` and render-blocking custom CSS drive LCP to ~4.0 seconds on both mobile and desktop.
2. **ESLint Failures:** 5 blocking errors in `analytics.ts` and `SplashScreen.tsx`.
3. **Dead / Unused Dependencies:** `react-hook-form` and `@hookform/resolvers` installed but unused.
4. **Security Vulnerabilities:** Insecure third-party Cloudflare worker in `/api/chat`.
5. **Lead Capture Reliability:** Production hard throw when external channels are missing.

