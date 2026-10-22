import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ELSALI LOGISTICS',
  description: 'Terms and Conditions governing freight transport, vehicle placement, and commercial carriage with ELSALI LOGISTICS.',
};

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--color-navy-950)', minHeight: '100vh', padding: '120px 24px 80px', color: 'white' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--color-pink-400)',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(184, 0, 109, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pink-400)' }}>
            <FileCheck size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Terms &amp; Conditions</h1>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 12, padding: '12px 16px', marginBottom: 32, color: 'var(--color-slate-400)', fontSize: 13 }}>
          <strong>NOTE:</strong> DRAFT TEMPLATE FOR ELSALI LOGISTICS — REVIEW BY LEGAL BEFORE PUBLISHING.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontSize: 15, lineHeight: 1.7, color: 'var(--color-slate-300)' }}>
          <section>
            <h2 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>1. Carriage &amp; Service Agreement</h2>
            <p>
              By booking freight carriage or requesting commercial vehicle placement with ELSALI LOGISTICS, the consignor/shipper agrees to the operating terms set forth herein. ELSALI LOGISTICS provides LCV and HCV freight transportation solutions across regional Tamil Nadu corridors and pan-India transit networks.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>2. Quotations &amp; Freight Rates</h2>
            <p>
              Freight rate quotes provided via our online quote portal or dispatch phone lines are estimates based on declared cargo weight, vehicle category, loading dates, and route distances. Rates are confirmed upon vehicle placement and consignment note issuance. Toll charges, loading/unloading detention fees, and statutory entry permits are charged per actuals.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>3. Shippers Declaration &amp; Cargo Legality</h2>
            <p>
              The consignor is strictly responsible for ensuring cargo contents comply with Indian Motor Vehicles Act, Central GST/e-Way Bill statutory requirements, and state commercial transport regulations. Hazardous, contraband, or undeclared goods are strictly prohibited.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>4. Limitation of Liability</h2>
            <p>
              While ELSALI LOGISTICS exercises utmost commercial diligence in vehicle maintenance, verified driver allocation, and transit safety, transit times are subject to highway conditions and statutory checkposts. Cargo transit insurance is recommended for all high-value consignments.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
