import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { getOrderById } from '@/data/orders';
import type { Order } from '@/data/types';
import ROUTES from '@/routes';
import styles from './Account.module.css';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { state: authState } = useAuth();
  const user = authState.user;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Detalles del pedido — ShopCo';
    if (id && user) {
      const foundOrder = getOrderById(id);
      // Ensure the order belongs to this user
      if (foundOrder && foundOrder.userId === user.id) {
        setOrder(foundOrder);
      }
    }
    setLoading(false);
  }, [id, user]);

  if (!user || loading) return null;

  return (
    <div className={styles.layout}>
      <AccountSidebar />
      <div className={styles.content}>
        <Link to={ROUTES.ORDER_HISTORY.path} className={styles.backLink}>
          &larr; Volver al historial de pedidos
        </Link>

        {order ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
              <h1 className={styles.title} style={{ marginBottom: 0 }}>
                Pedido #{order.id.slice(0, 8).toUpperCase()}
              </h1>
              <span className={styles.orderStatus} style={{ fontSize: '1rem' }}>
                {order.status}
              </span>
            </div>

            <div className={styles.detailGrid}>
              <div>
                <div className={styles.detailSection}>
                  <h2 className={styles.detailTitle}>Artículos</h2>
                  <div className={styles.itemList}>
                    {order.items.map((item) => (
                      <div key={item.id} className={styles.itemCard}>
                        <img src={item.imageUrl} alt={item.productName} className={styles.itemImage} loading="lazy" />
                        <div className={styles.itemDetails}>
                          <div className={styles.itemName}>{item.productName}</div>
                          <div className={styles.itemMeta}>
                            Cant: {item.quantity}
                            {item.selectedVariants && Object.entries(item.selectedVariants).map(([k, v]) => ` | ${k}: ${v}`)}
                          </div>
                        </div>
                        <div className={styles.itemPrice}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.detailSection}>
                  <h2 className={styles.detailTitle}>Resumen del pedido</h2>
                  <div className={styles.card} style={{ marginBottom: 0 }}>
                    <div className={styles.summaryRow}>
                      <span>Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Envío</span>
                      <span>${order.shippingCost.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryTotal}>
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.detailSection}>
                  <h2 className={styles.detailTitle}>Envío</h2>
                  <div className={styles.addressBox}>
                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </div>
                    <div>{order.shippingAddress.addressLine1}</div>
                    {order.shippingAddress.addressLine2 && <div>{order.shippingAddress.addressLine2}</div>}
                    <div>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </div>
                    <div>{order.shippingAddress.country}</div>
                    <div style={{ marginTop: '0.5rem', fontWeight: 500 }}>
                      Método: {order.shippingOption.label}
                    </div>
                  </div>
                </div>

                <div className={styles.detailSection}>
                  <h2 className={styles.detailTitle}>Detalles del pago</h2>
                  <div className={styles.methodBox}>
                    Tarjeta de crédito terminada en {order.paymentLast4}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.card} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>Pedido no encontrado</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              El pedido que buscas no existe o no tienes acceso a él.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
