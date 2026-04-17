import { useForm } from 'react-hook-form';
import type { ShippingAddress } from '@/data/types';
import { Input } from '@/components/ui/Input/Input';
import styles from './steps.module.css';

interface ShippingAddressStepProps {
  defaultValues?: Partial<ShippingAddress>;
  onSubmit: (data: ShippingAddress) => void;
}

const COUNTRIES = [
  'Estados Unidos', 'Canadá', 'Reino Unido', 'Australia',
  'Alemania', 'Francia', 'España', 'Argentina', 'Brasil', 'Uruguay',
];

export function ShippingAddressStep({ defaultValues, onSubmit }: ShippingAddressStepProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingAddress>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <h2 className={styles.stepTitle}>Dirección de envío</h2>

      <div className={styles.row2}>
        <Input
          label="Nombre"
          id="check-firstName"
          required
          placeholder="María"
          error={errors.firstName?.message}
          {...register('firstName', { required: 'El nombre es obligatorio' })}
        />
        <Input
          label="Apellido"
          id="check-lastName"
          required
          placeholder="Pérez"
          error={errors.lastName?.message}
          {...register('lastName', { required: 'El apellido es obligatorio' })}
        />
      </div>

      <Input
        label="Dirección línea 1"
        id="check-addressLine1"
        required
        placeholder="Calle Principal 123"
        error={errors.addressLine1?.message}
        {...register('addressLine1', { required: 'La dirección es obligatoria' })}
      />

      <Input
        label="Dirección línea 2"
        id="check-addressLine2"
        placeholder="Apartamento, suite, etc. (opcional)"
        {...register('addressLine2')}
      />

      <div className={styles.row2}>
        <Input
          label="Ciudad"
          id="check-city"
          required
          placeholder="Nueva York"
          error={errors.city?.message}
          {...register('city', { required: 'La ciudad es obligatoria' })}
        />
        <Input
          label="Estado / Región"
          id="check-state"
          required
          placeholder="NY"
          error={errors.state?.message}
          {...register('state', { required: 'El estado es obligatorio' })}
        />
      </div>

      <div className={styles.row2}>
        <Input
          label="Código postal"
          id="check-postalCode"
          required
          placeholder="10001"
          error={errors.postalCode?.message}
          {...register('postalCode', { required: 'El código postal es obligatorio' })}
        />
        <div className={styles.field}>
          <label className={styles.label} htmlFor="check-country">
            País <span className={styles.required} aria-hidden="true">*</span>
          </label>
          <select
            id="check-country"
            className={[styles.select, errors.country ? styles.selectError : ''].join(' ')}
            {...register('country', { required: 'El país es obligatorio' })}
          >
            <option value="">Seleccionar país…</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <span className={styles.error}>{errors.country.message}</span>}
        </div>
      </div>

      <button type="submit" className={styles.continueBtn} id="checkout-step1-continue">
        Continuar a método de envío →
      </button>
    </form>
  );
}
