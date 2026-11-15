import fs from 'fs';
import path from 'path';
import os from 'os';
import { siteConfig } from '@/data/site';

export interface LeadRecord {
  id: string;
  referenceId: string;
  type: 'contact' | 'quote';
  timestamp: string;
  data: Record<string, unknown>;
  ip?: string;
  channels: {
    resend?: boolean;
    telegram?: boolean;
    webhook?: boolean;
    diskSecondary?: boolean;
  };
}

export interface DispatchResult {
  success: boolean;
  leadId: string;
  referenceId: string;
  channels: {
    resend: boolean;
    telegram: boolean;
    webhook: boolean;
    diskSecondary: boolean;
  };
  attemptedDurableCount: number;
  successfulDurableCount: number;
  error?: string;
  fallbackContact: {
    phone: string;
    whatsapp: string;
  };
}

let hasLoggedConfigWarning = false;

/**
 * Boot-time check for lead persistence configuration.
 * Warns loudly in production if no durable channels are configured.
 * Only aborts the build if STRICT_LEAD_CONFIG=true.
 */
export function checkLeadConfigurationAtBoot(): { hasConfiguredChannels: boolean } {
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasTelegram = Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
  const hasWebhook = Boolean(process.env.LEAD_WEBHOOK_URL);
  const hasConfiguredChannels = hasResend || hasTelegram || hasWebhook;

  if (process.env.NODE_ENV === 'production' && !hasConfiguredChannels && !hasLoggedConfigWarning) {
    hasLoggedConfigWarning = true;
    console.error(`
================================================================================
[LEAD CAPTURE CONFIG WARNING] NO DURABLE LEAD CHANNELS CONFIGURED!
Neither RESEND_API_KEY, TELEGRAM_BOT_TOKEN+TELEGRAM_CHAT_ID, nor LEAD_WEBHOOK_URL
are configured in environment variables.
In production, incoming quote and contact forms will return HTTP 503 fallback
to prevent silent lead loss.
Set at least one durable channel in your hosting dashboard or .env.production.
================================================================================`);

    if (process.env.STRICT_LEAD_CONFIG === 'true') {
      throw new Error('[FATAL LEAD_STORE CONFIG ERROR] STRICT_LEAD_CONFIG=true: Build aborted because no durable lead channels are configured.');
    }
  }

  return { hasConfiguredChannels };
}

// Run boot check once in server environments
if (typeof window === 'undefined') {
  checkLeadConfigurationAtBoot();
}

/**
 * Legacy config validator helper for tests and backwards compatibility.
 */
export function validateLeadStoreConfig(): { valid: boolean; hasConfiguredChannels: boolean } {
  const res = checkLeadConfigurationAtBoot();
  if (process.env.NODE_ENV === 'production' && !res.hasConfiguredChannels && process.env.STRICT_LEAD_CONFIG === 'true') {
    throw new Error('FATAL LEAD_STORE CONFIG ERROR: No durable channels configured in production.');
  }
  return { valid: res.hasConfiguredChannels, hasConfiguredChannels: res.hasConfiguredChannels };
}

/**
 * Channel 1: Resend Email Notification
 */
async function dispatchResend(record: LeadRecord): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.LEAD_EMAIL_TO || process.env.CONTACT_EMAIL || siteConfig.email;
  const from = process.env.LEAD_EMAIL_FROM || 'ELSHALI Freight Desk <onboarding@resend.dev>';
  const subject =
    record.type === 'quote'
      ? `[QUOTE #${record.referenceId}] ${record.data.pickupLocation || 'Origin'} ➔ ${record.data.deliveryLocation || 'Destination'} (${record.data.vehicleType || 'Vehicle'})`
      : `[CONTACT #${record.referenceId}] New Inquiry from ${record.data.name || 'Website Visitor'}`;

  const rows = Object.entries(record.data)
    .filter(([k]) => k !== 'website')
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;border:1px solid #e2e8f0;text-transform:capitalize;">${k}</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${String(v)}</td></tr>`)
    .join('');

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
      <h2 style="color:#b8006d;border-bottom:2px solid #ec4899;padding-bottom:8px;">
        New ${record.type === 'quote' ? 'Freight Rate Quote Request' : 'Customer Contact Inquiry'}
      </h2>
      <p><strong>Reference ID:</strong> ${record.referenceId}</p>
      <p><strong>Lead ID:</strong> ${record.id}</p>
      <p><strong>Timestamp:</strong> ${record.timestamp}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:20px;font-size:12px;color:#64748b;">
        Delivered automatically by ELSHALI LOGISTICS Lead Dispatch Engine.
      </p>
    </div>
  `;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html }),
      signal: controller.signal,
    });
    return res.ok;
  } catch (err) {
    console.error('[LEAD_STORE] Resend dispatch error:', err);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Channel 2: Telegram Bot Notification
 */
async function dispatchTelegram(record: LeadRecord): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return false;

  let text = `🚚 *NEW ${record.type.toUpperCase()} LEAD — ELSHALI LOGISTICS*\n\n`;
  text += `🔖 *Ref ID:* \`${record.referenceId}\`\n`;
  text += `📅 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n`;

  const d = record.data;
  if (d.name || d.fullName) text += `👤 *Name:* ${d.name || d.fullName}\n`;
  if (d.companyName) text += `🏢 *Company:* ${d.companyName}\n`;
  if (d.phone) text += `📞 *Phone:* ${d.phone}\n`;
  if (d.email) text += `✉️ *Email:* ${d.email}\n`;
  if (d.pickupLocation) text += `📍 *Route:* ${d.pickupLocation} ➔ ${d.deliveryLocation || 'N/A'}\n`;
  if (d.vehicleType) text += `🚛 *Vehicle:* ${d.vehicleType}\n`;
  if (d.weight) text += `⚖️ *Weight:* ${d.weight}\n`;
  if (d.materialType) text += `📦 *Material:* ${d.materialType}\n`;
  if (d.requiredDate) text += `🗓️ *Date:* ${d.requiredDate}\n`;
  if (d.message) text += `💬 *Message:* ${d.message}\n`;
  if (d.additionalDetails) text += `📝 *Details:* ${d.additionalDetails}\n`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
      signal: controller.signal,
    });
    return res.ok;
  } catch (err) {
    console.error('[LEAD_STORE] Telegram dispatch error:', err);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Channel 3: Generic Webhook (Google Sheets Apps Script, CRM, etc.)
 */
async function dispatchWebhook(record: LeadRecord): Promise<boolean> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      signal: controller.signal,
    });
    return res.ok;
  } catch (err) {
    console.error('[LEAD_STORE] Webhook dispatch error:', err);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Secondary non-authoritative local disk logging (best-effort, never crashes).
 */
function recordSecondaryDiskLog(record: LeadRecord, targetFileOverride?: string): boolean {
  try {
    // In dev use project data folder; in production or serverless use os.tmpdir()
    const targetFile =
      targetFileOverride ||
      (process.env.NODE_ENV !== 'production'
        ? path.join(process.cwd(), 'data', 'leads.jsonl')
        : path.join(os.tmpdir(), 'elshali_leads.jsonl'));

    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.appendFileSync(targetFile, JSON.stringify(record) + '\n', 'utf8');
    return true;
  } catch {
    // EROFS or filesystem restriction ignored safely
    return false;
  }
}

/**
 * Core Lead Dispatcher:
 * Dispatches to all configured durable channels via Promise.allSettled.
 * Responds 200 ONLY if at least one durable channel succeeded.
 * Otherwise returns a clear fallback error with direct phone/WhatsApp details.
 */
export async function dispatchLead(
  type: 'contact' | 'quote',
  data: Record<string, unknown>,
  ip?: string,
  testOverrides?: {
    mockResend?: boolean;
    mockTelegram?: boolean;
    mockWebhook?: boolean;
    targetFile?: string;
  }
): Promise<DispatchResult> {
  const timestamp = new Date().toISOString();
  const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const referenceId = `ELS-${Date.now().toString().slice(-6)}`;

  const record: LeadRecord = {
    id,
    referenceId,
    type,
    timestamp,
    data,
    ip: ip ? ip.replace(/:\d+$/, '') : 'unknown',
    channels: {},
  };

  // 1. Secondary non-authoritative disk write (best effort)
  const diskOk = recordSecondaryDiskLog(record, testOverrides?.targetFile);
  record.channels.diskSecondary = diskOk;

  // 2. Identify configured durable channels
  const hasResend = testOverrides?.mockResend !== undefined || Boolean(process.env.RESEND_API_KEY);
  const hasTelegram = testOverrides?.mockTelegram !== undefined || Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
  const hasWebhook = testOverrides?.mockWebhook !== undefined || Boolean(process.env.LEAD_WEBHOOK_URL);

  let attemptedDurableCount = 0;
  if (hasResend) attemptedDurableCount++;
  if (hasTelegram) attemptedDurableCount++;
  if (hasWebhook) attemptedDurableCount++;

  // 3. Dispatch in parallel with Promise.allSettled
  const [resendRes, telegramRes, webhookRes] = await Promise.allSettled([
    testOverrides?.mockResend !== undefined
      ? Promise.resolve(testOverrides.mockResend)
      : dispatchResend(record),
    testOverrides?.mockTelegram !== undefined
      ? Promise.resolve(testOverrides.mockTelegram)
      : dispatchTelegram(record),
    testOverrides?.mockWebhook !== undefined
      ? Promise.resolve(testOverrides.mockWebhook)
      : dispatchWebhook(record),
  ]);

  const resendOk = resendRes.status === 'fulfilled' && resendRes.value === true;
  const telegramOk = telegramRes.status === 'fulfilled' && telegramRes.value === true;
  const webhookOk = webhookRes.status === 'fulfilled' && webhookRes.value === true;

  record.channels.resend = resendOk;
  record.channels.telegram = telegramOk;
  record.channels.webhook = webhookOk;

  let successfulDurableCount = 0;
  if (resendOk) successfulDurableCount++;
  if (telegramOk) successfulDurableCount++;
  if (webhookOk) successfulDurableCount++;

  const durableSuccess = successfulDurableCount > 0;

  if (durableSuccess) {
    return {
      success: true,
      leadId: id,
      referenceId,
      channels: {
        resend: resendOk,
        telegram: telegramOk,
        webhook: webhookOk,
        diskSecondary: diskOk,
      },
      attemptedDurableCount,
      successfulDurableCount,
      fallbackContact: {
        phone: siteConfig.phone,
        whatsapp: siteConfig.whatsapp,
      },
    };
  }

  // All durable channels failed or none configured
  console.error(`[LEAD_STORE CRITICAL] Lead ${id} (${referenceId}) could not be delivered to any durable channel. Attempted: ${attemptedDurableCount}, Succeeded: 0.`);

  return {
    success: false,
    leadId: id,
    referenceId,
    channels: {
      resend: false,
      telegram: false,
      webhook: false,
      diskSecondary: diskOk,
    },
    attemptedDurableCount,
    successfulDurableCount: 0,
    error: `Our automated dispatch desk is temporarily unavailable. Please connect directly with our dispatch team at +91 ${siteConfig.phone} or via WhatsApp for immediate vehicle placement.`,
    fallbackContact: {
      phone: siteConfig.phone,
      whatsapp: siteConfig.whatsapp,
    },
  };
}
