'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, where, Timestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { logger } from '@/utils/logger';
import { motion, AnimatePresence } from 'framer-motion';

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: string;
  createdAt: Timestamp;
  transactionId?: string;
  customerName: string;
  customerEmail: string;
}

const PaymentsClient = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  useEffect(() => {
    try {
      let paymentsQuery = query(
        collection(db, 'payments'),
        orderBy('createdAt', 'desc')
      );

      // Apply date filters
      if (dateFilter !== 'all') {
        const now = new Date();
        const startDate = new Date();

        switch (dateFilter) {
          case 'today':
            startDate.setHours(0, 0, 0, 0);
            break;
          case 'week':
            startDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            startDate.setMonth(now.getMonth() - 1);
            break;
        }

        paymentsQuery = query(
          paymentsQuery,
          where('createdAt', '>=', Timestamp.fromDate(startDate))
        );
      }

      const unsubscribe = onSnapshot(paymentsQuery, (snapshot) => {
        const paymentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Payment[];

        setPayments(paymentsData);
        setLoading(false);
      }, (error) => {
        logger.error('Error fetching payments:', error);
        setError('Failed to load payments. Please try again.');
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      logger.error('Error setting up payments listener:', error);
      setError('Failed to initialize payments tracking.');
      setLoading(false);
    }
  }, [dateFilter]);

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

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
        <h1 className="text-2xl font-bold">Payments</h1>
        <div className="flex gap-2">
          {['all', 'today', 'week', 'month'].map((filter) => (
            <button
              key={filter}
              onClick={() => setDateFilter(filter as typeof dateFilter)}
              className={`px-4 py-2 rounded ${
                dateFilter === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        <div className="grid gap-6">
          {payments.map((payment) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Payment for Order #{payment.orderId}
                  </h3>
                  <p className="text-gray-600">
                    {payment.createdAt.toDate().toLocaleString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Details</h4>
                  <p>{payment.customerName}</p>
                  <p>{payment.customerEmail}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Payment Details</h4>
                  <p>Method: {payment.method}</p>
                  {payment.transactionId && (
                    <p>Transaction ID: {payment.transactionId}</p>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Amount</span>
                    <span>₱{payment.amount}</span>
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

export default PaymentsClient;
