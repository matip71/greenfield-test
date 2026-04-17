import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

export function Header() {
  const { itemCount } = useCart();
  const { state: authState } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Detect scroll for header shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [drawerOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}>
        <div className={['container', styles.inner].join(' ')}>
          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={closeDrawer} aria-label="ShopCo home">
            <span className={styles.logoIcon}>◆</span>
            ShopCo
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Navegación principal">
            <Link to="/products" className={styles.navLink}>Tienda</Link>
            <Link to="/products?category=clothing" className={styles.navLink}>Ropa</Link>
            <Link to="/products?category=footwear" className={styles.navLink}>Calzado</Link>
            <Link to="/products?category=accessories" className={styles.navLink}>Accesorios</Link>
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            <Link
              to={authState.isAuthenticated ? '/account' : '/auth/sign-in'}
              className={styles.actionBtn}
              aria-label="Cuenta"
              id="header-account-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            <Link
              to="/cart"
              className={styles.cartBtn}
              aria-label={`Carrito, ${itemCount} artículo${itemCount !== 1 ? 's' : ''}`}
              id="header-cart-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setDrawerOpen((v) => !v)}
              aria-expanded={drawerOpen}
              aria-controls="nav-drawer"
              aria-label="Alternar menú de navegación"
              id="hamburger-btn"
            >
              <span className={[styles.hamburgerLine, drawerOpen ? styles.open : ''].join(' ')} />
              <span className={[styles.hamburgerLine, drawerOpen ? styles.open : ''].join(' ')} />
              <span className={[styles.hamburgerLine, drawerOpen ? styles.open : ''].join(' ')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={[styles.overlay, drawerOpen ? styles.overlayVisible : ''].join(' ')}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      {/* Mobile Drawer */}
      <div
        id="nav-drawer"
        ref={drawerRef}
        className={[styles.drawer, drawerOpen ? styles.drawerOpen : ''].join(' ')}
        aria-hidden={!drawerOpen}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerLogo}>
            <span className={styles.logoIcon}>◆</span> ShopCo
          </span>
          <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Cerrar menú">✕</button>
        </div>
        <nav className={styles.drawerNav} aria-label="Navegación móvil" onClick={closeDrawer}>
          <Link to="/products" className={styles.drawerLink}>Ver todo</Link>
          <Link to="/products?category=clothing" className={styles.drawerLink}>Ropa</Link>
          <Link to="/products?category=footwear" className={styles.drawerLink}>Calzado</Link>
          <Link to="/products?category=accessories" className={styles.drawerLink}>Accesorios</Link>
          <Link to="/products?category=electronics" className={styles.drawerLink}>Electrónica</Link>
          <Link to="/products?category=home-living" className={styles.drawerLink}>Hogar</Link>
          <Link to="/products?category=sports" className={styles.drawerLink}>Deportes</Link>
          <div className={styles.drawerDivider} />
          <Link
            to={authState.isAuthenticated ? '/account' : '/auth/sign-in'}
            className={styles.drawerLink}
          >
            {authState.isAuthenticated ? `Cuenta (${authState.user?.firstName})` : 'Iniciar sesión'}
          </Link>
          <Link to="/cart" className={styles.drawerLink}>
            Carrito {itemCount > 0 && `(${itemCount})`}
          </Link>
        </nav>
        <div className={styles.drawerFooter}>
          {!authState.isAuthenticated && (
            <button
              className={styles.drawerSignUp}
              onClick={() => { navigate('/auth/sign-up'); closeDrawer(); }}
            >
              Crear cuenta
            </button>
          )}
        </div>
      </div>
    </>
  );
}
