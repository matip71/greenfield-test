import styles from './CheckoutProgress.module.css';

const STEPS = [
  { id: 1, label: 'Dirección de envío' },
  { id: 2, label: 'Método de envío' },
  { id: 3, label: 'Pago' },
] as const;

interface CheckoutProgressProps {
  currentStep: number;
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <nav className={styles.nav} aria-label="Progreso de pago">
      <ol className={styles.steps}>
        {STEPS.map((step, idx) => {
          const isDone = step.id < currentStep;
          const isActive = step.id === currentStep;
          return (
            <li key={step.id} className={styles.stepItem}>
              <div
                className={[
                  styles.step,
                  isDone ? styles.done : '',
                  isActive ? styles.active : '',
                ].join(' ')}
                aria-current={isActive ? 'step' : undefined}
              >
                <div className={styles.circle}>
                  {isDone ? <span aria-hidden="true">✓</span> : step.id}
                </div>
                <span className={styles.label}>{step.label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={[styles.connector, isDone ? styles.connectorDone : ''].join(' ')}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
