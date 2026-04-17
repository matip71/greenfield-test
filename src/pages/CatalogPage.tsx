import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '@/components/catalog/FilterSidebar/FilterSidebar';
import { SortDropdown } from '@/components/catalog/SortDropdown/SortDropdown';
import { ProductCard } from '@/components/catalog/ProductCard/ProductCard';
import { Pagination } from '@/components/catalog/Pagination/Pagination';
import { EmptyState } from '@/components/ui/EmptyState/EmptyState';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useToast, ToastContainer } from '@/components/ui/Toast/Toast';
import type { Product } from '@/data/types';
import { getCategoryBySlug } from '@/data/categories';
import styles from './CatalogPage.module.css';

export default function CatalogPage() {
  const { products, totalProducts, totalPages, currentPage, hasFilters } = useProductFilters();
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const activeCategorySlug = params.get('category') ?? '';
  const activeCategory = activeCategorySlug ? getCategoryBySlug(activeCategorySlug) : null;

  useEffect(() => {
    const title = activeCategory
      ? `${activeCategory.name} — ShopCo`
      : 'Todos los productos — ShopCo';
    document.title = title;
  }, [activeCategory]);

  function clearFilters() {
    setParams({}, { replace: true });
  }

  function handleAddToCart(product: Product) {
    addToast(`${product.name} agregado al carrito`, 'success');
  }

  return (
    <>
      <div className={styles.page}>
        <div className="container">
          {/* Page header */}
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.title}>
                {activeCategory ? activeCategory.name : 'Todos los productos'}
              </h1>
              <p className={styles.count}>
                {totalProducts} {totalProducts === 1 ? 'producto' : 'productos'}
              </p>
            </div>
            <div className={styles.headerRight}>
              <button
                className={styles.mobileFilterBtn}
                onClick={() => setFiltersOpen(true)}
                id="mobile-filter-btn"
                aria-expanded={filtersOpen}
              >
                <span>⚙</span> Filtros
              </button>
              <SortDropdown />
            </div>
          </div>

          {/* Body: sidebar + grid */}
          <div className={styles.body}>
            {/* Desktop sidebar */}
            <div className={styles.sidebarDesktop}>
              <FilterSidebar />
            </div>

            {/* Mobile filter drawer */}
            {filtersOpen && (
              <>
                <div
                  className={styles.drawerOverlay}
                  onClick={() => setFiltersOpen(false)}
                  aria-hidden="true"
                />
                <div className={styles.filterDrawer} aria-label="Panel de filtros">
                  <div className={styles.drawerHeader}>
                    <span className={styles.drawerTitle}>Filtros</span>
                    <button
                      className={styles.drawerClose}
                      onClick={() => setFiltersOpen(false)}
                      aria-label="Cerrar filtros"
                    >✕</button>
                  </div>
                  <FilterSidebar onClose={() => setFiltersOpen(false)} />
                </div>
              </>
            )}

            {/* Product grid / empty state */}
            <div className={styles.main}>
              {products.length === 0 ? (
                <EmptyState
                  icon="🔍"
                  title="No se encontraron productos"
                  description="Intenta ajustar tus filtros o explora todos los productos."
                  ctaLabel="Limpiar filtros"
                  onCta={clearFilters}
                />
              ) : (
                <>
                  <div className={styles.grid}>
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalProducts={totalProducts}
                  />
                </>
              )}
            </div>
          </div>

          {/* Active filters pill summary (mobile) */}
          {hasFilters && (
            <div className={styles.activeFilters}>
              <span className={styles.activeFiltersLabel}>Filtros activos</span>
              <button className={styles.clearFiltersBtn} onClick={clearFilters} id="catalog-clear-filters-btn">
                Limpiar todos
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
