import type { Product } from './types';

export const PRODUCTS: Product[] = [
  // ---- Clothing ----
  {
    id: 'prod-1',
    name: 'Essential Oversized Tee',
    slug: 'essential-oversized-tee',
    description: 'A premium heavyweight cotton tee with a relaxed oversized silhouette. Perfect for everyday wear, featuring a dropped shoulder and ribbed collar.',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-1', categorySlug: 'clothing',
    variants: [
      { id: 'v-s', type: 'size', label: 'Size', value: 'S' },
      { id: 'v-m', type: 'size', label: 'Size', value: 'M' },
      { id: 'v-l', type: 'size', label: 'Size', value: 'L' },
      { id: 'v-xl', type: 'size', label: 'Size', value: 'XL' },
      { id: 'v-black', type: 'color', label: 'Color', value: 'Black', colorHex: '#1a1a1a' },
      { id: 'v-white', type: 'color', label: 'Color', value: 'White', colorHex: '#f5f5f5' },
      { id: 'v-sage', type: 'color', label: 'Color', value: 'Sage', colorHex: '#8faf8f' },
    ],
    inStock: true, featured: true,
    createdAt: '2025-01-10T00:00:00Z', tags: ['bestseller', 'new'],
  },
  {
    id: 'prod-2',
    name: 'Structured Blazer',
    slug: 'structured-blazer',
    description: 'A sharp, double-breasted blazer in a premium wool blend. Effortlessly transitions from boardroom to evening out.',
    price: 189.99,
    compareAtPrice: 245.00,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4f47?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-1', categorySlug: 'clothing',
    variants: [
      { id: 'v2-xs', type: 'size', label: 'Size', value: 'XS' },
      { id: 'v2-s', type: 'size', label: 'Size', value: 'S' },
      { id: 'v2-m', type: 'size', label: 'Size', value: 'M' },
      { id: 'v2-l', type: 'size', label: 'Size', value: 'L' },
      { id: 'v2-navy', type: 'color', label: 'Color', value: 'Navy', colorHex: '#1b2a4a' },
      { id: 'v2-charcoal', type: 'color', label: 'Color', value: 'Charcoal', colorHex: '#3a3a3a' },
    ],
    inStock: true, featured: true,
    createdAt: '2025-01-15T00:00:00Z', tags: ['sale', 'premium'],
  },
  {
    id: 'prod-3',
    name: 'Wide-Leg Trousers',
    slug: 'wide-leg-trousers',
    description: 'Modern wide-leg silhouette in a smooth crepe fabric. High-rise waist with a comfortable elasticated back.',
    price: 95.00,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-1', categorySlug: 'clothing',
    variants: [
      { id: 'v3-xs', type: 'size', label: 'Size', value: 'XS' },
      { id: 'v3-s', type: 'size', label: 'Size', value: 'S' },
      { id: 'v3-m', type: 'size', label: 'Size', value: 'M' },
      { id: 'v3-l', type: 'size', label: 'Size', value: 'L' },
      { id: 'v3-ecru', type: 'color', label: 'Color', value: 'Ecru', colorHex: '#f0e8d0' },
      { id: 'v3-black', type: 'color', label: 'Color', value: 'Black', colorHex: '#1a1a1a' },
    ],
    inStock: true, featured: false,
    createdAt: '2025-02-01T00:00:00Z', tags: [],
  },
  {
    id: 'prod-4',
    name: 'Merino Wool Crewneck',
    slug: 'merino-wool-crewneck',
    description: 'Ultra-soft 100% merino wool. Temperature-regulating, itch-free, and machine washable.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-1', categorySlug: 'clothing',
    variants: [
      { id: 'v4-s', type: 'size', label: 'Size', value: 'S' },
      { id: 'v4-m', type: 'size', label: 'Size', value: 'M' },
      { id: 'v4-l', type: 'size', label: 'Size', value: 'L' },
      { id: 'v4-camel', type: 'color', label: 'Color', value: 'Camel', colorHex: '#c19a6b' },
      { id: 'v4-navy', type: 'color', label: 'Color', value: 'Navy', colorHex: '#1b2a4a' },
    ],
    inStock: true, featured: true,
    createdAt: '2025-01-20T00:00:00Z', tags: ['premium'],
  },
  // ---- Footwear ----
  {
    id: 'prod-5',
    name: 'Minimalist Leather Sneakers',
    slug: 'minimalist-leather-sneakers',
    description: 'Clean, low-profile leather sneakers with a cushioned insole. Handcrafted from full-grain leather.',
    price: 165.00,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-2', categorySlug: 'footwear',
    variants: [
      { id: 'v5-40', type: 'size', label: 'EU Size', value: '40' },
      { id: 'v5-41', type: 'size', label: 'EU Size', value: '41' },
      { id: 'v5-42', type: 'size', label: 'EU Size', value: '42' },
      { id: 'v5-43', type: 'size', label: 'EU Size', value: '43' },
      { id: 'v5-44', type: 'size', label: 'EU Size', value: '44' },
      { id: 'v5-white', type: 'color', label: 'Color', value: 'White', colorHex: '#f5f5f5' },
      { id: 'v5-black', type: 'color', label: 'Color', value: 'Black', colorHex: '#1a1a1a' },
    ],
    inStock: true, featured: true,
    createdAt: '2025-01-05T00:00:00Z', tags: ['bestseller'],
  },
  {
    id: 'prod-6',
    name: 'Suede Chelsea Boots',
    slug: 'suede-chelsea-boots',
    description: 'A timeless Chelsea boot in premium suede with an elasticated gusset and stacked heel.',
    price: 219.99,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-2', categorySlug: 'footwear',
    variants: [
      { id: 'v6-39', type: 'size', label: 'EU Size', value: '39' },
      { id: 'v6-40', type: 'size', label: 'EU Size', value: '40' },
      { id: 'v6-41', type: 'size', label: 'EU Size', value: '41' },
      { id: 'v6-42', type: 'size', label: 'EU Size', value: '42' },
      { id: 'v6-tan', type: 'color', label: 'Color', value: 'Tan', colorHex: '#c19a6b' },
      { id: 'v6-black', type: 'color', label: 'Color', value: 'Black', colorHex: '#1a1a1a' },
    ],
    inStock: true, featured: true,
    createdAt: '2025-02-10T00:00:00Z', tags: ['premium'],
  },
  // ---- Accessories ----
  {
    id: 'prod-7',
    name: 'Italian Leather Wallet',
    slug: 'italian-leather-wallet',
    description: 'Slim bifold wallet in vegetable-tanned Italian leather. Fits 6 cards and cash, ages beautifully.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-3', categorySlug: 'accessories',
    variants: [
      { id: 'v7-tan', type: 'color', label: 'Color', value: 'Tan', colorHex: '#c19a6b' },
      { id: 'v7-black', type: 'color', label: 'Color', value: 'Black', colorHex: '#1a1a1a' },
      { id: 'v7-brown', type: 'color', label: 'Color', value: 'Brown', colorHex: '#6b3a2a' },
    ],
    inStock: true, featured: true,
    createdAt: '2025-01-12T00:00:00Z', tags: ['bestseller'],
  },
  {
    id: 'prod-8',
    name: 'Oversized Tortoise Sunglasses',
    slug: 'oversized-tortoise-sunglasses',
    description: 'Statement oversized frames with UV400 polarized lenses. Lightweight acetate construction.',
    price: 145.00,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-3', categorySlug: 'accessories',
    variants: [
      { id: 'v8-tort', type: 'color', label: 'Color', value: 'Tortoise', colorHex: '#8b5e3c' },
      { id: 'v8-black', type: 'color', label: 'Color', value: 'Black', colorHex: '#1a1a1a' },
    ],
    inStock: true, featured: false,
    createdAt: '2025-02-05T00:00:00Z', tags: [],
  },
  // ---- Electronics ----
  {
    id: 'prod-9',
    name: 'Pro Wireless Headphones',
    slug: 'pro-wireless-headphones',
    description: 'Studio-grade ANC with 40-hour battery life and lossless hi-fi audio. Foldable design for travel.',
    price: 329.99,
    compareAtPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-4', categorySlug: 'electronics',
    variants: [
      { id: 'v9-black', type: 'color', label: 'Color', value: 'Midnight Black', colorHex: '#1a1a1a' },
      { id: 'v9-silver', type: 'color', label: 'Color', value: 'Silver', colorHex: '#c0c0c0' },
    ],
    inStock: true, featured: true,
    createdAt: '2025-01-08T00:00:00Z', tags: ['sale', 'premium', 'bestseller'],
  },
  {
    id: 'prod-10',
    name: 'Slim Mechanical Keyboard',
    slug: 'slim-mechanical-keyboard',
    description: 'TKL wireless mechanical keyboard with brown switches, RGB per-key lighting, and aluminum chassis.',
    price: 179.99,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-4', categorySlug: 'electronics',
    variants: [
      { id: 'v10-space', type: 'color', label: 'Color', value: 'Space Gray', colorHex: '#4a4a4a' },
      { id: 'v10-silver', type: 'color', label: 'Color', value: 'Silver', colorHex: '#c0c0c0' },
    ],
    inStock: false, featured: false,
    createdAt: '2025-03-01T00:00:00Z', tags: [],
  },
  // ---- Home & Living ----
  {
    id: 'prod-11',
    name: 'Ceramic Pour-Over Set',
    slug: 'ceramic-pour-over-set',
    description: 'Handcrafted ceramic pour-over dripper and carafe set. Makes 2–4 cups of specialty coffee.',
    price: 89.00,
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-5', categorySlug: 'home-living',
    variants: [
      { id: 'v11-white', type: 'color', label: 'Color', value: 'Matte White', colorHex: '#f0f0f0' },
      { id: 'v11-charcoal', type: 'color', label: 'Color', value: 'Charcoal', colorHex: '#3a3a3a' },
    ],
    inStock: true, featured: true,
    createdAt: '2025-02-20T00:00:00Z', tags: ['new'],
  },
  {
    id: 'prod-12',
    name: 'Linen Duvet Cover',
    slug: 'linen-duvet-cover',
    description: '100% stonewashed French linen duvet cover. Temperature-regulating, gets softer with every wash.',
    price: 149.00,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-5', categorySlug: 'home-living',
    variants: [
      { id: 'v12-queen', type: 'size', label: 'Size', value: 'Queen' },
      { id: 'v12-king', type: 'size', label: 'Size', value: 'King' },
      { id: 'v12-sand', type: 'color', label: 'Color', value: 'Sand', colorHex: '#d4b896' },
      { id: 'v12-blue', type: 'color', label: 'Color', value: 'Ocean Blue', colorHex: '#5c8fa8' },
    ],
    inStock: true, featured: false,
    createdAt: '2025-03-05T00:00:00Z', tags: [],
  },
  // ---- Sports ----
  {
    id: 'prod-13',
    name: 'Performance Running Jacket',
    slug: 'performance-running-jacket',
    description: 'Lightweight windbreaker with packable design. Reflective details for low-light visibility.',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&auto=format&fit=crop',
    ],
    categoryId: 'cat-6', categorySlug: 'sports',
    variants: [
      { id: 'v13-s', type: 'size', label: 'Size', value: 'S' },
      { id: 'v13-m', type: 'size', label: 'Size', value: 'M' },
      { id: 'v13-l', type: 'size', label: 'Size', value: 'L' },
      { id: 'v13-xl', type: 'size', label: 'Size', value: 'XL' },
      { id: 'v13-neon', type: 'color', label: 'Color', value: 'Electric Lime', colorHex: '#c8f028' },
      { id: 'v13-black', type: 'color', label: 'Color', value: 'Black', colorHex: '#1a1a1a' },
    ],
    inStock: true, featured: true,
    createdAt: '2025-01-25T00:00:00Z', tags: ['new'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}
