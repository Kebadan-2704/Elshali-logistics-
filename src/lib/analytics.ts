export type AnalyticsEvent =
  | { name: 'form_submit_contact'; params?: Record<string, unknown> }
  | { name: 'form_submit_quote'; params?: Record<string, unknown> }
  | { name: 'click_to_call'; params: { phone: string; source?: string } }
  | { name: 'click_whatsapp'; params: { phone: string; source?: string } }
  | { name: 'view_partnership_board'; params?: Record<string, unknown> };

type AnalyticsFn = (...args: unknown[]) => void;

/**
 * Universal analytics event dispatcher supporting Google Analytics (gtag),
 * Plausible, and custom DOM events.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  // 1. Google Analytics 4 (gtag)
  const win = window as unknown as { gtag?: AnalyticsFn; plausible?: AnalyticsFn };
  if (typeof win.gtag === 'function') {
    win.gtag('event', event.name, event.params || {});
  }

  // 2. Plausible Analytics
  if (typeof win.plausible === 'function') {
    win.plausible(event.name, { props: event.params || {} });
  }

  // 3. Custom DOM event for local debugging or listeners
  try {
    window.dispatchEvent(new CustomEvent('elshali:analytics', { detail: event }));
  } catch {
    // Ignore environments where CustomEvent is restricted
  }
}
