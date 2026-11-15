/**
 * ELSHALI LOGISTICS Corporate Client Portfolio
 *
 * PROVENANCE & COMPLIANCE REGISTRY:
 * In accordance with Indian trademark law and business accuracy standards,
 * all client brands are defaulted to `verified: false` and `permissionConfirmed: false`.
 * Transporter contracts and written authorization must be reviewed and confirmed
 * by the owner before setting `verified: true` and `permissionConfirmed: true`.
 * Tracked in OWNER_ACTIONS.md.
 */

export interface ClientBrand {
  id: string;
  name: string;
  category: 'Automotive & Heavy' | 'Industrial Engineering' | 'Infrastructure & Steel' | 'Electronics & Power' | 'FMCG & Consumer';
  image: string;
  verified: boolean;
  permissionConfirmed: boolean;
}

export const allClients: ClientBrand[] = [
  // Industrial & Heavy
  { id: 'tata-motors', name: 'Tata Motors', category: 'Automotive & Heavy', image: '/client-logos/tata-motors.webp', verified: false, permissionConfirmed: false },
  { id: 'lt', name: 'Larsen & Toubro (L&T)', category: 'Industrial Engineering', image: '/client-logos/lt.webp', verified: false, permissionConfirmed: false },
  { id: 'ashok-leyland', name: 'Ashok Leyland', category: 'Automotive & Heavy', image: '/client-logos/ashok-leyland.webp', verified: false, permissionConfirmed: false },
  { id: 'bosch', name: 'Bosch', category: 'Industrial Engineering', image: '/client-logos/bosch.webp', verified: false, permissionConfirmed: false },
  { id: 'caterpillar', name: 'Caterpillar', category: 'Automotive & Heavy', image: '/client-logos/caterpillar.webp', verified: false, permissionConfirmed: false },
  { id: 'siemens', name: 'Siemens', category: 'Industrial Engineering', image: '/client-logos/siemens.webp', verified: false, permissionConfirmed: false },
  { id: 'mahindra', name: 'Mahindra', category: 'Automotive & Heavy', image: '/client-logos/mahindra.webp', verified: false, permissionConfirmed: false },
  { id: 'tvs', name: 'TVS Motor Company', category: 'Automotive & Heavy', image: '/client-logos/tvs.webp', verified: false, permissionConfirmed: false },
  { id: 'reliance', name: 'Reliance Industries', category: 'Electronics & Power', image: '/client-logos/reliance.webp', verified: false, permissionConfirmed: false },
  { id: 'samsung', name: 'Samsung', category: 'Electronics & Power', image: '/client-logos/samsung.webp', verified: false, permissionConfirmed: false },
  { id: 'hyundai', name: 'Hyundai', category: 'Automotive & Heavy', image: '/client-logos/hyundai.webp', verified: false, permissionConfirmed: false },
  { id: 'toshiba', name: 'Toshiba', category: 'Electronics & Power', image: '/client-logos/toshiba.webp', verified: false, permissionConfirmed: false },
  { id: 'schneider', name: 'Schneider Electric', category: 'Industrial Engineering', image: '/client-logos/schneider.webp', verified: false, permissionConfirmed: false },
  { id: 'abb', name: 'ABB', category: 'Industrial Engineering', image: '/client-logos/abb.webp', verified: false, permissionConfirmed: false },
  { id: 'kirloskar', name: 'Kirloskar', category: 'Industrial Engineering', image: '/client-logos/kirloskar.webp', verified: false, permissionConfirmed: false },

  // Manufacturing, Engineering & Energy
  { id: 'elgi', name: 'ELGi Equipments', category: 'Industrial Engineering', image: '/client-logos/elgi.webp', verified: false, permissionConfirmed: false },
  { id: 'lmw', name: 'Lakshmi Machine Works (LMW)', category: 'Industrial Engineering', image: '/client-logos/lmw.webp', verified: false, permissionConfirmed: false },
  { id: 'texmo', name: 'Texmo Pumps', category: 'Industrial Engineering', image: '/client-logos/texmo.webp', verified: false, permissionConfirmed: false },
  { id: 'cri-pumps', name: 'CRI Pumps', category: 'Industrial Engineering', image: '/client-logos/cri-pumps.webp', verified: false, permissionConfirmed: false },
  { id: 'roots', name: 'Roots Industries', category: 'Automotive & Heavy', image: '/client-logos/roots.webp', verified: false, permissionConfirmed: false },
  { id: 'pricol', name: 'Pricol Limited', category: 'Automotive & Heavy', image: '/client-logos/pricol.webp', verified: false, permissionConfirmed: false },
  { id: 'craftsman', name: 'Craftsman Automation', category: 'Automotive & Heavy', image: '/client-logos/craftsman.webp', verified: false, permissionConfirmed: false },
  { id: 'shanthi-gears', name: 'Shanthi Gears', category: 'Industrial Engineering', image: '/client-logos/shanthi-gears.webp', verified: false, permissionConfirmed: false },
  { id: 'suzlon', name: 'Suzlon Energy', category: 'Electronics & Power', image: '/client-logos/suzlon.webp', verified: false, permissionConfirmed: false },
  { id: 'bonfiglioli', name: 'Bonfiglioli', category: 'Industrial Engineering', image: '/client-logos/bonfiglioli.webp', verified: false, permissionConfirmed: false },
  { id: 'voith', name: 'Voith', category: 'Industrial Engineering', image: '/client-logos/voith.webp', verified: false, permissionConfirmed: false },
  { id: 'propel', name: 'Propel Industries', category: 'Industrial Engineering', image: '/client-logos/propel.webp', verified: false, permissionConfirmed: false },
  { id: 'rabwin', name: 'Rabwin Technologies', category: 'Industrial Engineering', image: '/client-logos/rabwin.webp', verified: false, permissionConfirmed: false },
  { id: 'watertec', name: 'Watertec', category: 'FMCG & Consumer', image: '/client-logos/watertec.webp', verified: false, permissionConfirmed: false },

  // Infrastructure, Steel & Materials
  { id: 'tata-steel', name: 'Tata Steel', category: 'Infrastructure & Steel', image: '/client-logos/tata-steel.webp', verified: false, permissionConfirmed: false },
  { id: 'jsw', name: 'JSW Steel', category: 'Infrastructure & Steel', image: '/client-logos/jsw.webp', verified: false, permissionConfirmed: false },
  { id: 'jindal', name: 'Jindal Steel & Power', category: 'Infrastructure & Steel', image: '/client-logos/jindal.webp', verified: false, permissionConfirmed: false },
  { id: 'ultratech', name: 'UltraTech Cement', category: 'Infrastructure & Steel', image: '/client-logos/ultratech.webp', verified: false, permissionConfirmed: false },
  { id: 'acc', name: 'ACC Limited', category: 'Infrastructure & Steel', image: '/client-logos/acc.webp', verified: false, permissionConfirmed: false },
  { id: 'saint-gobain', name: 'Saint-Gobain', category: 'Infrastructure & Steel', image: '/client-logos/saint-gobain.webp', verified: false, permissionConfirmed: false },
  { id: 'asian-paints', name: 'Asian Paints', category: 'Infrastructure & Steel', image: '/client-logos/asian-paints.webp', verified: false, permissionConfirmed: false },
  { id: 'berger', name: 'Berger Paints', category: 'Infrastructure & Steel', image: '/client-logos/berger.webp', verified: false, permissionConfirmed: false },

  // FMCG, Consumer & Packaging
  { id: 'hul', name: 'Hindustan Unilever', category: 'FMCG & Consumer', image: '/client-logos/hul.webp', verified: false, permissionConfirmed: false },
  { id: 'itc', name: 'ITC Limited', category: 'FMCG & Consumer', image: '/client-logos/itc.webp', verified: false, permissionConfirmed: false },
  { id: 'britannia', name: 'Britannia Industries', category: 'FMCG & Consumer', image: '/client-logos/britannia.webp', verified: false, permissionConfirmed: false },
  { id: 'nestle', name: 'Nestlé', category: 'FMCG & Consumer', image: '/client-logos/nestle.webp', verified: false, permissionConfirmed: false },
  { id: 'dabur', name: 'Dabur India', category: 'FMCG & Consumer', image: '/client-logos/dabur.webp', verified: false, permissionConfirmed: false },
  { id: 'titan', name: 'Titan Company', category: 'FMCG & Consumer', image: '/client-logos/titan.webp', verified: false, permissionConfirmed: false },
  { id: 'havells', name: 'Havells', category: 'Electronics & Power', image: '/client-logos/havells.webp', verified: false, permissionConfirmed: false },
  { id: 'v-guard', name: 'V-Guard', category: 'Electronics & Power', image: '/client-logos/v-guard.webp', verified: false, permissionConfirmed: false },
  { id: 'panasonic', name: 'Panasonic', category: 'Electronics & Power', image: '/client-logos/panasonic.webp', verified: false, permissionConfirmed: false },
  { id: 'lg', name: 'LG Electronics', category: 'Electronics & Power', image: '/client-logos/lg.webp', verified: false, permissionConfirmed: false },
  { id: 'suguna', name: 'Suguna Foods', category: 'FMCG & Consumer', image: '/client-logos/suguna.webp', verified: false, permissionConfirmed: false },
  { id: 'yes-square', name: 'Yes Square Marketing', category: 'FMCG & Consumer', image: '/client-logos/yes-square.webp', verified: false, permissionConfirmed: false },
];

/**
 * Filtered array containing only client brands that have been verified with written transporter authorization.
 */
export const verifiedClients: ClientBrand[] = allClients.filter(
  (c) => c.verified && c.permissionConfirmed
);
