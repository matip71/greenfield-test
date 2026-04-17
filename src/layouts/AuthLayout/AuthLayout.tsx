import { Outlet, Link } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export function AuthLayout() {
  return (
    <div className={styles.layout}>
      {/* Minimal header — logo only, no nav */}
      <header className={styles.header}>
        <Link to="/" className={styles.logo} aria-label="ShopCo home">
          <span className={styles.logoIcon}>◆</span>
          ShopCo
        </Link>
      </header>

      <main className={styles.main} id="main-content">
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p className={styles.legal}>
          © {new Date().getFullYear()} ShopCo. All rights reserved.
          {' · '}
          <Link to="/" className={styles.link}>Privacy</Link>
          {' · '}
          <Link to="/" className={styles.link}>Terms</Link>
        </p>
      </footer>
    </div>
  );
}
