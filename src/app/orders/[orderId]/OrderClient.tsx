'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { app } from '@/config/firebase';
import { getOrderById } from '@/services/orders';
import { Button } from '@/components/ui/Button';
import type { OrderDetails } from '@/services/orders';

export default function OrderClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    const initAuth = async () => {
      const { getAuth } = await import('firebase/auth');
      setAuth(getAuth(app));
    };
    initAuth();
  }, []);

  useEffect(() => {
    async function fetchOrder() {
      if (!auth) return;

      try {
        const user = auth.currentUser;
        if (!user) {
          router.push('/login');
          return;
        }

        const orderData = await getOrderById(orderId);
        if (orderData && orderData.userId === user.uid) {
          setOrder(orderData);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        setError('Error loading order');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId, router, auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !order) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">{error || 'Order not found'}</h2>
        <Button onClick={() => router.push('/menu')}>
          Return to Menu
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: OrderDetails['orderStatus']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'preparing':
        return 'text-blue-500';
      case 'ready':
        return 'text-green-500';
      case 'delivering':
        return 'text-purple-500';
      case 'delivered':
        return 'text-green-700';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order Details</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Order Status</h2>
            <span className={`font-medium ${getStatusColor(order.orderStatus)}`}>
              {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Delivery Address</h3>
              <p className="text-gray-600">
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Contact Information</h3>
              <p className="text-gray-600">
                Email: {order.contactInfo.email}<br />
                Phone: {order.contactInfo.phone}
              </p>
            </div>

            {order.specialInstructions && (
              <div>
                <h3 className="font-medium text-gray-700">Special Instructions</h3>
                <p className="text-gray-600">{order.specialInstructions}</p>
              </div>
            )}

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Order Items</h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₱{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={() => router.push('/menu')} variant="outline">
            Return to Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
