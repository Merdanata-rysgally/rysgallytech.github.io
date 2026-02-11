export interface Industry {
  id: string;
  color: string;
  iconName: string;
  image: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: 'epc',
    color: '#3fbad2',
    iconName: 'Building2',
    image: '/images/epc.svg', // Change to .jpg when you have real images
  },
  {
    id: 'water',
    color: '#3b82f6', // blue
    iconName: 'Droplets',
    image: '/images/water.svg', // Change to .jpg when you have real images
  },
  {
    id: 'furniture',
    color: '#8b5cf6', // purple
    iconName: 'Armchair',
    image: '/images/furniture.svg', // Change to .jpg when you have real images
  },
  {
    id: 'feed',
    color: '#10b981', // green
    iconName: 'Wheat',
    image: '/images/feed.svg', // Change to .jpg when you have real images
  },
  {
    id: 'service',
    color: '#f59e0b', // amber
    iconName: 'Wrench',
    image: '/images/service.svg', // Change to .jpg when you have real images
  },
  {
    id: 'auto',
    color: '#ef4444', // red
    iconName: 'Car',
    image: '/images/auto.svg', // Change to .jpg when you have real images
  },
  {
    id: 'retail',
    color: '#1a8fa6',
    iconName: 'Store',
    image: '/images/retail.svg', // Change to .jpg when you have real images
  },
  {
    id: 'landscaping',
    color: '#22c55e', // lime
    iconName: 'Trees',
    image: '/images/landscaping.svg', // Change to .jpg when you have real images
  },
];
