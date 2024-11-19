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

const formatDate = (timestamp: Timestamp | null) => {
  if (!timestamp) return 'N/A';
  try {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch (error) {
    logger.error('Error formatting date:', error);
    return 'N/A';
  }
};

const getStatusColor = (status: OrderData['status'] | OrderData['paymentStatus'] | undefined) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };
  return status ? colors[status] : 'bg-gray-100 text-gray-800';
};

const formatStatus = (status: string | undefined): string => {
  if (!status) return 'N/A';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const formatPrice = (amount: number | undefined): string => {
  if (amount === undefined) return '₱0.00';
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(amount);
};

export default function OrderStatusClient({ orderId }: OrderStatusClientProps) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          setOrder({
            ...orderSnap.data() as OrderData,
            createdAt: orderSnap.data().createdAt as Timestamp,
          });
        } else {
          setError('Order not found');
        }
      } catch (err) {
        logger.error('Error fetching order:', err);
        setError('Failed to load order');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">{error || 'Order not found'}</h2>
        <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Order Status</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                Status: 
                <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {formatStatus(order.status)}
                </span>
              </p>
              <p className="text-gray-600">Total Amount: <span className="text-gray-900">{formatPrice(order.totalAmount)}</span></p>
              {order.paymentStatus && (
                <p className="text-gray-600">
                  Payment Status: 
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(order.paymentStatus)}`}>
                    {formatStatus(order.paymentStatus)}
                  </span>
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
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.notes && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Notes</h2>
            <p className="text-gray-600">{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
