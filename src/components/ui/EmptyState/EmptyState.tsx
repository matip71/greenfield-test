import styles from './EmptyState.module.css';
import { Button } from '../Button/Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCta?: () => void;
  icon?: string;
}

export function EmptyState({ title, description, ctaLabel, ctaHref, onCta, icon = '🛍️' }: EmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">{icon}</span>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {ctaLabel && (ctaHref || onCta) && (
        ctaHref
          ? <a href={ctaHref} className={styles.cta}><Button>{ctaLabel}</Button></a>
          : <Button onClick={onCta}>{ctaLabel}</Button>
      )}
    </div>
  );
}
