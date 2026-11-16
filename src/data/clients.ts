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
  { id: 'tata-motors', name: 'Tata Motors', category: 'Automotive & Heavy', image: '/client-logos/tata-motors.webp', verified: true, permissionConfirmed: true },
  { id: 'lt', name: 'Larsen & Toubro (L&T)', category: 'Industrial Engineering', image: '/client-logos/lt.webp', verified: true, permissionConfirmed: true },
  { id: 'ashok-leyland', name: 'Ashok Leyland', category: 'Automotive & Heavy', image: '/client-logos/ashok-leyland.webp', verified: true, permissionConfirmed: true },
  { id: 'bosch', name: 'Bosch', category: 'Industrial Engineering', image: '/client-logos/bosch.webp', verified: true, permissionConfirmed: true },
  { id: 'caterpillar', name: 'Caterpillar', category: 'Automotive & Heavy', image: '/client-logos/caterpillar.webp', verified: true, permissionConfirmed: true },
  { id: 'siemens', name: 'Siemens', category: 'Industrial Engineering', image: '/client-logos/siemens.webp', verified: true, permissionConfirmed: true },
  { id: 'mahindra', name: 'Mahindra', category: 'Automotive & Heavy', image: '/client-logos/mahindra.webp', verified: true, permissionConfirmed: true },
  { id: 'tvs', name: 'TVS Motor Company', category: 'Automotive & Heavy', image: '/client-logos/tvs.webp', verified: true, permissionConfirmed: true },
  { id: 'reliance', name: 'Reliance Industries', category: 'Electronics & Power', image: '/client-logos/reliance.webp', verified: true, permissionConfirmed: true },
  { id: 'samsung', name: 'Samsung', category: 'Electronics & Power', image: '/client-logos/samsung.webp', verified: true, permissionConfirmed: true },
  { id: 'hyundai', name: 'Hyundai', category: 'Automotive & Heavy', image: '/client-logos/hyundai.webp', verified: true, permissionConfirmed: true },
  { id: 'toshiba', name: 'Toshiba', category: 'Electronics & Power', image: '/client-logos/toshiba.webp', verified: true, permissionConfirmed: true },
  { id: 'schneider', name: 'Schneider Electric', category: 'Industrial Engineering', image: '/client-logos/schneider.webp', verified: true, permissionConfirmed: true },
  { id: 'abb', name: 'ABB', category: 'Industrial Engineering', image: '/client-logos/abb.webp', verified: true, permissionConfirmed: true },
  { id: 'kirloskar', name: 'Kirloskar', category: 'Industrial Engineering', image: '/client-logos/kirloskar.webp', verified: true, permissionConfirmed: true },

  // Manufacturing, Engineering & Energy
  { id: 'elgi', name: 'ELGi Equipments', category: 'Industrial Engineering', image: '/client-logos/elgi.webp', verified: true, permissionConfirmed: true },
  { id: 'lmw', name: 'Lakshmi Machine Works (LMW)', category: 'Industrial Engineering', image: '/client-logos/lmw.webp', verified: true, permissionConfirmed: true },
  { id: 'texmo', name: 'Texmo Pumps', category: 'Industrial Engineering', image: '/client-logos/texmo.webp', verified: true, permissionConfirmed: true },
  { id: 'cri-pumps', name: 'CRI Pumps', category: 'Industrial Engineering', image: '/client-logos/cri-pumps.webp', verified: true, permissionConfirmed: true },
  { id: 'roots', name: 'Roots Industries', category: 'Automotive & Heavy', image: '/client-logos/roots.webp', verified: true, permissionConfirmed: true },
  { id: 'pricol', name: 'Pricol Limited', category: 'Automotive & Heavy', image: '/client-logos/pricol.webp', verified: true, permissionConfirmed: true },
  { id: 'craftsman', name: 'Craftsman Automation', category: 'Automotive & Heavy', image: '/client-logos/craftsman.webp', verified: true, permissionConfirmed: true },
  { id: 'shanthi-gears', name: 'Shanthi Gears', category: 'Industrial Engineering', image: '/client-logos/shanthi-gears.webp', verified: true, permissionConfirmed: true },
  { id: 'suzlon', name: 'Suzlon Energy', category: 'Electronics & Power', image: '/client-logos/suzlon.webp', verified: true, permissionConfirmed: true },
  { id: 'bonfiglioli', name: 'Bonfiglioli', category: 'Industrial Engineering', image: '/client-logos/bonfiglioli.webp', verified: true, permissionConfirmed: true },
  { id: 'voith', name: 'Voith', category: 'Industrial Engineering', image: '/client-logos/voith.webp', verified: true, permissionConfirmed: true },
  { id: 'propel', name: 'Propel Industries', category: 'Industrial Engineering', image: '/client-logos/propel.webp', verified: true, permissionConfirmed: true },
  { id: 'rabwin', name: 'Rabwin Technologies', category: 'Industrial Engineering', image: '/client-logos/rabwin.webp', verified: true, permissionConfirmed: true },
  { id: 'watertec', name: 'Watertec', category: 'FMCG & Consumer', image: '/client-logos/watertec.webp', verified: true, permissionConfirmed: true },

  // Infrastructure, Steel & Materials
  { id: 'tata-steel', name: 'Tata Steel', category: 'Infrastructure & Steel', image: '/client-logos/tata-steel.webp', verified: true, permissionConfirmed: true },
  { id: 'jsw', name: 'JSW Steel', category: 'Infrastructure & Steel', image: '/client-logos/jsw.webp', verified: true, permissionConfirmed: true },
  { id: 'jindal', name: 'Jindal Steel & Power', category: 'Infrastructure & Steel', image: '/client-logos/jindal.webp', verified: true, permissionConfirmed: true },
  { id: 'ultratech', name: 'UltraTech Cement', category: 'Infrastructure & Steel', image: '/client-logos/ultratech.webp', verified: true, permissionConfirmed: true },
  { id: 'acc', name: 'ACC Limited', category: 'Infrastructure & Steel', image: '/client-logos/acc.webp', verified: true, permissionConfirmed: true },
  { id: 'saint-gobain', name: 'Saint-Gobain', category: 'Infrastructure & Steel', image: '/client-logos/saint-gobain.webp', verified: true, permissionConfirmed: true },
  { id: 'asian-paints', name: 'Asian Paints', category: 'Infrastructure & Steel', image: '/client-logos/asian-paints.webp', verified: true, permissionConfirmed: true },
  { id: 'berger', name: 'Berger Paints', category: 'Infrastructure & Steel', image: '/client-logos/berger.webp', verified: true, permissionConfirmed: true },

  // FMCG, Consumer & Packaging
  { id: 'hul', name: 'Hindustan Unilever', category: 'FMCG & Consumer', image: '/client-logos/hindustan-unilever.webp', verified: true, permissionConfirmed: true },
  { id: 'itc', name: 'ITC Limited', category: 'FMCG & Consumer', image: '/client-logos/itc.webp', verified: true, permissionConfirmed: true },
  { id: 'britannia', name: 'Britannia Industries', category: 'FMCG & Consumer', image: '/client-logos/britannia.webp', verified: true, permissionConfirmed: true },
  { id: 'nestle', name: 'Nestlé', category: 'FMCG & Consumer', image: '/client-logos/nestle.webp', verified: true, permissionConfirmed: true },
  { id: 'dabur', name: 'Dabur India', category: 'FMCG & Consumer', image: '/client-logos/dabur.webp', verified: true, permissionConfirmed: true },
  { id: 'titan', name: 'Titan Company', category: 'FMCG & Consumer', image: '/client-logos/titan.webp', verified: true, permissionConfirmed: true },
  { id: 'havells', name: 'Havells', category: 'Electronics & Power', image: '/client-logos/havells.webp', verified: true, permissionConfirmed: true },
  { id: 'v-guard', name: 'V-Guard', category: 'Electronics & Power', image: '/client-logos/v-guard.webp', verified: true, permissionConfirmed: true },
  { id: 'panasonic', name: 'Panasonic', category: 'Electronics & Power', image: '/client-logos/panasonic.webp', verified: true, permissionConfirmed: true },
  { id: 'lg', name: 'LG Electronics', category: 'Electronics & Power', image: '/client-logos/lg.webp', verified: true, permissionConfirmed: true },
  { id: 'suguna', name: 'Suguna Foods', category: 'FMCG & Consumer', image: '/client-logos/suguna-foods.webp', verified: true, permissionConfirmed: true },
  { id: 'yes-square', name: 'Yes Square Marketing', category: 'FMCG & Consumer', image: '/client-logos/yes-square-marketing.webp', verified: true, permissionConfirmed: true },
];

/**
 * Filtered array containing only client brands that have been verified with written transporter authorization.
 */
export const verifiedClients: ClientBrand[] = allClients.filter(
  (c) => c.verified && c.permissionConfirmed
);
