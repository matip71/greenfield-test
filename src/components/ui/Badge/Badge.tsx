import type { ReactNode } from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'primary' | 'success' | 'error' | 'warning' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  count?: number;
}

export function Badge({ children, variant = 'primary', count }: BadgeProps) {
  if (count !== undefined) {
    return (
      <span className={[styles.badge, styles[variant], styles.countBadge].join(' ')}>
        {count > 99 ? '99+' : count}
      </span>
    );
  }
  return (
    <span className={[styles.badge, styles[variant]].join(' ')}>
      {children}
    </span>
  );
}
