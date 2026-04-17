import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { validateCredentials } from '@/data/users';
import ROUTES from '@/routes';
import styles from './Auth.module.css';

export default function SignInPage() {
  const { state: authState, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || ROUTES.ACCOUNT.path;

  useEffect(() => {
    document.title = 'Iniciar sesión — ShopCo';
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Guard: if already signed in, go to account
  if (authState.isAuthenticated) {
    return <Navigate to={ROUTES.ACCOUNT.path} replace />;
  }

  const onSubmit = async (data: any) => {
    const user = validateCredentials(data.email, data.password);

    if (!user) {
      setError('root.serverError', { type: 'manual', message: 'Correo electrónico o contraseña no válidos' });
      return;
    }

    // Sign in via context
    signIn(user);

    // Redirect
    navigate(redirectPath);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar sesión</h1>
        <p className={styles.subtitle}>Bienvenido de nuevo a shopco</p>

        {errors.root?.serverError && (
          <div className={styles.errorText} style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
            {errors.root.serverError.message?.toString()}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Correo electrónico</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'El correo electrónico es obligatorio' })}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message?.toString()}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'La contraseña es obligatoria' })}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            />
            {errors.password && <span className={styles.errorText}>{errors.password.message?.toString()}</span>}
          </div>

          <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
            <Link to={ROUTES.FORGOT_PASSWORD.path} className={styles.link} style={{ fontSize: '0.875rem' }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className={styles.footer}>
          ¿No tienes una cuenta? <Link to={ROUTES.SIGN_UP.path} className={styles.link}>Regístrate</Link>
        </div>
      </div>
    </div>
  );
}
