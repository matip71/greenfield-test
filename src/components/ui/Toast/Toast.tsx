import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Toast.module.css';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const show = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => {
      cancelAnimationFrame(show);
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const icons: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <div
      className={[styles.toast, styles[type], visible ? styles.visible : ''].join(' ')}
      role="alert"
      aria-live="polite"
    >
      <span className={styles.icon} aria-hidden="true">{icons[type]}</span>
      <span className={styles.message}>{message}</span>
    </div>
  );
}

/* ---- Toast Container / Manager ---- */
interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className={styles.container} aria-label="Notifications">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => onRemove(t.id)} />
      ))}
    </div>
  );
}

/* ---- useToast hook ---- */
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function addToast(message: string, type: ToastType = 'success') {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return { toasts, addToast, removeToast };
}

export type { ToastType, ToastItem };

// Re-export for convenience
export type ToastContainerNode = ReactNode;
