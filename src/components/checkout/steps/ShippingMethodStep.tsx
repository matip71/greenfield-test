import { useState } from 'react';
import type { ShippingOption } from '@/data/types';
import styles from './steps.module.css';

// Explicit constant — matches spec
export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    label: 'Envío estándar',
    description: 'Entregado en 5-7 días hábiles',
    price: 0,
    estimatedDays: '5-7 días hábiles',
  },
  {
    id: 'express',
    label: 'Envío exprés',
    description: 'Entregado en 1-2 días hábiles',
    price: 9.99,
    estimatedDays: '1-2 días hábiles',
  },
];

interface ShippingMethodStepProps {
  selectedId?: string;
  onSubmit: (option: ShippingOption) => void;
  onBack: () => void;
}

export function ShippingMethodStep({ selectedId, onSubmit, onBack }: ShippingMethodStepProps) {
  const [selected, setSelected] = useState<string>(selectedId ?? SHIPPING_OPTIONS[0].id);

  function handleContinue() {
    const option = SHIPPING_OPTIONS.find((o) => o.id === selected)!;
    onSubmit(option);
  }

  return (
    <div>
      <h2 className={styles.stepTitle}>Método de envío</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        {SHIPPING_OPTIONS.map((opt) => {
          const isActive = opt.id === selected;
          return (
            <button
              key={opt.id}
              type="button"
              className={[styles.optionCard, isActive ? styles.optionActive : ''].join(' ')}
              onClick={() => setSelected(opt.id)}
              aria-pressed={isActive}
              id={`shipping-option-${opt.id}`}
            >
              <div className={styles.optionRadio}>
                {isActive && <div className={styles.optionRadioInner} />}
              </div>
              <div className={styles.optionInfo}>
                <p className={styles.optionLabel}>{opt.label}</p>
                <p className={styles.optionDesc}>{opt.description}</p>
              </div>
              <span className={[styles.optionPrice, opt.price === 0 ? styles.freePrice : ''].join(' ')}>
                {opt.price === 0 ? 'Gratis' : `$${opt.price.toFixed(2)}`}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <button type="button" className={styles.continueBtn} onClick={handleContinue} id="checkout-step2-continue">
          Continuar al pago →
        </button>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          ← Volver a Dirección de envío
        </button>
      </div>
    </div>
  );
}
