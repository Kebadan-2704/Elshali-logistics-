# 📋 ELSHALI LOGISTICS — Owner Decisions & Verification Registry

This file tracks every operational, legal, and business parameter that requires explicit confirmation or input from the business owner (**ARUN KUMAR / ELSHALI LOGISTICS AND TRANSPORT**).

---

## 1. Domain & DNS Confirmation (Phase 0)
- **Current Canonical Default**: `https://www.elshali.com` (matches visiting card).
- **Alternative in .env.example**: `https://elsalilogistics.com`.
- **Owner Action**: Confirm whether `https://www.elshali.com` or `https://elshali.com` or another domain is the primary canonical URL for DNS hosting.
- **Config Variable**: Set `NEXT_PUBLIC_SITE_URL` in production hosting environment variables.

---

## 2. Lead Capture & Notification Channels (Phase 1)
- **Owner Action**: Configure at least one durable external notification channel to ensure inquiries reach your phone immediately:
  1. **Telegram Bot (Instant & Free)**:
     - Provide `TELEGRAM_BOT_TOKEN` (from @BotFather)
     - Provide `TELEGRAM_CHAT_ID` (your private chat ID)
  2. **Google Sheets Webhook**:
     - Provide `LEAD_WEBHOOK_URL` (Google Apps Script web app endpoint)
  3. **Resend Email API**:
     - Provide `RESEND_API_KEY` (from resend.com)
     - Confirm `LEAD_EMAIL_TO` (default: `elshalilogistics@gmail.com`)
     - Confirm `LEAD_EMAIL_FROM` (e.g. `dispatch@elshali.com` once custom domain is verified)

---

## 3. AI Dispatch Chatbot LLM Provider (Phase 2)
- **Current Status**: Third-party untrusted worker has been removed for customer data security.
- **Owner Action**: Decide whether to activate the AI dispatch chatbot:
  - If YES: Choose an LLM provider and supply `LLM_PROVIDER` (`openai` | `anthropic` | `gemini`), `LLM_API_KEY`, and `LLM_MODEL`.
  - If NO: Leave `LLM_API_KEY` empty; the widget will cleanly display direct phone/WhatsApp dispatch links.

---

## 4. Corporate Client Logos & Proof of Work (Phase 7)
- **Current Status**: All unverified brand logos have been gated by `verified: false`.
- **Owner Action**: In accordance with Indian trademark law and business accuracy, confirm written transporter permission or authorized vendor invoices for each client brand before re-enabling `verified: true` in `src/data/clients.ts`.
- **Full Brand List Awaiting Written Confirmation**:
  Tata Motors, L&T, Ashok Leyland, Bosch, Caterpillar, Siemens, Mahindra, TVS, Reliance, Samsung, Hyundai, Toshiba, Schneider Electric, ABB, Kirloskar, ELGi, LMW, Texmo, CRI Pumps, Roots, Pricol, Craftsman, Shanthi Gears, Suzlon, Bonfiglioli, Voith, Propel, Rabwin, Watertec, Tata Steel, JSW Steel, Jindal, UltraTech, ACC, Saint-Gobain, Asian Paints, Berger, Hindustan Unilever, ITC, Britannia, Nestlé, Dabur, Titan, Havells, V-Guard, Panasonic, LG, Suguna Foods, Yes Square Marketing.

---

## 5. Legal & Statutory Review of Terms & Privacy (Phase 7)
- **Terms of Carriage (`/terms`)**: Have legal counsel review goods carriage liability limits under the *Carriage by Road Act 2007*, demurrage, loading/unloading obligations, and transit insurance requirements.
- **Privacy Policy (`/privacy`)**: Confirm DPDP Act 2023 compliance, customer record retention limits, and data protection grievance contact.
- **Action**: Once counsel approves, set `LEGAL_REVIEWED = true` in `src/data/site.ts`.

---

## 6. Social Profiles & Google Knowledge Graph (`sameAs`)
- **Owner Action**: Provide verified URLs for:
  - Google Business Profile (Google Maps)
  - LinkedIn Company Page
  - Justdial Profile
- **Action**: Populate the `sameAs` array in `src/data/site.ts`.

---

## 7. Rate Card & Transit Timings
- **Owner Action**: Provide verified standard rate benchmarks if an automated freight estimator should be deployed in future releases.

