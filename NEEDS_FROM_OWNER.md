# ELSHALI LOGISTICS — Owner Verification & Production Checklist

Verified business information from the official visiting card (**ARUN KUMAR / ELSHALI LOGISTICS AND TRANSPORT**) and corporate customer portfolio has been integrated into the codebase.

The following items require explicit owner confirmation or input before final production deployment.

---

## 1. Production Hosting & Lead Persistence (CRITICAL)

### Hosting Architecture & Lead Delivery
All form submissions are guarded to prevent lead loss:
- **Serverless Hosting (Vercel, Netlify, AWS Lambda)**:
  - Local disk storage (`data/leads.jsonl`) is **ephemeral** on serverless runtimes — container restarts wipe local files.
  - **Requirement**: You MUST configure an external lead persistence channel:
    - **Google Sheets Webhook**: Set `LEAD_WEBHOOK_URL=https://script.google.com/macros/s/.../exec`
    - **Telegram Bot Dispatch**: Set `TELEGRAM_BOT_TOKEN=xxx` and `TELEGRAM_CHAT_ID=yyy`
    - **Resend Email**: Set `RESEND_API_KEY=re_xxx` and `CONTACT_EMAIL=elshalilogistics@gmail.com`
- **VPS / Stateful Container (DigitalOcean, AWS EC2, Dedicated VM)**:
  - `data/leads.jsonl` persists safely on the disk volume.

---

## 2. Production Domain Confirmation

- **Current Default**: `https://www.elshali.com` (matches the URL printed on Arun Kumar's visiting card).
- **Owner Action**: Confirm your preferred domain for DNS routing:
  - **Option A**: `https://www.elshali.com` (Recommended — matches visiting card)
  - **Option B**: `https://elshali.com` (Apex domain)
  - **Option C**: Custom domain of your choice
- Once confirmed, set `NEXT_PUBLIC_SITE_URL` in your hosting dashboard.

---

## 3. Legal & Statutory Review of Terms & Privacy (MANDATORY)

- **Current Status**: `/terms` and `/privacy` feature standard commercial road freight operating guidelines with a visible legal review disclaimer banner.
- **Owner Action**: Have legal counsel or a chartered accountant review:
  1. [Terms of Carriage](/terms): Goods carriage liability limits under the *Carriage by Road Act 2007*, detention charges, demurrage, loading/unloading obligations, and transit insurance requirements.
  2. [Privacy Policy](/privacy): Data handling, customer records, and WhatsApp notification consent under the *Digital Personal Data Protection (DPDP) Act 2023*.
- **Note**: The disclaimer banner will be replaced with a neutral "Last Updated: November 2026" date once you confirm your approved text.

---

## 4. Corporate Client Logos — Written Permission TODO

- **Current Portfolio**: 50 industrial and multinational brands (Tata Motors, L&T, Ashok Leyland, Bosch, Siemens, Caterpillar, Mahindra, TVS, Reliance, Samsung, etc.).
- **Provenance**: Extracted from Arun Kumar's physical office board ("Building Stronger Partnerships for a Growing India") and published Justdial portfolio photos.
- **Legal Compliance Action**: Ensure written transporter agreement or brand usage consent exists for public marketing usage to prevent trademark disputes.

---

## 5. Coimbatore to Chennai Corridor Claims — Awaiting Owner Sign-Off

The dedicated corridor landing page (`/routes/coimbatore-to-chennai`) currently shows only verified owner facts (registered hub at Kondaswamy Nagar, GSTIN, LR handling, FTL carriage). The following operational claims are standard industry figures awaiting your exact confirmation before being published to the live page:

| Operational Dimension | Industry Assumed Value | Owner Verified? | Notes |
| :--- | :--- | :---: | :--- |
| **Corridor Distance** | ~510 KM via NH 544 & NH 48 | ⏳ Awaiting confirmation | Standard NHAI arterial highway route |
| **Average Transit Duration** | 10 – 14 Hours (Overnight FTL) | ⏳ Awaiting confirmation | Depends on vehicle type and checkpost clearance |
| **Payload Capacity Range** | 1 MT to 40 MT Dedicated | ⏳ Awaiting confirmation | Fleet capability limit |
| **Coimbatore Hubs** | Kurichi SIDCO, Ganapathy, Peelamedu, Thudiyalur | ⏳ Awaiting confirmation | SMT Casting Line / Kondaswamy Nagar is verified |
| **Chennai Delivery Zones** | Sriperumbudur, Ambattur, Guindy, Madhavaram, Port CFS | ⏳ Awaiting confirmation | Target delivery zones |
| **Vehicle Types Dedicated** | 14ft–19ft LCV, 24ft–32ft MXL, Multi-Axle Trailers | ⏳ Awaiting confirmation | Vehicle models deployed |

---

## 6. Social Profiles & Google Knowledge Graph (`sameAs`)

- Provide your Google Maps Business profile URL, LinkedIn company page, and Facebook page to link with the root schema `sameAs` array for Google local search indexing.
