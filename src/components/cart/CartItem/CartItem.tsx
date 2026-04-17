import { Link } from 'react-router-dom';
import type { CartItem as CartItemType } from '@/data/types';
import { useCart } from '@/context/CartContext';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const lineTotal = item.price * item.quantity;

  const variantSummary = Object.entries(item.selectedVariants)
    .map(([type, value]) => `${type.charAt(0).toUpperCase() + type.slice(1)}: ${value}`)
    .join('  ·  ');

  return (
    <div className={styles.item}>
      {/* Product image */}
      <Link to={`/products/${item.productSlug}`} className={styles.imageLink}>
        <img
          src={item.imageUrl}
          alt={item.productName}
          className={styles.image}
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.top}>
          <div>
            <Link to={`/products/${item.productSlug}`} className={styles.name}>
              {item.productName}
            </Link>
            {variantSummary && (
              <p className={styles.variants}>{variantSummary}</p>
            )}
          </div>
          <span className={styles.lineTotal}>${lineTotal.toFixed(2)}</span>
        </div>

        <div className={styles.bottom}>
          {/* Quantity stepper */}
          <div className={styles.stepper} role="group" aria-label={`Cantidad para ${item.productName}`}>
            <button
              className={styles.stepBtn}
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Reducir cantidad"
              id={`cart-decrease-${item.id}`}
            >
              −
            </button>
            <span className={styles.qty} aria-live="polite" aria-label={`Cantidad: ${item.quantity}`}>
              {item.quantity}
            </span>
            <button
              className={styles.stepBtn}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Aumentar cantidad"
              id={`cart-increase-${item.id}`}
            >
              +
            </button>
          </div>

          <span className={styles.unitPrice}>${item.price.toFixed(2)} c/u</span>

          <button
            className={styles.removeBtn}
            onClick={() => removeItem(item.id)}
            aria-label={`Eliminar ${item.productName} del carrito`}
            id={`cart-remove-${item.id}`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
