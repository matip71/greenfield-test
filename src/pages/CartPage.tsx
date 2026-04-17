import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/cart/CartItem/CartItem';
import { OrderSummary } from '@/components/cart/OrderSummary/OrderSummary';
import { EmptyState } from '@/components/ui/EmptyState/EmptyState';
import styles from './CartPage.module.css';

export default function CartPage() {
  const { state, itemCount } = useCart();

  useEffect(() => {
    document.title = `Carrito (${itemCount}) — ShopCo`;
  }, [itemCount]);

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>
          Tu carrito
          {itemCount > 0 && (
            <span className={styles.itemCount}>{itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}</span>
          )}
        </h1>

        {state.items.length === 0 ? (
          <EmptyState
            icon="🛍️"
            title="Tu carrito está vacío"
            description="Parece que no has agregado nada todavía. Explora para encontrar algo que te guste."
            ctaLabel="Comprar ahora"
            ctaHref="/products"
          />
        ) : (
          <div className={styles.layout}>
            {/* Items list */}
            <div className={styles.itemsCol}>
              <div className={styles.itemsList} aria-label="Cart items">
                {state.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div className={styles.summaryCol}>
              <OrderSummary
                ctaLabel="Proceder al pago"
                ctaHref="/checkout"
                ctaDisabled={state.items.length === 0}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
