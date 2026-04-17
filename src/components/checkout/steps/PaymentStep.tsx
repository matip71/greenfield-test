import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input/Input';
import styles from './steps.module.css';

interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface PaymentStepProps {
  onSubmit: (last4: string) => void;
  onBack: () => void;
  loading?: boolean;
}

export function PaymentStep({ onSubmit, onBack, loading = false }: PaymentStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>();

  function handleFormSubmit(data: PaymentFormData) {
    const digits = data.cardNumber.replace(/\s/g, '');
    onSubmit(digits.slice(-4));
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form} noValidate>
      <h2 className={styles.stepTitle}>Detalles del pago</h2>

      <Input
        label="Nombre del titular"
        id="check-cardholderName"
        required
        placeholder="María Pérez"
        error={errors.cardholderName?.message}
        {...register('cardholderName', { required: 'El nombre del titular es obligatorio' })}
      />

      <Input
        label="Número de tarjeta"
        id="check-cardNumber"
        required
        placeholder="1234 5678 9012 3456"
        inputMode="numeric"
        maxLength={19}
        error={errors.cardNumber?.message}
        {...register('cardNumber', {
          required: 'El número de tarjeta es obligatorio',
          validate: (v) =>
            v.replace(/\s/g, '').length === 16 || 'El número de tarjeta debe tener exactamente 16 dígitos',
        })}
      />

      <div className={styles.cardRow}>
        <Input
          label="Vencimiento (MM/AA)"
          id="check-expiry"
          required
          placeholder="08/27"
          maxLength={5}
          error={errors.expiry?.message}
          {...register('expiry', {
            required: 'El vencimiento es obligatorio',
            pattern: { value: /^\d{2}\/\d{2}$/, message: 'Usa el formato MM/AA' },
          })}
        />
        <Input
          label="CVV"
          id="check-cvv"
          required
          placeholder="123"
          maxLength={4}
          inputMode="numeric"
          error={errors.cvv?.message}
          {...register('cvv', {
            required: 'El CVV es obligatorio',
            pattern: { value: /^\d{3,4}$/, message: 'CVV de 3 o 4 dígitos' },
          })}
        />
      </div>

      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
        🔒 Esta es una demostración — no se procesan pagos reales.
      </p>

      <button
        type="submit"
        className={styles.placeOrderBtn}
        disabled={loading}
        id="checkout-place-order-btn"
      >
        {loading ? (
          <span style={{ width: '1.2rem', height: '1.2rem', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
        ) : (
          <><span aria-hidden="true">🛒</span> Realizar pedido</>
        )}
      </button>

      <button type="button" className={styles.backBtn} onClick={onBack} id="checkout-step3-back">
        ← Volver a Método de envío
      </button>
    </form>
  );
}
