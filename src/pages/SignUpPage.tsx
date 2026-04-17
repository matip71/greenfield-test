import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getUserByEmail, saveUser } from '@/data/users';
import ROUTES from '@/routes';
import styles from './Auth.module.css';

export default function SignUpPage() {
  const { state: authState, signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  useEffect(() => {
    document.title = 'Crear cuenta — ShopCo';
  }, []);

  // Guard: if already signed in, go to account
  if (authState.isAuthenticated) {
    return <Navigate to={ROUTES.ACCOUNT.path} replace />;
  }

  const onSubmit = async (data: any) => {
    // Check if email exists
    if (getUserByEmail(data.email)) {
      setError('email', { type: 'manual', message: 'Ya existe una cuenta con este correo electrónico' });
      return;
    }

    // Save mock user
    const newUser = saveUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    // Sign in via context
    signUp(newUser);

    // Redirect to account
    navigate(ROUTES.ACCOUNT.path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear una cuenta</h1>
        <p className={styles.subtitle}>Únete a shopco para gestionar tus pedidos</p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>Nombre</label>
            <input
              id="firstName"
              type="text"
              {...register('firstName', { required: 'El nombre es obligatorio' })}
              className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
            />
            {errors.firstName && <span className={styles.errorText}>{errors.firstName.message?.toString()}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>Apellido</label>
            <input
              id="lastName"
              type="text"
              {...register('lastName', { required: 'El apellido es obligatorio' })}
              className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
            />
            {errors.lastName && <span className={styles.errorText}>{errors.lastName.message?.toString()}</span>}
          </div>

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

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
              })}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            />
            {errors.password && <span className={styles.errorText}>{errors.password.message?.toString()}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Por favor, confirma tu contraseña',
                validate: value => value === password || 'Las contraseñas no coinciden'
              })}
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
            />
            {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message?.toString()}</span>}
          </div>

          <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <div className={styles.footer}>
          ¿Ya tienes una cuenta? <Link to={ROUTES.SIGN_IN.path} className={styles.link}>Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
}
