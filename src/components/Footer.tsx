import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        {/* Col 1 — Brand */}
        <div>
          <Link href="/#hero" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }} aria-label={`${siteConfig.name} Home`}>
            <div className="footer-logo-tile">
              <Image
                src="/images/elshali-badge.webp"
                alt={`${siteConfig.name} Official Brand`}
                width={70}
                height={70}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
          <p className="footer-brand-desc">
            {siteConfig.description}
          </p>
          <div className="footer-brand-tag">
            PAN INDIA FREIGHT &amp; LOGISTICS
          </div>
        </div>

        {/* Col 2 — Company */}
        <div>
          <h3 className="footer-col-title">COMPANY</h3>
          <ul className="footer-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/company">Company Profile</Link></li>
            <li><Link href="/process">10-Step Process</Link></li>
            <li><Link href="/why-choose-us">Why Choose Us</Link></li>
            <li><Link href="/documentation">Transport Documentation</Link></li>
          </ul>
        </div>

        {/* Col 3 — Services */}
        <div>
          <h3 className="footer-col-title">SERVICES</h3>
          <ul className="footer-links">
            <li><Link href="/services">Cargo Solutions</Link></li>
            <li><Link href="/business-solutions">Business Solutions</Link></li>
            <li><Link href="/regular-transport">Regular &amp; Dedicated</Link></li>
            <li><Link href="/industrial">Industrial &amp; Machinery</Link></li>
            <li><Link href="/pan-india">Pan-India Network</Link></li>
            <li><Link href="/routes">Corridors &amp; Hubs</Link></li>
          </ul>
        </div>

        {/* Col 4 — Vehicles & Quote */}
        <div>
          <h3 className="footer-col-title">FLEET &amp; QUOTE</h3>
          <ul className="footer-links">
            <li><Link href="/vehicles">All Fleet Vehicles</Link></li>
            <li><Link href="/vehicles">Mini / Dost (1.5–2.5 T)</Link></li>
            <li><Link href="/vehicles">Tata Pickup (2.5–3.5 T)</Link></li>
            <li><Link href="/vehicles">Container (14–32 Ft)</Link></li>
            <li><Link href="/quote">Request a Transport Quote</Link></li>
          </ul>
        </div>

        {/* Col 5 — Contact */}
        <div>
          <h3 className="footer-col-title">CONTACT</h3>
          <div className="footer-contact-compact">
            <div className="footer-contact-header">
              <span className="footer-contact-name">{siteConfig.contactPerson}</span>
              <span className="footer-contact-gstin">GSTIN: {siteConfig.gstin}</span>
            </div>

            <div className="footer-contact-phone-wrap">
              <a href={`tel:${siteConfig.phone}`} className="footer-contact-primary-phone">
                +91 {siteConfig.phone}
              </a>
              <a
                href={`https://wa.me/91${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-whatsapp-badge"
                aria-label="Chat on WhatsApp"
              >
                WhatsApp
              </a>
            </div>

            <div className="footer-contact-alt">
              <span className="footer-alt-label">Alt:</span>{' '}
              <a href={`tel:${siteConfig.phone2}`}>{siteConfig.phone2}</a>
              <span className="footer-dot">·</span>
              <a href={`tel:${siteConfig.phone3}`}>{siteConfig.phone3}</a>
            </div>

            <div>
              <a href={`mailto:${siteConfig.email}`} className="footer-contact-email">
                {siteConfig.email}
              </a>
            </div>

            <address className="footer-contact-address">
              {siteConfig.address}
            </address>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
