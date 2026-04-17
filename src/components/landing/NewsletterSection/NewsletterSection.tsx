import { useState } from 'react';
import styles from './NewsletterSection.module.css';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <section className={styles.section} aria-labelledby="newsletter-heading">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.textBlock}>
            <span className={styles.eyebrow}>Únete a la comunidad</span>
            <h2 className={styles.title} id="newsletter-heading">
              Obtén 10% de descuento en tu primer pedido
            </h2>
            <p className={styles.description}>
              Suscríbete para acceso exclusivo a nuevos ingresos, consejos de estilo y ofertas exclusivas para miembros.
              Sin spam, cancela cuando quieras.
            </p>
          </div>

          <div className={styles.formBlock}>
            {subscribed ? (
              <div className={styles.success} role="status">
                <span className={styles.successIcon} aria-hidden="true">✓</span>
                <div>
                  <p className={styles.successTitle}>¡Ya estás dentro! 🎉</p>
                  <p className={styles.successSub}>Revisa tu bandeja de entrada para ver tu código de descuento.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.inputRow}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="Ingresa tu correo electrónico"
                    className={[styles.input, error ? styles.inputError : ''].join(' ')}
                    aria-label="Correo electrónico"
                    aria-invalid={!!error}
                    aria-describedby={error ? 'newsletter-error' : undefined}
                    id="newsletter-email-input"
                  />
                  <button type="submit" className={styles.btn} id="newsletter-subscribe-btn">
                    Suscribirse
                  </button>
                </div>
                {error && (
                  <p id="newsletter-error" className={styles.error} role="alert">{error}</p>
                )}
                <p className={styles.disclaimer}>
                  Al suscribirte aceptas nuestra{' '}
                  <a href="/" className={styles.link}>Política de privacidad</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
