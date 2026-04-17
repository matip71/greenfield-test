import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import styles from './OrderSummary.module.css';

const FLAT_SHIPPING = 5.99;

interface OrderSummaryProps {
  shippingCost?: number;         // Override for checkout (dynamic)
  ctaLabel?: string;
  ctaHref?: string;
  ctaDisabled?: boolean;
  onCta?: () => void;
  loading?: boolean;
}

export function OrderSummary({
  shippingCost = FLAT_SHIPPING,
  ctaLabel = 'Proceder al pago',
  ctaHref = '/checkout',
  ctaDisabled = false,
  onCta,
  loading = false,
}: OrderSummaryProps) {
  const { subtotal, itemCount } = useCart();
  const total = subtotal + shippingCost;
  const shippingDisplay = shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`;

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Resumen del pedido</h2>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span>Subtotal ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <span>Envío</span>
          <span className={shippingCost === 0 ? styles.free : ''}>{shippingDisplay}</span>
        </div>
        <div className={[styles.row, styles.total].join(' ')}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {ctaHref && !onCta ? (
        <Link
          to={ctaHref}
          className={[styles.cta, ctaDisabled ? styles.ctaDisabled : ''].join(' ')}
          id="order-summary-cta"
          aria-disabled={ctaDisabled}
          tabIndex={ctaDisabled ? -1 : 0}
          onClick={(e) => { if (ctaDisabled) e.preventDefault(); }}
        >
          {ctaLabel}
        </Link>
      ) : (
        <button
          className={[styles.cta, ctaDisabled ? styles.ctaDisabled : ''].join(' ')}
          disabled={ctaDisabled || loading}
          onClick={onCta}
          id="order-summary-cta"
          aria-label={ctaLabel}
        >
          {loading ? <span className={styles.spinner} /> : ctaLabel}
        </button>
      )}

      <p className={styles.note}>
        <span aria-hidden="true">🔒</span> Pago seguro · Impuestos incluidos
      </p>
    </div>
  );
}

export { FLAT_SHIPPING };
