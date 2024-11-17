"use client";
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import CheckoutForm from '@/components/CheckoutForm';
import Toast from '@/components/ui/Toast';
import { createOrder } from '@/services/orders';
import { useRouter } from 'next/navigation';
import { logger } from '@/utils/logger';

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const cart = useCart();
  const [orderStatus, setOrderStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    if (!user || !cart) return;

    setOrderStatus({ loading: true, error: null, success: false });
    try {
      const order = {
        userId: user.uid,
        items: cart.items,
        total: cart.getTotal(),
        status: 'pending',
        ...formData,
      };

      const orderId = await createOrder(order);
      cart.clearCart();
      
      setOrderStatus({ loading: false, error: null, success: true });
      router.push(`/order-status/${orderId}`);
    } catch (error) {
      logger.error('Checkout error:', error);
      setOrderStatus({
        loading: false,
        error: 'Failed to create order. Please try again.',
        success: false,
      });
    }
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/sign-in?returnUrl=/checkout');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {cart.items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl">Your cart is empty</p>
          <button
            onClick={() => router.push('/menu')}
            className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.quantity}x {item.name}</span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>₱{cart.getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <CheckoutForm onSubmit={handleSubmit} />
        </>
      )}

      {orderStatus.error && (
        <Toast
          message={orderStatus.error}
          type="error"
          onClose={() => setOrderStatus(prev => ({ ...prev, error: null }))}
        />
      )}
    </div>
  );
}
