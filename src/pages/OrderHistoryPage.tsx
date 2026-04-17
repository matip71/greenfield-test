import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { getOrdersByUserId } from '@/data/orders';
import type { Order } from '@/data/types';
import ROUTES from '@/routes';
import styles from './Account.module.css';

export default function OrderHistoryPage() {
  const { state: authState } = useAuth();
  const user = authState.user;
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    document.title = 'Historial de pedidos — ShopCo';
    if (user) {
      setOrders(getOrdersByUserId(user.id));
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className={styles.layout}>
      <AccountSidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Historial de pedidos</h1>

        {orders.length === 0 ? (
          <div className={styles.card} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>Aún no hay pedidos</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Cuando realices pedidos, aparecerán aquí.
            </p>
            <Link
              to={ROUTES.CATALOG.path}
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--primary-color, #000000)',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 600
              }}
            >
              Empezar a comprar
            </Link>
          </div>
        ) : (
          <div className={styles.orderList}>
            {orders.map((order) => (
              <Link
                key={order.id}
                to={ROUTES.ORDER_DETAIL.path.replace(':id', order.id)}
                className={styles.orderCard}
              >
                <div className={styles.orderInfo}>
                  <div className={styles.orderNumber}>Pedido #{order.id.slice(0, 8).toUpperCase()}</div>
                  <div className={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </div>
                  <div className={styles.orderTotal}>${order.total.toFixed(2)}</div>
                </div>
                <div>
                  <span className={styles.orderStatus}>{order.status}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
