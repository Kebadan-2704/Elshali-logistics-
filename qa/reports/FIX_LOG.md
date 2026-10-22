# ELSALI LOGISTICS — Fix Log & Verification Evidence (Pass B)

This document records each fix applied in Pass B in strict priority order, documenting the issue ID, root cause, exact code diff summary, before/after evidence, and regression test results.

---

### Fix P0.1: Server API Endpoints & Real Form Validation (ISS-08)
- **Issue ID**: ISS-08 (Blocker)
- **Root Cause**: The application previously had no server API routes (`/api/quote` and `/api/contact`). Forms in `QuoteModal.tsx` and `Contact.tsx` simulated success via `setTimeout` without validation or email dispatch.
- **Diff Summary**:
  - Created `src/lib/rateLimit.ts` implementing an in-memory sliding window rate limiter (5 requests/minute per IP).
  - Created `src/app/api/quote/route.ts` with strict Zod validation schema (11 fields + honeypot `website`), XSS input sanitization, rate limiting, and 503 fallback when `RESEND_API_KEY` is missing.
  - Created `src/app/api/contact/route.ts` with Zod schema, honeypot spam rejection, and WhatsApp/phone error fallback.
  - Updated `src/components/QuoteModal.tsx` and `src/components/Contact.tsx` to POST real JSON payloads to endpoints, display loading indicators, handle 400/429/503 errors with direct phone/WhatsApp links, and only show success on 200 OK.
- **Before / After Evidence**:
  - *Before*: Forms simulated `setTimeout(1500)` -> immediate fake success; no endpoints existed.
  - *After*: Tested via automated node probe:
    - Valid quote POST: `HTTP 200` with assigned reference ID (`ELS-380889`).
    - Invalid payload (malformed phone `123`): `HTTP 400` with field-level error messages.
    - Spam payload (honeypot `website` filled): `HTTP 400` with `Spam submission rejected`.
    - Flooded requests (> 5/min): `HTTP 429` with `Retry-After: 60`.
- **Regression Check**: Playwright `qa/functional.spec.ts` passed 15/15 across Chromium, Firefox, WebKit.

---

### Fix P0.2: Brand Identity Asset Optimization (ISS-01)
- **Issue ID**: ISS-01 (Blocker)
- **Root Cause**: `public/images/elsali-logo.png` was an uncompressed 6250x6250 PNG weighing **7,971,621 bytes (7.96 MB)** loaded in both Navbar and Footer, inflating mobile throttled LCP to 51.2 seconds.
- **Diff Summary**:
  - Processed `Elsali .png` via `sharp` to exact 2x rendered dimensions (360x360), high-effort WebP quality 85.
  - Output file: `public/images/elsali-logo.webp` (**26,576 bytes / 26.5 KB**).
  - Removed uncompressed 8 MB file from `/public/`.
  - Updated `src/components/Navbar.tsx` and `src/components/Footer.tsx` to reference `/images/elsali-logo.webp`.
- **Before / After Evidence**:
  - *Before*: Asset size: **7,971,621 bytes (7.96 MB)**; Mobile LCP: **51.2 seconds**.
  - *After*: Asset size: **26,576 bytes (26.5 KB)** — a **99.67% payload reduction**; Mobile LCP reduced to **7.7 seconds** on dev / **1.4s on desktop**.
- **Regression Check**: Navbar and Footer render crisp high-DPI brand mark; `qa/images.spec.ts` passed with 0 failed requests.

---

### Fix P0.3: Vehicle Fleet Self-Hosting & Image Optimization (ISS-02, ISS-10, ISS-11)
- **Issue ID**: ISS-02, ISS-10, ISS-11 (High / Medium)
- **Root Cause**: Vehicles 1 (Mini/Dost) and 8 (32 Ft) used broken Unsplash hotlinks returning HTTP 404. All vehicle cards depended on third-party CDNs. About section displayed a highway truck image while alt text claimed "Warehouse interior". `next.config.ts` had `unoptimized: true`.
- **Diff Summary**:
  - Generated photorealistic commercial fleet photos matching spec requirements:
    - `public/vehicles/v1-mini-dost.webp` (Tata Ace intra-city cargo truck, 117 KB).
    - `public/vehicles/v8-32ft.webp` (32 Ft multi-axle heavy haulage trailer, 55 KB).
    - Converted vehicles 2 through 7 to local self-hosted WebP files in `public/vehicles/`.
  - Generated `public/images/warehouse-interior.webp` (modern warehouse with racks and overhead ducts) matching reference `frame_002.jpg`.
  - Updated `src/data/vehicles.ts` to reference local `/vehicles/v*.webp` files.
  - Created `public/vehicles/CREDITS.md` documenting source, subject, and license for every vehicle.
  - Removed `unoptimized: true` from `next.config.ts`; enabled AVIF/WebP formats.
  - Migrated `Hero.tsx`, `About.tsx`, `ServicesStack.tsx`, and `Vehicles.tsx` from raw `<img>` to `next/image`.
- **Before / After Evidence**:
  - *Before*: 2 broken 404 images; 1 alt text mismatch; raw unoptimized `<img>` tags.
  - *After*: `qa/images.spec.ts` reported **0 failed image requests**, **0 broken images**, **0 missing alt attributes** across all 3 browser engines.
- **Regression Check**: Visual cards render correctly with 100% self-hosted local assets.

---

### Fix P0.4: Removal of Unrequested & Simulated Components
- **Issue ID**: Scope & Compliance Violation
- **Root Cause**: Repository contained 4 orphan component files not requested in the spec: `TestimonialsSection.tsx` (fabricated client quotes/names), `FleetCapacityTicker.tsx` (fabricated statistics in non-conforming gold styling), `InteractiveRouteCalculator.tsx` (mock distance formula), and `LiveTrackingSimulator.tsx` (mock tracking ID `ELS-88942`).
- **Diff Summary**:
  - Permanently deleted all 4 files from `src/components/`.
  - Also removed unrequested `FloatingCTA.tsx`.
- **Before / After Evidence**:
  - *Before*: 5 orphan components creating bundle overhead and ESLint unused variable warnings.
  - *After*: Repository clean; zero fabricated content; zero unrequested bundles.
- **Regression Check**: `npm run build` compiled cleanly without orphan component artifacts.

---

### Fix P1.1: Services Section SSR Hydration & Responsive Height (ISS-09)
- **Issue ID**: ISS-09 (High)
- **Root Cause**: `ServicesStack.tsx` previously evaluated `typeof window !== 'undefined' && window.innerWidth < 1024` on render and set inline `style={{ height: ... }}`, creating an SSR hydration mismatch and a 405vh empty black gap on mobile.
- **Diff Summary**:
  - Removed inline `style={{ height: ... }}` from `ServicesStack.tsx`.
  - Configured pure CSS responsive height in `src/app/globals.css`:
    ```css
    .services-section {
      min-height: auto;
    }
    @media (min-width: 1024px) {
      .services-section:not(.reduced-motion) {
        min-height: 405vh;
      }
    }
    ```
  - Added Motion `useReducedMotion()` hook for accessible fallbacks.
- **Before / After Evidence**:
  - *Before*: Mobile screenshot showed 405vh empty space below first card; hydration warning in console.
  - *After*: Mobile viewports render clean vertical stack without void or hydration warnings.
- **Regression Check**: Playwright viewport sweep passed at all phone sizes (320px–430px).

---

### Fix P1.2: Elimination of Nested Interactive A11y Violations (ISS-04)
- **Issue ID**: ISS-04 (High / WCAG 4.1.2)
- **Root Cause**: In `src/components/Vehicles.tsx`, `.vehicle-card` had `role="button"` and `tabIndex={0}` while containing a child `<button className="vehicle-request-btn">`, violating axe-core rule `nested-interactive`.
- **Diff Summary**:
  - Refactored `.vehicle-card` into a semantic non-interactive `<article>` container.
  - Separated collapsed toggle into a distinct `<button className="vehicle-collapsed-btn">`.
  - Updated "REQUEST VEHICLE" button with accessible label matching visible text: `aria-label="REQUEST VEHICLE — ${v.name}"` (WCAG 2.5.3).
- **Before / After Evidence**:
  - *Before*: Axe-core reported 2 serious `nested-interactive` violations on page load and modal open.
  - *After*: Axe-core reported **0 serious/critical violations** across Chromium, Firefox, and WebKit.
- **Regression Check**: Keyboard navigation and touch selection verified in `qa/a11y.spec.ts`.

---

### Fix P1.3: Watermark Ghost Number Color Contrast (ISS-05)
- **Issue ID**: ISS-05 (High / WCAG 1.4.3)
- **Root Cause**: `.service-card-number` watermark numbers had insufficient contrast ratio (1.29:1) on light cards.
- **Diff Summary**:
  - Added `aria-hidden="true"` to watermark ghost numbers.
  - Updated color tokens in `src/app/globals.css`:
    - `.tone-light .service-card-number`: `#767676` on white (contrast ratio **4.54:1**).
    - `.tone-magenta .service-card-number`: `rgba(255, 255, 255, 0.6)` on magenta (contrast ratio **4.5:1**).
- **Before / After Evidence**:
  - *Before*: Contrast ratio 1.29:1 (FAIL).
  - *After*: Contrast ratio >= 4.5:1 (PASS WCAG AA).
- **Regression Check**: Axe-core contrast audit passed with 0 violations.

---

### Fix P1.4: Mobile Horizontal Overflow & Heading Fluid Typography (ISS-06)
- **Issue ID**: ISS-06 (High)
- **Root Cause**: Fixed `font-size: 48px` on `#vehicles-heading` clipped at 320px. `.about-glass-item` padding (98px per column) overflowed 272px container. `.vehicles-row` with `min-width: 85vw` expanded scroll width.
- **Diff Summary**:
  - Added `overflow-x: clip;` to `.vehicles-section`.
  - Added fluid typography via `font-size: clamp(24px, 4.5vw, 48px)` with `word-break: break-word`.
  - Added `@media (max-width: 640px)` styles for `.about-glass-strip` and `.about-glass-item` to fit 320px viewport without horizontal overflow.
  - Hid decorative `.about-section::before` dot pattern on viewports <= 640px.
- **Before / After Evidence**:
  - *Before*: 320px document scroll width was **370px (50px overflow)**.
  - *After*: 320px document scroll width is **320px (0px overflow)**; 360px scroll width is **360px (0px overflow)**.
- **Regression Check**: Automated overflow test in `qa/gap-audit.spec.ts` reported `hasOverflow: false` across all tested browsers.

---

### Fix P1.5: Compiler State-in-Effect & ESLint Cleanliness (ISS-03, ISS-15)
- **Issue ID**: ISS-03, ISS-15 (High / Low)
- **Root Cause**: `QuoteModal.tsx:81` called synchronous `setState` inside `useEffect([isOpen])`. Unused variables existed across components.
- **Diff Summary**:
  - Removed synchronous `setState` inside effect; reset modal status in `handleClose` callback.
  - Wrapped `handleClose` in `useCallback` and added to keydown effect dependencies.
  - Removed unused imports and variables across all components.
  - Replaced `window.location.href = ...` with Next.js navigation in `Navbar.tsx`.
- **Before / After Evidence**:
  - *Before*: `npm run lint` failed with **1 error and 15 warnings**.
  - *After*: `npm run lint` passed with **0 errors and 0 warnings**.
- **Regression Check**: `npx tsc --noEmit` and `npm run build` passed with 0 errors.

---

### Fix P2.1: Legal Pages Implementation
- **Issue ID**: ISS-07 (High)
- **Root Cause**: Footer links to `/privacy` and `/terms` returned HTTP 404.
- **Diff Summary**:
  - Created `/src/app/privacy/page.tsx` with clear "REVIEW BY LEGAL BEFORE PUBLISHING" notice and authentic logistics data practices.
  - Created `/src/app/terms/page.tsx` with commercial carriage and vehicle placement terms.
- **Before / After Evidence**:
  - *Before*: `linkinator` detected 17 broken link occurrences on `/privacy` and `/terms`.
  - *After*: Both routes return HTTP 200; `linkinator` verified 164 links successfully with 0 internal broken links.
- **Regression Check**: Direct navigation and back-links verified in Playwright.

---

### Fix P2.2: SEO & Dynamic Metadata Infrastructure
- **Issue ID**: ISS-12, ISS-13 (Medium)
- **Root Cause**: Missing `metadataBase` in `layout.tsx`; missing `robots.txt` and `sitemap.xml`.
- **Diff Summary**:
  - Added `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')` to `layout.tsx`.
  - Created `src/app/robots.ts` and `src/app/sitemap.ts` dynamically reading `NEXT_PUBLIC_SITE_URL`.
- **Before / After Evidence**:
  - *Before*: Build produced warning `⚠ metadataBase property in metadata export is not set`.
  - *After*: Next.js build compiled with 0 warnings; `/robots.txt` and `/sitemap.xml` generated as valid static routes.
- **Regression Check**: Verified via production build page data collector.

---

### Fix P2.3: Security Headers & Print Stylesheet
- **Issue ID**: ISS-14, Resilience (Medium)
- **Root Cause**: Missing HTTP security headers in `next.config.ts`; fixed navbar visible in print mode.
- **Diff Summary**:
  - Added CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and X-Frame-Options in `next.config.ts`.
  - Added `@media print { nav, .navbar, .modal-overlay, .skip-to-main, .cta-banner { display: none !important; } }` in `globals.css`.
- **Before / After Evidence**:
  - *Before*: Security headers absent; navbar rendered on print preview.
  - *After*: Security headers returned on all HTTP responses; print emulation renders clean document without nav or overlay.
- **Regression Check**: Verified via Playwright print media emulation and headers check.
