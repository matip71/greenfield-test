import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '@/data/categories';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  onClose?: () => void;
}

export function FilterSidebar({ onClose }: FilterSidebarProps) {
  const [params, setParams] = useSearchParams();

  const activeCategory = params.get('category') ?? '';
  const minPrice = params.get('minPrice') ?? '';
  const maxPrice = params.get('maxPrice') ?? '';

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete('page'); // reset to page 1 on filter change
    setParams(next, { replace: true });
  }

  function toggleCategory(slug: string) {
    if (activeCategory === slug) {
      setParam('category', '');
    } else {
      setParam('category', slug);
    }
    onClose?.();
  }

  function applyPriceRange() {
    const next = new URLSearchParams(params);
    if (minPrice) next.set('minPrice', minPrice); else next.delete('minPrice');
    if (maxPrice) next.set('maxPrice', maxPrice); else next.delete('maxPrice');
    next.delete('page');
    setParams(next, { replace: true });
    onClose?.();
  }

  function clearAll() {
    setParams({}, { replace: true });
    onClose?.();
  }

  const hasFilters = activeCategory || minPrice || maxPrice;

  return (
    <aside className={styles.sidebar} aria-label="Filtros de productos">
      <div className={styles.header}>
        <h2 className={styles.title}>Filtros</h2>
        {hasFilters && (
          <button className={styles.clearAll} onClick={clearAll} id="filter-clear-all-btn">
            Limpiar todos
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Categoría</h3>
        <ul className={styles.categoryList}>
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                className={[
                  styles.categoryBtn,
                  activeCategory === cat.slug ? styles.active : '',
                ].join(' ')}
                onClick={() => toggleCategory(cat.slug)}
                id={`filter-category-${cat.slug}`}
                aria-pressed={activeCategory === cat.slug}
              >
                <span>{cat.name}</span>
                <span className={styles.count}>{cat.productCount}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price range filter */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Rango de precios</h3>
        <div className={styles.priceInputs}>
          <div className={styles.priceField}>
            <label htmlFor="filter-min-price" className={styles.priceLabel}>Mín</label>
            <div className={styles.priceInputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input
                id="filter-min-price"
                type="number"
                min={0}
                placeholder="0"
                value={minPrice}
                onChange={(e) => setParam('minPrice', e.target.value)}
                className={styles.priceInput}
              />
            </div>
          </div>
          <span className={styles.priceSep}>–</span>
          <div className={styles.priceField}>
            <label htmlFor="filter-max-price" className={styles.priceLabel}>Máx</label>
            <div className={styles.priceInputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input
                id="filter-max-price"
                type="number"
                min={0}
                placeholder="Cualquiera"
                value={maxPrice}
                onChange={(e) => setParam('maxPrice', e.target.value)}
                className={styles.priceInput}
              />
            </div>
          </div>
        </div>
        <button
          className={styles.applyBtn}
          onClick={applyPriceRange}
          id="filter-apply-price-btn"
        >
          Aplicar precio
        </button>
      </div>
    </aside>
  );
}
