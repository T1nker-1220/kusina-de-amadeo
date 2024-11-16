'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiUser, FiPhone, FiMapPin, FiCreditCard, FiCalendar, FiArrowLeft, FiPackage, FiDollarSign } from 'react-icons/fi';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  orderStatus: string;
  paymentStatus: string;
  orderDate: {
    seconds: number;
    nanoseconds: number;
  };
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function OrderStatusClient({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          setOrder(orderDoc.data() as Order);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        setError('Error fetching order details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mx-auto"></div>
          <p className="text-gray-600 animate-pulse">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInUp}
        className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50"
      >
        <div className="text-center space-y-4">
          <div className="bg-red-100 p-4 rounded-full inline-block">
            <FiPackage className="text-4xl text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{error}</h1>
          <p className="text-gray-600">We couldn't find the order you're looking for.</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <FiArrowLeft />
            Return to Home
          </Link>
        </div>
      </motion.div>
    );
  }

  const orderDate = new Date(order.orderDate.seconds * 1000);

  const getStatusColor = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      paid: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return statusColors[status?.toLowerCase() ?? ''] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={stagger}
        className="min-h-screen p-4 md:p-8 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <FiArrowLeft />
              Back to Home
            </Link>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 md:p-8 space-y-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Order Status</h1>
                  <p className="text-gray-500">Order ID: {orderId}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.orderStatus)}`}>
                    Order: {order.orderStatus?.toUpperCase() ?? 'N/A'}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.paymentStatus)}`}>
                    Payment: {order.paymentStatus?.toUpperCase() ?? 'N/A'}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Customer Details */}
                <motion.div variants={fadeInUp} className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Customer Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FiUser className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium text-gray-800">{order.customerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiPhone className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-800">{order.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-gray-800">{order.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiCreditCard className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium text-gray-800">{order.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiCalendar className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium text-gray-800">{orderDate.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Order Items */}
                <motion.div variants={fadeInUp} className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        className="flex justify-between items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="space-y-1">
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-800">₱{(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">₱{item.price.toFixed(2)} each</p>
                        </div>
                      </motion.div>
                    ))}
                    <motion.div 
                      variants={fadeInUp}
                      className="flex justify-between items-center p-4 rounded-lg bg-yellow-50 mt-6"
                    >
                      <p className="font-bold text-gray-800">Total Amount</p>
                      <div className="flex items-center gap-2">
                        <FiDollarSign className="text-yellow-600" />
                        <p className="font-bold text-xl text-yellow-600">₱{order.total.toFixed(2)}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
