'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { trackEvent } from '@/lib/analytics';

export default function FloatingContact() {
  const handleCall = () => {
    trackEvent({ name: 'click_to_call', params: { phone: siteConfig.phone, source: 'floating_pill' } });
  };

  const handleWhatsApp = () => {
    trackEvent({ name: 'click_whatsapp', params: { phone: siteConfig.whatsapp, source: 'floating_pill' } });
  };

  return (
    <aside
      className="floating-contact-container"
      aria-label="Direct Quick Contact Options"
    >
      <div className="floating-contact-pill">
        {/* Call Button */}
        <a
          href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
          onClick={handleCall}
          className="floating-btn floating-call-btn"
          aria-label={`Call ELSHALI dispatch at +91 ${siteConfig.phone}`}
          title={`Call +91 ${siteConfig.phone}`}
        >
          <Phone size={17} />
          <span className="floating-label">Call</span>
        </a>

        <div className="floating-divider" />

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/91${siteConfig.whatsapp}?text=${encodeURIComponent(
            `Hello ${siteConfig.name}, I need an instant freight quote for truck transportation.`
          )}`}
          onClick={handleWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-wa-btn"
          aria-label="Chat with ELSHALI on WhatsApp"
          title="WhatsApp Dispatch"
        >
          <MessageCircle size={17} />
          <span className="floating-label">WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}

