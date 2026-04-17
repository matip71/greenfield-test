import { useSearchParams } from 'react-router-dom';
import styles from './SortDropdown.module.css';

// Explicit named constant — no pattern-based discovery
export const SORT_OPTIONS = [
  { value: 'featured',   label: 'Destacados' },
  { value: 'price-asc',  label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'newest',     label: 'Más nuevos' },
] as const;

export type SortValue = typeof SORT_OPTIONS[number]['value'];

export function SortDropdown() {
  const [params, setParams] = useSearchParams();
  const current = (params.get('sort') ?? 'featured') as SortValue;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = new URLSearchParams(params);
    if (e.target.value === 'featured') {
      next.delete('sort');
    } else {
      next.set('sort', e.target.value);
    }
    next.delete('page');
    setParams(next, { replace: true });
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor="sort-select" className={styles.label}>Ordenar por</label>
      <div className={styles.selectWrapper}>
        <select
          id="sort-select"
          className={styles.select}
          value={current}
          onChange={handleChange}
          aria-label="Ordenar productos"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">▾</span>
      </div>
    </div>
  );
}
