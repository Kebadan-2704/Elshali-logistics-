import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        {/* Col 1 — Brand */}
        <div>
          <a href="#hero" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: 80,
              height: 63,
              borderRadius: 12,
              overflow: 'hidden',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Image
                src="/images/elsali-logo.webp"
                alt="ELSALI LOGISTICS"
                width={80}
                height={63}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </a>
          <p className="footer-brand-desc">
            {siteConfig.description}
          </p>
          <div className="footer-brand-tag">
            PAN INDIA TRANSPORTATION SERVICES
          </div>
        </div>

        {/* Col 2 — Company */}
        <div>
          <h4 className="footer-col-title">COMPANY</h4>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#why-choose-us">Why Choose Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Col 3 — Services */}
        <div>
          <h4 className="footer-col-title">SERVICES</h4>
          <ul className="footer-links">
            <li><a href="#services">LCV Transportation</a></li>
            <li><a href="#services">HCV Transportation</a></li>
            <li><a href="#services">Mini Truck / Pickup</a></li>
            <li><a href="#services">Container Transport</a></li>
            <li><a href="#services">Part Load / Full Load</a></li>
          </ul>
        </div>

        {/* Col 4 — Vehicles */}
        <div>
          <h4 className="footer-col-title">VEHICLES</h4>
          <ul className="footer-links">
            <li><span>Mini / Dost</span></li>
            <li><span>Tata Pickup</span></li>
            <li><span>14 Ft / 17 Ft</span></li>
            <li><span>20 Ft / 24 Ft</span></li>
            <li><span>26 Ft / 32 Ft SXL/MXL</span></li>
          </ul>
        </div>

        {/* Col 5 — Contact */}
        <div>
          <h4 className="footer-col-title">CONTACT</h4>
          <ul className="footer-links">
            <li>
              <span className="footer-contact-label">Phone</span><br />
              <a href={`tel:${siteConfig.phone}`} className="footer-contact-value">{siteConfig.phone}</a>
            </li>
            <li>
              <span className="footer-contact-label">WhatsApp</span><br />
              <a
                href={`https://wa.me/91${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-value"
              >
                {siteConfig.whatsapp}
              </a>
            </li>
            <li>
              <span className="footer-contact-label">Email</span><br />
              <a href={`mailto:${siteConfig.email}`} className="footer-contact-value">{siteConfig.email}</a>
            </li>
            <li>
              <span className="footer-contact-label">Address</span><br />
              <span className="footer-contact-value">{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ELSALI LOGISTICS. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
