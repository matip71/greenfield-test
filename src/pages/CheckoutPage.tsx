import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress/CheckoutProgress';
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary/CheckoutSummary';
import { ShippingAddressStep } from '@/components/checkout/steps/ShippingAddressStep';
import { ShippingMethodStep, SHIPPING_OPTIONS } from '@/components/checkout/steps/ShippingMethodStep';
import { PaymentStep } from '@/components/checkout/steps/PaymentStep';
import { saveOrder, setLastOrder } from '@/data/orders';
import type { ShippingAddress, ShippingOption, Order } from '@/data/types';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { state: cartState, subtotal, clearCart } = useCart();
  const { state: authState } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [shippingOption, setShippingOption] = useState<ShippingOption>(SHIPPING_OPTIONS[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Pago — ShopCo';
  }, []);

  // Guard: redirect to cart if empty
  if (cartState.items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function handleAddressSubmit(data: ShippingAddress) {
    setShippingAddress(data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleShippingSubmit(option: ShippingOption) {
    setShippingOption(option);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePaymentSubmit(last4: string) {
    if (!shippingAddress) return;
    setLoading(true);

    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId: authState.user?.id ?? 'guest',
      items: [...cartState.items],
      shippingAddress,
      shippingOption,
      paymentLast4: last4,
      subtotal,
      shippingCost: shippingOption.price,
      total: subtotal + shippingOption.price,
      status: 'processing',
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    setLastOrder(order);
    clearCart();

    setTimeout(() => {
      setLoading(false);
      navigate('/order/confirmation', { replace: true });
    }, 800);
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.pageTitle}>Pago</h1>
        <div className={styles.layout}>
          {/* Left: steps */}
          <div className={styles.stepsCol}>
            <CheckoutProgress currentStep={step} />

            {step === 1 && (
              <ShippingAddressStep
                defaultValues={shippingAddress ?? undefined}
                onSubmit={handleAddressSubmit}
              />
            )}
            {step === 2 && (
              <ShippingMethodStep
                selectedId={shippingOption.id}
                onSubmit={handleShippingSubmit}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <PaymentStep
                onSubmit={handlePaymentSubmit}
                onBack={() => setStep(2)}
                loading={loading}
              />
            )}
          </div>

          {/* Right: order summary */}
          <div className={styles.summaryCol}>
            <CheckoutSummary selectedShipping={shippingOption} />
          </div>
        </div>
      </div>
    </div>
  );
}
