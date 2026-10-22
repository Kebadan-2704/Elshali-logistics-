export interface Corridor {
  id: string;
  title: string;
  description: string;
  states: string[];
}

export interface Hub {
  name: string;
  descriptor: string;
  icon: string; // lucide icon name
}

export const corridors: Corridor[] = [
  {
    id: '01',
    title: 'South India',
    description:
      'Direct connectivity across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh & Telangana.',
    states: [
      'Tamil Nadu',
      'Karnataka',
      'Kerala',
      'Andhra Pradesh',
      'Telangana',
    ],
  },
  {
    id: '02',
    title: 'North India',
    description:
      'Long-haul routes serving Delhi NCR, Punjab, Haryana, Rajasthan & Uttar Pradesh.',
    states: ['Delhi NCR', 'Punjab', 'Haryana', 'Rajasthan', 'Uttar Pradesh'],
  },
  {
    id: '03',
    title: 'East India',
    description:
      'Freight routes reaching West Bengal, Odisha, Jharkhand & Bihar commercial centers.',
    states: ['West Bengal', 'Odisha', 'Jharkhand', 'Bihar'],
  },
  {
    id: '04',
    title: 'West India',
    description:
      'Express transit corridors to Maharashtra, Gujarat, Goa & Madhya Pradesh.',
    states: ['Maharashtra', 'Gujarat', 'Goa', 'Madhya Pradesh'],
  },
];

export const tamilNaduHubs: Hub[] = [
  { name: 'Chennai', descriptor: 'Port & Commercial Capital', icon: 'anchor' },
  {
    name: 'Coimbatore',
    descriptor: 'Industrial & Textile Hub',
    icon: 'factory',
  },
  {
    name: 'Madurai',
    descriptor: 'South TN Distribution Center',
    icon: 'landmark',
  },
  {
    name: 'Tiruppur',
    descriptor: 'Garment & Export Zone',
    icon: 'layers',
  },
  {
    name: 'Salem',
    descriptor: 'Steel & Manufacturing Hub',
    icon: 'settings',
  },
  {
    name: 'Trichy',
    descriptor: 'Central Logistics Junction',
    icon: 'git-branch',
  },
  {
    name: 'Hosur',
    descriptor: 'Automotive & Electronics Corridor',
    icon: 'cpu',
  },
  {
    name: 'Erode',
    descriptor: 'Turmeric & Textile Market Hub',
    icon: 'package',
  },
  {
    name: 'Tirunelveli',
    descriptor: 'Southern Trade Gateway',
    icon: 'map',
  },
];
