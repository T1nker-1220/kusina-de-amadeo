'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { logger } from '@/utils/logger';
import { OrderDetails } from '@/services/orders';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderWithMetadata extends OrderDetails {
  id: string;
  orderNumber: string;
  createdAt: Timestamp;
}

const OrdersClient = () => {
  const [orders, setOrders] = useState<OrderWithMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const ordersQuery = query(
          collection(db, 'orders'),
          orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
          const ordersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as OrderWithMetadata[];

          setOrders(ordersData);
          setLoading(false);
        }, (error) => {
          logger.error('Error fetching orders:', error);
          setError('Failed to load orders. Please try again.');
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        logger.error('Error setting up orders listener:', error);
        setError('Failed to initialize orders tracking.');
        setLoading(false);
        return () => {};
      }
    };

    const unsubscribe = fetchOrders();
    return () => unsubscribe();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'pending') return ['pending', 'preparing', 'ready'].includes(order.orderStatus);
    if (filter === 'completed') return ['delivered', 'cancelled'].includes(order.orderStatus);
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <div className="flex gap-2">
          {['all', 'pending', 'completed'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as typeof filter)}
              className={`px-4 py-2 rounded ${
                filter === filterOption
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        <div className="grid gap-6">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order #{order.orderNumber}
                  </h3>
                  <p className="text-gray-600">
                    {order.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
                <div className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'}
                `}>
                  {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Details</h4>
                  <p>{order.contactInfo.email}</p>
                  <p>{order.contactInfo.phone}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Items</h4>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name} x{item.quantity}</span>
                        <span>₱{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>₱{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default OrdersClient;
