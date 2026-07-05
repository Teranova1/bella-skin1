import { Product } from './types';

export const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Hydrating Facial Serum',
    price: 58,
    description: 'Lightweight serum with hyaluronic acid for deep hydration',
    category: 'Hydration',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    benefits: ['Hydrating', 'Plumping', 'Non-greasy'],
    inStock: true,
  },
  {
    id: '2',
    name: 'Brightening Vitamin C Cream',
    price: 72,
    description: 'Rich cream with vitamin C to brighten and even skin tone',
    category: 'Brightening',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop',
    benefits: ['Brightening', 'Anti-oxidant', 'Vitamin-rich'],
    inStock: true,
  },
  {
    id: '3',
    name: 'Renewal Night Mask',
    price: 68,
    description: 'Overnight mask with retinol for skin renewal and repair',
    category: 'Renewal',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop',
    benefits: ['Anti-aging', 'Repairing', 'Overnight care'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Soothing Aloe Gel',
    price: 42,
    description: 'Calming gel infused with aloe vera for sensitive skin',
    category: 'Soothing',
    image: 'https://images.unsplash.com/photo-1616393346013-c5e96b2e8b31?w=400&h=400&fit=crop',
    benefits: ['Calming', 'Soothing', 'Cooling effect'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Gentle Cleansing Oil',
    price: 52,
    description: 'Luxurious cleansing oil that removes makeup effortlessly',
    category: 'Cleansing',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    benefits: ['Cleansing', 'Makeup removal', 'Nourishing'],
    inStock: true,
  },
  {
    id: '6',
    name: 'SPF 50 Sun Shield',
    price: 55,
    description: 'Lightweight daily sunscreen with mineral protection',
    category: 'Sun Care',
    image: 'https://images.unsplash.com/photo-1599599810694-b3ae3ac7b0f4?w=400&h=400&fit=crop',
    benefits: ['SPF 50', 'Mineral-based', 'Lightweight'],
    inStock: true,
  },
  {
    id: '7',
    name: 'Hyaluronic Acid Toner',
    price: 45,
    description: 'Hydrating toner with 3-layer HA complex',
    category: 'Hydration',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    benefits: ['Hydrating', 'pH-balancing', 'Lightweight'],
    inStock: true,
  },
  {
    id: '8',
    name: 'Gold Radiance Eye Cream',
    price: 62,
    description: 'Luxurious eye cream with gold particles and peptides',
    category: 'Brightening',
    image: 'https://images.unsplash.com/photo-1615397349754-cad225fa0cc0?w=400&h=400&fit=crop',
    benefits: ['Anti-aging', 'Brightening', 'Firming'],
    inStock: true,
  },
];

export const PRODUCT_STORAGE_KEY = 'bella-products-v2';

export function createProductId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function loadProducts(): Product[] {
  if (typeof window === 'undefined') {
    return defaultProducts;
  }

  try {
    const stored = window.localStorage.getItem(PRODUCT_STORAGE_KEY);

    if (!stored) {
      return defaultProducts;
    }

    const parsed = JSON.parse(stored) as Product[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

export function saveProducts(products: Product[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
}
