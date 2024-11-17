'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { motion } from 'framer-motion';
import { logger } from '@/utils/logger';

interface OrderStatus {
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  timestamp: string;
}

interface Driver {
  name: string;
  phone: string;
  vehicleInfo?: string;
}

interface Order {
  id: string;
  status: OrderStatus;
  estimatedDeliveryTime?: string;
  driver?: Driver;
  customerName: string;
  address: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  specialInstructions?: string;
}

const statusSteps = [
  { key: 'pending', label: 'Order Placed' },
  { key: 'confirmed', label: 'Order Confirmed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' }
];

export default function OrderTracking({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'orders', orderId),
      (doc) => {
        if (doc.exists()) {
          setOrder({ id: doc.id, ...doc.data() } as Order);
        } else {
          setError('Order not found');
        }
        setLoading(false);
      },
      (error) => {
        logger.error('Error fetching order:', error);
        setError('Failed to fetch order details');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'Order not found'}</p>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status.status);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Order Status</h2>
        <p className="text-gray-600">Order ID: {order.id}</p>
      </div>

      {/* Status Timeline */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200"></div>
        <div className="space-y-8">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-center"
              >
                <div className="flex-1 text-right pr-4">
                  <p className={`font-medium ${isCompleted ? 'text-yellow-500' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 z-10
                    ${isCompleted 
                      ? 'bg-yellow-500 border-yellow-500' 
                      : 'bg-white border-gray-300'
                    }
                    ${isCurrent ? 'ring-4 ring-yellow-500/20' : ''}
                  `}
                ></div>
                <div className="flex-1 pl-4">
                  {isCurrent && (
                    <p className="text-sm text-gray-500">
                      {order.estimatedDeliveryTime 
                        ? `Estimated delivery: ${order.estimatedDeliveryTime}`
                        : 'Processing your order'}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Driver Information */}
      {order.driver && order.status.status === 'out_for_delivery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
        >
          <h3 className="font-semibold mb-2">Delivery Driver</h3>
          <div className="space-y-1">
            <p>Name: {order.driver.name}</p>
            <p>Phone: {order.driver.phone}</p>
            {order.driver.vehicleInfo && (
              <p>Vehicle: {order.driver.vehicleInfo}</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Order Details */}
      <div className="border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="font-semibold">Order Details</h3>
        <div className="space-y-2">
          <p>Customer: {order.customerName}</p>
          <p>Delivery Address: {order.address}</p>
          {order.specialInstructions && (
            <p>Special Instructions: {order.specialInstructions}</p>
          )}
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Items</h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.quantity}x {item.name}</span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 font-bold">
              <div className="flex justify-between">
                <span>Total</span>
                <span>₱{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
