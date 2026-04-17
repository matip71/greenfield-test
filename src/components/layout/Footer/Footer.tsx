import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  Tienda: [
    { label: 'Todos los productos', to: '/products' },
    { label: 'Ropa', to: '/products?category=clothing' },
    { label: 'Calzado', to: '/products?category=footwear' },
    { label: 'Accesorios', to: '/products?category=accessories' },
    { label: 'Electrónica', to: '/products?category=electronics' },
  ],
  Cuenta: [
    { label: 'Iniciar sesión', to: '/auth/sign-in' },
    { label: 'Crear cuenta', to: '/auth/sign-up' },
    { label: 'Mis pedidos', to: '/account/orders' },
    { label: 'Perfil', to: '/account' },
  ],
  Nosotros: [
    { label: 'Nuestra historia', to: '/' },
    { label: 'Sustentabilidad', to: '/' },
    { label: 'Empleos', to: '/' },
    { label: 'Contacto', to: '/' },
  ],
} as const;

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className={styles.footer}>
      <div className={['container', styles.inner].join(' ')}>
        {/* Brand + Newsletter */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>◆</span>
            ShopCo
          </Link>
          <p className={styles.tagline}>
            Productos premium, cuidadosamente seleccionados para la vida moderna.
          </p>
          <div className={styles.newsletter}>
            <h4 className={styles.newsletterTitle}>Mantente informado</h4>
            {subscribed ? (
              <p className={styles.success}>
                ✓ ¡Estás en la lista! Gracias por suscribirte.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.form}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className={styles.emailInput}
                  aria-label="Correo electrónico para newsletter"
                  id="footer-newsletter-email"
                />
                <button type="submit" className={styles.subscribeBtn} id="footer-subscribe-btn">
                  Suscribirse
                </button>
                {error && <span className={styles.error}>{error}</span>}
              </form>
            )}
          </div>
        </div>

        {/* Link Groups */}
        <div className={styles.links}>
          {(Object.entries(FOOTER_LINKS) as [string, readonly { label: string; to: string }[]][]).map(([group, items]) => (
            <div key={group} className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>{group}</h4>
              <ul className={styles.linkList}>
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className={styles.link}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.legal}>
            © {new Date().getFullYear()} ShopCo. Todos los derechos reservados.
          </p>
          <div className={styles.bottomLinks}>
            <Link to="/" className={styles.bottomLink}>Política de privacidad</Link>
            <Link to="/" className={styles.bottomLink}>Términos de servicio</Link>
            <Link to="/" className={styles.bottomLink}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
