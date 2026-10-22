export interface Vehicle {
  id: number;
  chip: string;
  name: string;
  description: string;
  image: string; // path in /public/vehicles/
}

export const vehicles: Vehicle[] = [
  {
    id: 1,
    chip: 'SMALL COMMERCIAL',
    name: 'Mini / Dost',
    description: 'Compact delivery for intra-city and short-haul cargo needs',
    image: '/vehicles/v1-mini-dost.webp',
  },
  {
    id: 2,
    chip: 'LIGHT VEHICLE',
    name: 'Tata Pickup',
    description: 'Local & regional goods transport',
    image: '/vehicles/v2-tata-pickup.webp',
  },
  {
    id: 3,
    chip: 'LIGHT COMMERCIAL',
    name: '14 Ft',
    description: 'Medium-range freight for retail and distribution loads',
    image: '/vehicles/v3-14ft.webp',
  },
  {
    id: 4,
    chip: 'MEDIUM COMMERCIAL',
    name: '17 Ft',
    description: 'Versatile mid-capacity vehicle for commercial shipments',
    image: '/vehicles/v4-17ft.webp',
  },
  {
    id: 5,
    chip: 'HEAVY COMMERCIAL',
    name: '20 Ft',
    description: 'Heavy commercial loads & industrial goods',
    image: '/vehicles/v5-20ft.webp',
  },
  {
    id: 6,
    chip: 'LARGE COMMERCIAL',
    name: '24 Ft',
    description: 'Large-volume interstate freight and bulk cargo movement',
    image: '/vehicles/v6-24ft.webp',
  },
  {
    id: 7,
    chip: 'HIGH CAPACITY',
    name: '26 Ft',
    description: 'High-capacity trailer for heavyweight long-haul transport',
    image: '/vehicles/v7-26ft.webp',
  },
  {
    id: 8,
    chip: 'HEAVY HAULAGE',
    name: '32 Ft SXL / MXL',
    description: 'Maximum payload multi-axle trailer for industrial freight',
    image: '/vehicles/v8-32ft.webp',
  },
];
