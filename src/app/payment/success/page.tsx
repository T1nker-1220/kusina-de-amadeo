'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

interface OrderDetails {
  id: string;
  total: number;
  items: any[];
  customerName: string;
  orderDate: any;
  status: string;
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

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
        }
      } catch (error) {
        console.error('Error fetching order:', error);
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

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
          <Link 
            href="/"
            className="text-indigo-600 hover:text-indigo-800"
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
      <div className="bg-white/5 rounded-lg p-8 max-w-md w-full text-center">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your order. We will process it right away.
        </p>
        <div className="space-y-4">
          <Link
            href={`/order-status/${order.id}`}
            className="block w-full bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
          >
            View Order Status
          </Link>
          <Link
            href="/"
            className="block w-full bg-white/10 px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
