'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  BanknotesIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { logger } from '@/lib/logger';

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

const formatDate = (seconds: number): string => {
  try {
    return new Date(seconds * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    logger.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

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
          const orderData = orderDoc.data();
          setOrder({ 
            id: orderDoc.id, 
            ...orderData,
            orderDate: orderData.orderDate || { seconds: Date.now() / 1000, nanoseconds: 0 }
          } as OrderDetails);
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
      <div className="min-h-screen w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 
        bg-gradient-to-b from-theme-dark via-theme-dark to-theme-navy/90
        flex items-center justify-center">
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { duration: 1, repeat: Infinity, ease: "linear" }
          }}
        >
          <ArrowPathIcon className="w-16 h-16 text-theme-peach" />
        </motion.div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 
        bg-gradient-to-b from-theme-dark via-theme-dark to-theme-navy/90
        flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto" />
          <h1 className="text-2xl md:text-3xl font-bold text-white/90">
            {error || 'Order not found'}
          </h1>
          <Link 
            href="/"
            className="inline-block px-6 py-3 rounded-lg
              bg-theme-peach/10 hover:bg-theme-peach/20
              text-theme-peach hover:text-white
              border border-theme-peach/30
              transition-all duration-300"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 
      bg-gradient-to-b from-theme-dark via-theme-dark to-theme-navy/90">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto"
      >
        {/* Success Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white/90 mt-6 mb-4">
            Order Successful!
          </h1>
          <p className="text-lg md:text-xl text-white/60">
            Thank you for your order. We will process it right away.
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div 
          variants={itemVariants}
          className="bg-theme-navy/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 mb-8
            border border-theme-slate/20 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-2">
            <ClipboardDocumentListIcon className="w-6 h-6 text-theme-peach" />
            Order Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 text-white/70">
              <div className="w-5 h-5 mt-1 flex-shrink-0">
                <ShoppingBagIcon className="w-5 h-5 text-theme-peach" />
              </div>
              <div>
                <p className="font-medium text-white/90">Order ID</p>
                <p className="font-mono text-sm">{order.id}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-white/70">
              <div className="w-5 h-5 mt-1 flex-shrink-0">
                <PhoneIcon className="w-5 h-5 text-theme-peach" />
              </div>
              <div>
                <p className="font-medium text-white/90">Contact Details</p>
                <p>{order.customerName}</p>
                <p>{order.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-white/70">
              <div className="w-5 h-5 mt-1 flex-shrink-0">
                <MapPinIcon className="w-5 h-5 text-theme-peach" />
              </div>
              <div>
                <p className="font-medium text-white/90">Delivery Address</p>
                <p>{order.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-white/70">
              <div className="w-5 h-5 mt-1 flex-shrink-0">
                <BanknotesIcon className="w-5 h-5 text-theme-peach" />
              </div>
              <div>
                <p className="font-medium text-white/90">Payment Details</p>
                <p>Method: {order.paymentMethod.toUpperCase()}</p>
                <p className="text-theme-peach font-semibold">
                  Total: ₱{order.total.toLocaleString()}
                </p>
              </div>
            </div>

            {order.orderType === 'preorder' && order.preorderDetails && (
              <div className="flex items-start gap-4 text-white/70">
                <div className="w-5 h-5 mt-1 flex-shrink-0">
                  <CalendarIcon className="w-5 h-5 text-theme-peach" />
                </div>
                <div>
                  <p className="font-medium text-white/90">Delivery Schedule</p>
                  <p>Date: {order.preorderDetails.deliveryDate}</p>
                  <p>Time: {order.preorderDetails.deliveryTime}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4 text-white/70">
              <div className="w-5 h-5 mt-1 flex-shrink-0">
                <ClockIcon className="w-5 h-5 text-theme-peach" />
              </div>
              <div>
                <p className="font-medium text-white/90">Order Time</p>
                <p>{formatDate(order.orderDate.seconds)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="space-y-4"
        >
          <Link href={`/order-status/${order.id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl 
                bg-gradient-to-r from-theme-peach via-theme-red to-theme-peach
                hover:from-theme-red hover:via-theme-peach hover:to-theme-red
                text-white font-bold
                shadow-lg shadow-theme-peach/20 hover:shadow-xl hover:shadow-theme-peach/30
                border border-white/10
                transition-all duration-500
                flex items-center justify-center gap-3"
            >
              <ClipboardDocumentListIcon className="w-6 h-6" />
              Track Order Status
            </motion.button>
          </Link>

          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl
                bg-theme-navy/60 hover:bg-theme-navy/80
                text-white/80 hover:text-white font-bold
                border border-theme-slate/20 hover:border-theme-slate/30
                transition-all duration-300
                flex items-center justify-center gap-3"
            >
              <ShoppingBagIcon className="w-6 h-6" />
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
