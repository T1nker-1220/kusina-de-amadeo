'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useOrderTracking } from '@/hooks/useOrderTracking';
import { getOrderById } from '@/services/orders';
import { Button } from '@/components/ui/Button';
import { OrderDetails } from '@/services/orders';

export default function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const router = useRouter();
  const { user } = useAuth();
  const { orderStatus, loading: trackingLoading } = useOrderTracking(params.orderId);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    async function fetchOrder() {
      try {
        const orderData = await getOrderById(params.orderId);
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
  }, [params.orderId, user, router]);

  if (loading || trackingLoading) {
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

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      delivering: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Order Confirmation</h1>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(orderStatus?.status || order.orderStatus)}`}>
            {orderStatus?.status || order.orderStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Details */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">Order ID:</span> {params.orderId}</p>
              <p><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
              <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
              <p><span className="font-semibold">Payment Status:</span> {order.paymentStatus}</p>
            </div>
          </section>

          {/* Delivery Details */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
            <div className="space-y-2">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p><span className="font-semibold">Email:</span> {order.contactInfo.email}</p>
              <p><span className="font-semibold">Phone:</span> {order.contactInfo.phone}</p>
            </div>
          </section>
        </div>

        {/* Order Items */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">₱{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 font-bold">
              <p>Total</p>
              <p>₱{order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </section>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Special Instructions</h2>
            <p className="text-gray-700">{order.specialInstructions}</p>
          </section>
        )}

        {/* Estimated Delivery Time */}
        {orderStatus?.estimatedDeliveryTime && (
          <section className="mt-8 p-4 bg-green-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Estimated Delivery Time</h2>
            <p className="text-green-800">
              {new Date(orderStatus.estimatedDeliveryTime).toLocaleTimeString()}
            </p>
          </section>
        )}

        {/* Status Timeline */}
        {orderStatus?.statusHistory && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Order Timeline</h2>
            <div className="space-y-4">
              {orderStatus.statusHistory.map((status, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary mr-4"></div>
                  <div>
                    <p className="font-semibold">{status.status}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(status.timestamp).toLocaleString()}
                    </p>
                    {status.note && (
                      <p className="text-sm text-gray-700 mt-1">{status.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 flex justify-between">
          <Button onClick={() => router.push('/menu')} variant="outline">
            Continue Shopping
          </Button>
          <Button onClick={() => router.push('/orders')} variant="primary">
            View All Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
