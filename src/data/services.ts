export type ServiceTone = 'light' | 'magenta' | 'frost';

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  tone: ServiceTone;
}

export const services: Service[] = [
  {
    id: '01',
    title: 'LCV TRANSPORTATION',
    description:
      'Fast and reliable transportation for local and regional freight.',
    features: [
      'Fast vehicle placement',
      'Flexible freight rates',
      'Reliable delivery',
    ],
    tone: 'light',
  },
  {
    id: '02',
    title: 'HCV TRANSPORTATION',
    description:
      'Heavy-duty transportation for long-haul and nationwide cargo movement.',
    features: [
      'Long-haul nationwide coverage',
      'High capacity payload support',
      'Safe & secure transit',
    ],
    tone: 'magenta',
  },
  {
    id: '03',
    title: 'MINI TRUCK / PICKUP',
    description:
      'Compact vehicles for small loads and last-mile delivery movement.',
    features: [
      'Last-mile delivery support',
      'Compact & agile vehicles',
      'Ideal for urban freight',
    ],
    tone: 'light',
  },
  {
    id: '04',
    title: 'OPEN VEHICLE TRANSPORT',
    description:
      'Open-body vehicles for oversized and specialized cargo.',
    features: [
      'Rapid intra-city placement',
      'Custom lashing & securing',
      'Flexible cargo height clearance',
    ],
    tone: 'magenta',
  },
  {
    id: '05',
    title: 'PART LOAD / FULL LOAD',
    description:
      'Flexible freight solutions for partial and dedicated full-load shipments.',
    features: [
      'Cost-effective PTL options',
      'Dedicated FTL trucks',
      'Scheduled daily dispatches',
    ],
    tone: 'light',
  },
  {
    id: '06',
    title: 'CONTAINER TRANSPORT',
    description:
      'Secure containerized freight for import, export and interstate cargo movement.',
    features: [
      'Standard & high-cube containers',
      'Port-to-warehouse delivery',
      'Sealed & weatherproof transit',
    ],
    tone: 'magenta',
  },
  {
    id: '07',
    title: 'EXPRESS FREIGHT',
    description:
      'Time-critical shipments delivered with priority routing and dedicated vehicles.',
    features: [
      'Priority dispatch & routing',
      'Same-day pickup guarantee',
      'Real-time shipment tracking',
    ],
    tone: 'light',
  },
  {
    id: '08',
    title: 'DEDICATED VEHICLE',
    description:
      'Exclusively assigned vehicles for recurring or high-volume freight requirements.',
    features: [
      'Fixed route scheduling',
      'Assigned driver & vehicle',
      'Volume-based pricing',
    ],
    tone: 'magenta',
  },
  {
    id: '09',
    title: 'INDUSTRIAL & COMMERCIAL',
    description:
      'Customized transportation solutions for industrial and commercial cargo.',
    features: [
      'Enterprise B2B logistics',
      'Factory-to-warehouse transit',
      'Heavy equipment & raw material movement',
    ],
    tone: 'frost',
  },
];
