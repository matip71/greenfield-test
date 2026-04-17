import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ROUTES from '@/routes';
import styles from './Auth.module.css';

export default function ForgotPasswordPage() {
  const { state: authState } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    document.title = 'Olvidé mi contraseña — ShopCo';
  }, []);

  // Guard: if already signed in, go to account
  if (authState.isAuthenticated) {
    return <Navigate to={ROUTES.ACCOUNT.path} replace />;
  }

  const onSubmit = () => {
    // Show success message regardless of email existence (security best practice)
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Restablecer contraseña</h1>
        <p className={styles.subtitle}>
          {submitted
            ? 'Revisa tu bandeja de entrada'
            : 'Ingresa tu correo electrónico para recibir un enlace de restablecimiento'}
        </p>

        {submitted ? (
          <>
            <div className={styles.successMessage}>
              Si ese correo electrónico está registrado, recibirás un enlace de restablecimiento en breve.
            </div>
            <div className={styles.footer}>
              <Link to={ROUTES.SIGN_IN.path} className={styles.link}>Volver a iniciar sesión</Link>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Correo electrónico</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'El correo electrónico es obligatorio',
                  pattern: { value: /.+@.+\..+/, message: 'Dirección de correo electrónico no válida' }
                })}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              />
              {errors.email && <span className={styles.errorText}>{errors.email.message?.toString()}</span>}
            </div>

            <button type="submit" className={styles.submitBtn}>
              Enviar enlace de restablecimiento
            </button>

            <div className={styles.footer}>
              ¿Recuerdas tu contraseña? <Link to={ROUTES.SIGN_IN.path} className={styles.link}>Iniciar sesión</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
