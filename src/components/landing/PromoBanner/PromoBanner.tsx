import { Link } from 'react-router-dom';
import styles from './PromoBanner.module.css';

interface PromoBannerProps {
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  tag?: string;
}

export function PromoBanner({ headline, description, ctaLabel, ctaHref, imageUrl, tag }: PromoBannerProps) {
  return (
    <section className={styles.banner} aria-labelledby="promo-heading">
      <div className={styles.imageWrapper} aria-hidden="true">
        <img src={imageUrl} alt="" className={styles.image} loading="lazy" />
        <div className={styles.imageOverlay} />
      </div>
      <div className={['container', styles.content].join(' ')}>
        <div className={styles.textBlock}>
          {tag && <span className={styles.tag}>{tag}</span>}
          <h2 className={styles.headline} id="promo-heading">{headline}</h2>
          <p className={styles.description}>{description}</p>
          <Link to={ctaHref} className={styles.cta} id="promo-cta-btn">
            {ctaLabel}
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
