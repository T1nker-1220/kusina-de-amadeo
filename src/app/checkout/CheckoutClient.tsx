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
import { serverTimestamp } from 'firebase/firestore';
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

export default function CheckoutClient() {
  const { user, loading: authLoading } = useAuth();
  const { items: cart } = useCart();
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
    if (!user || !cart) {
      setOrderStatus({
        loading: false,
        error: 'Unable to process order. Please try again.',
        success: false,
      });
      return;
    }

    setOrderStatus({ loading: true, error: null, success: false });
    try {
      const orderData: OrderDetails = {
        userId: user.uid,
        items: cart,
        totalAmount: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
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
        paymentStatus: 'pending',
        orderStatus: 'pending',
        specialInstructions: formData.notes,
        orderType: formData.orderType,
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
      };

      // Create the order
      const orderId = await createOrder(orderData);

      // Clear the cart
      await clearCart(user.uid);

      setOrderStatus({
        loading: false,
        error: null,
        success: true,
      });

      // Redirect to order confirmation page
      router.push(`/orders/${orderId}`);
    } catch (error) {
      logger.error('Error creating order:', error);
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
    router.push('/login');
    return null;
  }

  if (!cart || cart.length === 0) {
    router.push('/menu');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-white rounded-lg shadow p-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">₱{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₱{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
          <CheckoutForm onSubmit={handleSubmit} loading={orderStatus.loading} />
        </div>
      </div>

      {orderStatus.error && (
        <Toast
          type="error"
          message={orderStatus.error}
          onClose={() => setOrderStatus(prev => ({ ...prev, error: null }))}
        />
      )}
    </div>
  );
}
