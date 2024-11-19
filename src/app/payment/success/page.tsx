'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { logger } from '@/utils/logger';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  id: string;
  userId: string;
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  total: number;
  orderType: 'now' | 'preorder';
  preorderDetails?: {
    deliveryDate: string;
    deliveryTime: string;
  };
  paymentMethod: 'cod' | 'gcash';
  orderStatus: string;
  paymentStatus: string;
  orderDate: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (!orderId) {
      router.push('/');
      return;
    }

    const fetchOrder = async () => {
      try {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() } as OrderDetails);
        } else {
          setError('Order not found');
        }
      } catch (error) {
        logger.error('Error fetching order:', error);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Order not found'}
          </h1>
          <Link 
            href="/"
            className="text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 max-w-md w-full text-center">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your order. We will process it right away.
        </p>
        
        <div className="text-left mb-8">
          <h2 className="font-semibold mb-4">Order Details</h2>
          <p className="text-gray-400">Customer: {order.customerName}</p>
          <p className="text-gray-400">Phone: {order.phone}</p>
          <p className="text-gray-400">
            Date: {new Date(order.orderDate.seconds * 1000).toLocaleString()}
          </p>
          <p className="text-gray-400">Total: ₱{order.total}</p>
          <p className="text-gray-400">Payment: {order.paymentMethod.toUpperCase()}</p>
          {order.orderType === 'preorder' && order.preorderDetails && (
            <>
              <p className="text-gray-400">Delivery Date: {order.preorderDetails.deliveryDate}</p>
              <p className="text-gray-400">Delivery Time: {order.preorderDetails.deliveryTime}</p>
            </>
          )}
        </div>

        <div className="space-y-4">
          <Link
            href={`/order-status/${order.id}`}
            className="block w-full bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
          >
            View Order Status
          </Link>
          <Link
            href="/"
            className="block w-full border border-yellow-500 text-yellow-500 px-6 py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition-colors font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
