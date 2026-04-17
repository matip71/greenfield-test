import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ROUTES from '@/routes';
import styles from './AccountSidebar.module.css';

export function AccountSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate(ROUTES.LANDING.path);
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink
          to={ROUTES.ACCOUNT.path}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
          end
        >
          Perfil
        </NavLink>
        <NavLink
          to={ROUTES.ORDER_HISTORY.path}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
        >
          Historial de pedidos
        </NavLink>
        <button onClick={handleSignOut} className={styles.signOutBtn}>
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
