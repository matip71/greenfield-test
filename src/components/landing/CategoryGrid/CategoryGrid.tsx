import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/categories';
import styles from './CategoryGrid.module.css';

export function CategoryGrid() {
  return (
    <section className={styles.section} aria-labelledby="categories-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title} id="categories-heading">Comprar por categoría</h2>
          <p className={styles.subtitle}>Explora nuestras selecciones especiales</p>
        </div>
        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className={styles.card}
              id={`category-card-${cat.slug}`}
              aria-label={`Explorar ${cat.name}`}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{cat.name}</span>
                <span className={styles.count}>{cat.productCount} productos</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
