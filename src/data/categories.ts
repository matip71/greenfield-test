import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Ropa',
    slug: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop',
    description: 'Esenciales diarios y piezas destacadas',
    productCount: 8,
  },
  {
    id: 'cat-2',
    name: 'Calzado',
    slug: 'footwear',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop',
    description: 'Sal con estilo',
    productCount: 6,
  },
  {
    id: 'cat-3',
    name: 'Accesorios',
    slug: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&auto=format&fit=crop',
    description: 'Los toques finales',
    productCount: 7,
  },
  {
    id: 'cat-4',
    name: 'Electrónica',
    slug: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&auto=format&fit=crop',
    description: 'Prepárate para el futuro',
    productCount: 5,
  },
  {
    id: 'cat-5',
    name: 'Hogar',
    slug: 'home-living',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop',
    description: 'Haz que cada espacio sea tuyo',
    productCount: 5,
  },
  {
    id: 'cat-6',
    name: 'Deportes',
    slug: 'sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop',
    description: 'Donde el rendimiento se encuentra con el estilo',
    productCount: 5,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
