import { Truck, Home, Phone, ArrowRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/data/site';

export default function NotFound() {
  return (
    <div className="subpage-wrapper" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '100px' }}>
      <PageHero
        badge="404 — Route Not Found"
        badgeIcon={<Truck size={14} />}
        title="Destination Route"
        highlight="Not Found"
        subtitle={`The freight page or link you requested cannot be located. Let ${siteConfig.name} guide you back to our active transport corridors.`}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '28px' }}>
          <Button href="/" variant="primary" size="lg">
            <Home size={16} /> Return to Home
          </Button>
          <Button href="/services" variant="outline" size="lg">
            Our Services <ArrowRight size={16} />
          </Button>
          <Button href="/contact" variant="dark" size="lg">
            <Phone size={16} /> Contact Dispatch
          </Button>
        </div>
      </PageHero>
    </div>
  );
}
