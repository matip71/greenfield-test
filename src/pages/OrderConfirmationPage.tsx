import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLastOrder, clearLastOrder } from '@/data/orders';
import type { Order } from '@/data/types';
import styles from './OrderConfirmationPage.module.css';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    document.title = 'Pedido confirmado — ShopCo';
    const lastOrder = getLastOrder();
    if (!lastOrder) {
      navigate('/', { replace: true });
      return;
    }
    setOrder(lastOrder);
    setChecked(true);
    // Clear after render so direct refresh redirects
    clearLastOrder();
  }, [navigate]);

  if (!checked || !order) return null;

  const { shippingAddress: addr } = order;

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.card}>
          {/* Success header */}
          <div className={styles.successHeader}>
            <div className={styles.checkCircle} aria-hidden="true">✓</div>
            <h1 className={styles.title}>¡Pedido confirmado!</h1>
            <p className={styles.subtitle}>
              Gracias por tu compra. Tu pedido ha sido realizado y está siendo procesado.
            </p>
            <div className={styles.orderNumberBadge}>
              Pedido #{order.id}
            </div>
          </div>

          <div className={styles.body}>
            {/* Items */}
            <section className={styles.section} aria-labelledby="confirm-items-heading">
              <h2 className={styles.sectionTitle} id="confirm-items-heading">Artículos del pedido</h2>
              <ul className={styles.items}>
                {order.items.map((item) => (
                  <li key={item.id} className={styles.item}>
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className={styles.itemImg}
                      loading="lazy"
                    />
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.productName}</p>
                      {Object.keys(item.selectedVariants).length > 0 && (
                        <p className={styles.itemVariants}>
                          {Object.entries(item.selectedVariants)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(' · ')}
                        </p>
                      )}
                      <p className={styles.itemQty}>Cant: {item.quantity}</p>
                    </div>
                    <span className={styles.itemTotal}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <div className={styles.grid2}>
              {/* Shipping address */}
              <section className={styles.section} aria-labelledby="confirm-address-heading">
                <h2 className={styles.sectionTitle} id="confirm-address-heading">Dirección de envío</h2>
                <div className={styles.addressBlock}>
                  <p>{addr.firstName} {addr.lastName}</p>
                  <p>{addr.addressLine1}</p>
                  {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                  <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p>{addr.country}</p>
                </div>
              </section>

              {/* Shipping method & payment */}
              <section className={styles.section} aria-labelledby="confirm-payment-heading">
                <h2 className={styles.sectionTitle} id="confirm-payment-heading">Detalles del pedido</h2>
                <div className={styles.detailRows}>
                  <div className={styles.detailRow}>
                    <span>Envío</span>
                    <span>{order.shippingOption.label}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Pago</span>
                    <span>Tarjeta terminada en ****{order.paymentLast4}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Costo de envío</span>
                    <span>
                      {order.shippingCost === 0 ? 'Gratis' : `$${order.shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className={[styles.detailRow, styles.totalRow].join(' ')}>
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* CTAs */}
          <div className={styles.ctas}>
            <Link to="/" className={styles.primaryCta} id="confirm-continue-shopping-btn">
              Seguir comprando
            </Link>
            <Link to="/account/orders" className={styles.secondaryCta} id="confirm-view-orders-btn">
              Ver historial de pedidos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
