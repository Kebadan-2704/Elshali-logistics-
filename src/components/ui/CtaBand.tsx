import React from 'react';
import { Truck, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import Button from './Button';
import { siteConfig } from '@/data/site';

interface CtaBandProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function CtaBand({
  title = 'Need a Reliable Commercial Vehicle for Your Next Shipment?',
  description = 'Share your pickup, delivery, and cargo requirements with us. Our commercial dispatch team coordinates placement and provides competitive market freight rates.',
  className = '',
}: CtaBandProps) {
  return (
    <section className={`cta-section ${className}`}>
      <div className="subpage-container">
        <div className="cta-icon" aria-hidden="true">
          <Truck size={28} />
        </div>
        <h2 className="cta-title">
          {title.includes('Shipment') ? (
            <>
              Need a Vehicle for Your <span className="highlight">Next Shipment?</span>
            </>
          ) : (
            title
          )}
        </h2>
        <p className="cta-text">{description}</p>
        <div className="cta-actions">
          <Button href="/quote" variant="primary" size="lg">
            Get Freight Quote <ArrowRight size={16} />
          </Button>
          <Button href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} variant="outline" size="lg">
            <Phone size={16} /> Call Dispatch ({siteConfig.phone})
          </Button>
          <Button
            href={`https://wa.me/91${siteConfig.whatsapp}`}
            variant="outline"
            size="lg"
            external
            style={{ color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.4)' }}
          >
            <MessageSquare size={16} /> WhatsApp Dispatch
          </Button>
        </div>
      </div>
    </section>
  );
}

