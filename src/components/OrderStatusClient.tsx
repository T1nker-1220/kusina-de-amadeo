'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { logger } from '../utils/logger';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface OrderData {
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  createdAt: Timestamp;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  paymentMethod?: string;
  notes?: string;
}

interface OrderStatusClientProps {
  orderId: string;
}

const formatDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const getStatusColor = (status: OrderData['status']) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status] || colors.pending;
};

export default function OrderStatusClient({ orderId }: OrderStatusClientProps) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setError('Invalid order ID');
        setLoading(false);
        return;
      }

      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (!orderSnap.exists()) {
          setError('Order not found');
          return;
        }

        const orderData = orderSnap.data() as OrderData;
        setOrder(orderData);
      } catch (err) {
        logger.error('Error fetching order:', err);
        setError('Failed to fetch order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          <p>Order not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Status</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Order Details</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Order ID: <span className="text-gray-900">{orderId}</span></p>
              <p className="text-gray-600">
                Status: 
                <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
              <p className="text-gray-600">Total Amount: <span className="text-gray-900">₱{order.totalAmount.toFixed(2)}</span></p>
              {order.paymentStatus && (
                <p className="text-gray-600">
                  Payment Status: 
                  <span className="ml-2 capitalize">{order.paymentStatus}</span>
                </p>
              )}
              {order.paymentMethod && (
                <p className="text-gray-600">
                  Payment Method: 
                  <span className="ml-2 capitalize">{order.paymentMethod}</span>
                </p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Name: <span className="text-gray-900">{order.customerName}</span></p>
              <p className="text-gray-600">Email: <span className="text-gray-900">{order.customerEmail}</span></p>
              <p className="text-gray-600">Date: <span className="text-gray-900">{formatDate(order.createdAt)}</span></p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Order Items</h2>
          <div className="border rounded-lg overflow-hidden">
            <div className="divide-y">
              {order.items.map((item, index) => (
                <div key={item.id || index} className="flex justify-between p-3 hover:bg-gray-50">
                  <div className="flex items-center">
                    {item.imageUrl && (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                    )}
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">x {item.quantity}</span>
                    </div>
                  </div>
                  <span className="text-gray-900">₱{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>₱{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {order.notes && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Notes</h2>
            <p className="text-gray-600">{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
