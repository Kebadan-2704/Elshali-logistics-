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
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/company">Company Profile</Link></li>
            <li><Link href="/process">10-Step Process</Link></li>
            <li><Link href="/why-choose-us">Why Choose Us</Link></li>
            <li><Link href="/documentation">Transport Documentation</Link></li>
          </ul>
        </div>

        {/* Col 3 — Services */}
        <div>
          <h4 className="footer-col-title">SERVICES</h4>
          <ul className="footer-links">
            <li><Link href="/services">LCV &amp; HCV Freight</Link></li>
            <li><Link href="/business-solutions">Business Solutions</Link></li>
            <li><Link href="/regular-transport">Regular &amp; Dedicated</Link></li>
            <li><Link href="/industrial">Industrial &amp; Machinery</Link></li>
            <li><Link href="/pan-india">Pan-India Network</Link></li>
            <li><Link href="/routes">Corridors &amp; Hubs</Link></li>
          </ul>
        </div>

        {/* Col 4 — Vehicles & Quote */}
        <div>
          <h4 className="footer-col-title">FLEET &amp; QUOTE</h4>
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
          <h4 className="footer-col-title">CONTACT</h4>
          <ul className="footer-links">
            <li>
              <span className="footer-contact-label">Contact Person</span><br />
              <span className="footer-contact-value">{siteConfig.contactPerson}</span>
            </li>
            <li>
              <span className="footer-contact-label">Phone</span><br />
              <a href={`tel:${siteConfig.phone}`} className="footer-contact-value">{siteConfig.phone}</a>
            </li>
            <li>
              <span className="footer-contact-label">Additional Numbers</span><br />
              <a href={`tel:${siteConfig.phone2}`} className="footer-contact-value">{siteConfig.phone2}</a><br />
              <a href={`tel:${siteConfig.phone3}`} className="footer-contact-value">{siteConfig.phone3}</a><br />
              <a href={`tel:${siteConfig.phone4}`} className="footer-contact-value">{siteConfig.phone4}</a><br />
              <a href={`tel:${siteConfig.phone5}`} className="footer-contact-value">{siteConfig.phone5}</a>
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
              <span className="footer-contact-label">GSTIN</span><br />
              <span className="footer-contact-value">{siteConfig.gstin}</span>
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
