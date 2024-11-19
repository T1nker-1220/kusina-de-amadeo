"use client";
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import CheckoutForm from '@/components/CheckoutForm';
import Toast from '@/components/ui/Toast';
import { createOrder } from '@/services/orders';
import { useRouter } from 'next/navigation';
import { logger } from '@/utils/logger';
import { withAuth } from '@/components/auth/withAuth';
import type { OrderDetails } from '@/services/orders';

interface FormData {
  name: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod: 'cod' | 'gcash';
  orderType: 'now' | 'preorder';
  deliveryDate?: string;
  deliveryTime?: string;
}

export default withAuth(function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const { items, getTotal, clearCart } = useCart();
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

  const handleSubmit = async (formData: FormData) => {
    if (!user || !items) return;

    setOrderStatus({ loading: true, error: null, success: false });
    try {
      const order: OrderDetails = {
        userId: user.uid,
        items,
        totalAmount: getTotal(),
        shippingAddress: {
          street: formData.address,
          city: 'Amadeo',
          state: 'Cavite',
          zipCode: '4119',
        },
        contactInfo: {
          email: user.email || '',
          phone: formData.phone,
        },
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'pending' as const,
        orderStatus: 'pending' as const,
        specialInstructions: formData.notes,
        orderType: formData.orderType,
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
      };

      const orderId = await createOrder(order);
      await clearCart();
      
      setOrderStatus({ loading: false, error: null, success: true });
      router.push(`/orders/${orderId}`);
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
      
      {!items || items.length === 0 ? (
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
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.quantity}x {item.name}</span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>₱{getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <CheckoutForm onSubmit={handleSubmit} loading={orderStatus.loading} />
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
});
