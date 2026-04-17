import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button/Button';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.bg} aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&auto=format&fit=crop&q=80"
          alt=""
          className={styles.bgImage}
          fetchPriority="high"
        />
        <div className={styles.overlay} />
      </div>

      <div className={['container', styles.content].join(' ')}>
        <div className={styles.textBlock}>
          <span className={styles.eyebrow}>Nueva temporada · Colección 2026</span>
          <h1 className={styles.headline}>
            Vístete para
            <br />
            <span className={styles.accent}>la vida que deseas</span>
          </h1>
          <p className={styles.subheadline}>
            Esenciales premium y piezas destacadas seleccionadas para el guardarropa moderno.
            Creadas con intención. Hechas para durar.
          </p>
          <div className={styles.ctas}>
            <Link to="/products" id="hero-shop-now-btn">
              <Button size="lg" variant="pill">Comprar ahora</Button>
            </Link>
            <Link to="/products?category=new" id="hero-new-arrivals-btn">
              <Button size="lg" variant="pill-outline">
                Nuevos ingresos
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust markers */}
        <div className={styles.trust}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>✦</span>
            <span>Envío gratis en compras mayores a $75</span>
          </div>
          <div className={styles.trustDivider} aria-hidden="true" />
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>✦</span>
            <span>Devoluciones gratuitas por 30 días</span>
          </div>
          <div className={styles.trustDivider} aria-hidden="true" />
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>✦</span>
            <span>Pago seguro</span>
          </div>
        </div>
      </div>
    </section>
  );
}
