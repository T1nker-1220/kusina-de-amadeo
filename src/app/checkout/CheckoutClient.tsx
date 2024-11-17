'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import CheckoutForm from '@/components/CheckoutForm';
import Toast from '@/components/ui/Toast';
import { createOrder } from '@/services/orders';
import { clearCart } from '@/services/cart';
import { useRouter } from 'next/navigation';
import { logger } from '@/utils/logger';

export default function CheckoutClient() {
  const { user, loading: authLoading } = useAuth();
  const { cart, loading: cartLoading, error: cartError } = useCart();
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
        total: cart.total || 0,
        status: 'pending',
        ...formData,
      };

      const orderId = await createOrder(order);
      await clearCart(user.uid);
      
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

  if (authLoading || cartLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Please sign in to checkout</p>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">Error loading cart: {cartError}</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">₱{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-bold">
                <p>Total</p>
                <p>₱{cart.total}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <CheckoutForm onSubmit={handleSubmit} loading={orderStatus.loading} />
        </div>
      </div>
      {orderStatus.error && (
        <Toast
          message={orderStatus.error}
          type="error"
          onClose={() => setOrderStatus(prev => ({ ...prev, error: null }))}
        />
      )}
      {orderStatus.success && (
        <Toast
          message="Order placed successfully!"
          type="success"
          onClose={() => setOrderStatus(prev => ({ ...prev, success: false }))}
        />
      )}
    </div>
  );
}
