import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
}

export function Pagination({ currentPage, totalPages, totalProducts }: PaginationProps) {
  const [params, setParams] = useSearchParams();

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const next = new URLSearchParams(params);
    if (page === 1) {
      next.delete('page');
    } else {
      next.set('page', String(page));
    }
    setParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Build page number range (show up to 5 pages centered on current)
  const pages: (number | '…')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('…');
    const start = Math.max(2, currentPage - 1);
    const end   = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('…');
    pages.push(totalPages);
  }

  return (
    <nav className={styles.nav} aria-label="Paginación">
      <p className={styles.summary}>
        Mostrando página {currentPage} de {totalPages} ({totalProducts} productos)
      </p>
      <div className={styles.controls}>
        <button
          className={[styles.btn, styles.arrow].join(' ')}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
          id="pagination-prev-btn"
        >
          ←
        </button>

        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
          ) : (
            <button
              key={p}
              className={[styles.btn, p === currentPage ? styles.active : ''].join(' ')}
              onClick={() => goToPage(p)}
              aria-label={`Página ${p}`}
              aria-current={p === currentPage ? 'page' : undefined}
              id={`pagination-page-${p}`}
            >
              {p}
            </button>
          )
        )}

        <button
          className={[styles.btn, styles.arrow].join(' ')}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Página siguiente"
          id="pagination-next-btn"
        >
          →
        </button>
      </div>
    </nav>
  );
}
