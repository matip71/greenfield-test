import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { updateUser } from '@/data/users';
import styles from './Account.module.css';

export default function AccountPage() {
  const { state: authState, updateProfile } = useAuth();
  const user = authState.user;
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  });

  useEffect(() => {
    document.title = 'Mi cuenta — ShopCo';
  }, []);

  const onSubmit = (data: any) => {
    if (!user) return;

    // Update in local storage
    updateUser({
      ...user,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    // Update in context
    updateProfile({ firstName: data.firstName, lastName: data.lastName });

    // Show success
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (!user) return null;

  return (
    <div className={styles.layout}>
      <AccountSidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Perfil de la cuenta</h1>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Información personal</h2>

          {success && (
            <div className={styles.successMessage}>
              ¡Perfil actualizado exitosamente!
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className={styles.input}
              />
              <span className={styles.label} style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                El correo electrónico no se puede cambiar
              </span>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.label}>Nombre</label>
              <input
                id="firstName"
                type="text"
                {...register('firstName', { required: 'El nombre es obligatorio' })}
                className={styles.input}
                style={errors.firstName ? { borderColor: 'var(--error-color)' } : {}}
              />
              {errors.firstName && (
                <span className={styles.label} style={{ color: 'var(--error-color)', fontSize: '0.75rem' }}>
                  {errors.firstName.message?.toString()}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.label}>Apellido</label>
              <input
                id="lastName"
                type="text"
                {...register('lastName', { required: 'El apellido es obligatorio' })}
                className={styles.input}
                style={errors.lastName ? { borderColor: 'var(--error-color)' } : {}}
              />
              {errors.lastName && (
                <span className={styles.label} style={{ color: 'var(--error-color)', fontSize: '0.75rem' }}>
                  {errors.lastName.message?.toString()}
                </span>
              )}
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.saveBtn}>
              {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
