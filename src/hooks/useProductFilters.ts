import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '@/data/products';
import type { Product } from '@/data/types';
import type { SortValue } from '@/components/catalog/SortDropdown/SortDropdown';

const PAGE_SIZE = 20;

interface FilteredResult {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  hasFilters: boolean;
}

export function useProductFilters(): FilteredResult {
  const [params] = useSearchParams();

  const category  = params.get('category')  ?? '';
  const minPrice  = parseFloat(params.get('minPrice') ?? '') || null;
  const maxPrice  = parseFloat(params.get('maxPrice') ?? '') || null;
  const sort      = (params.get('sort') ?? 'featured') as SortValue;
  const page      = Math.max(1, parseInt(params.get('page') ?? '1', 10));

  const hasFilters = !!(category || minPrice || maxPrice);

  const result = useMemo(() => {
    // 1. Filter
    let filtered = PRODUCTS.filter((p) => {
      if (category && p.categorySlug !== category) return false;
      if (minPrice !== null && p.price < minPrice) return false;
      if (maxPrice !== null && p.price > maxPrice) return false;
      return true;
    });

    // 2. Sort — explicit switch on named constant values
    switch (sort) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered = [...filtered].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'featured':
      default:
        // Featured first, then rest in original order
        filtered = [
          ...filtered.filter((p) => p.featured),
          ...filtered.filter((p) => !p.featured),
        ];
    }

    // 3. Paginate
    const totalProducts = filtered.length;
    const totalPages = Math.ceil(totalProducts / PAGE_SIZE) || 1;
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const paginated = filtered.slice(start, start + PAGE_SIZE);

    return { products: paginated, totalProducts, totalPages, currentPage: safePage };
  }, [category, minPrice, maxPrice, sort, page]);

  return { ...result, hasFilters };
}
