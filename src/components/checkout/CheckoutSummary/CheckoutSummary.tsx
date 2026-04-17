import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { ShippingOption } from '@/data/types';
import styles from './CheckoutSummary.module.css';

interface CheckoutSummaryProps {
  selectedShipping?: ShippingOption;
}

export function CheckoutSummary({ selectedShipping }: CheckoutSummaryProps) {
  const { state, subtotal } = useCart();
  const shippingCost = selectedShipping?.price ?? 0;
  const total = subtotal + shippingCost;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.panel}>
      {/* Mobile toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        id="checkout-summary-toggle"
      >
        <span className={styles.toggleLabel}>
          {expanded ? 'Ocultar' : 'Mostrar'} resumen del pedido
        </span>
        <span className={styles.totalPreview}>${total.toFixed(2)}</span>
        <span className={styles.chevron} aria-hidden="true">{expanded ? '▲' : '▼'}</span>
      </button>

      {/* Content — always visible on desktop, toggled on mobile */}
      <div className={[styles.content, expanded ? styles.contentExpanded : ''].join(' ')}>
        <h2 className={styles.title}>Resumen del pedido</h2>
        <ul className={styles.items}>
          {state.items.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.itemImage}>
                <img src={item.imageUrl} alt={item.productName} className={styles.img} loading="lazy" />
                <span className={styles.qty} aria-label={`Cantidad ${item.quantity}`}>{item.quantity}</span>
              </div>
              <span className={styles.itemName}>{item.productName}</span>
              <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.rows}>
          <div className={styles.row}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.row}>
            <span>Envío</span>
            <span className={shippingCost === 0 ? styles.free : ''}>
              {shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className={[styles.row, styles.totalRow].join(' ')}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
