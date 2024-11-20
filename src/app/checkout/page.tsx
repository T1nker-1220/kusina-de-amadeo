"use client";

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import CheckoutForm from '@/components/CheckoutForm';
import Toast from '@/components/ui/Toast';
import { createOrder } from '@/services/orders';
import { useRouter } from 'next/navigation';
import { logger } from '@/utils/logger';
import { withAuth } from '@/components/auth/withAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBagIcon, 
  ArrowLeftIcon, 
  TruckIcon, 
  CreditCardIcon, 
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import type { OrderDetails } from '@/services/orders';
import { Tab } from '@headlessui/react';

interface FormData {
  name: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod: 'cod' | 'gcash';
  orderType: 'now' | 'preorder';
  deliveryDate?: string;
  deliveryTime?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const features = [
  {
    name: 'Lalamove Delivery',
    description: 'Fast & reliable delivery service',
    icon: TruckIcon,
  },
  {
    name: 'Secure Payment',
    description: 'Safe & encrypted',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Real-time Tracking',
    description: 'Monitor your order',
    icon: ClockIcon,
  },
  {
    name: 'Local Service',
    description: 'Supporting local business',
    icon: MapPinIcon,
  },
];

export default withAuth(function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const { items, getTotal, clearCart } = useCart();
  const [orderStatus, setOrderStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    if (!user || !items) return;

    setOrderStatus({ loading: true, error: null, success: false });
    try {
      const order: OrderDetails = {
        userId: user.uid,
        items,
        totalAmount: getTotal(),
        shippingAddress: {
          street: formData.address,
          city: 'Amadeo',
          state: 'Cavite',
          zipCode: '4119',
        },
        contactInfo: {
          email: user?.email ?? '',
          phone: formData.phone ?? '',
        } as const,
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'pending' as const,
        orderStatus: 'pending' as const,
        specialInstructions: formData.notes,
        orderType: formData.orderType,
        deliveryDate: formData.orderType === 'preorder' ? formData.deliveryDate ?? undefined : undefined,
        deliveryTime: formData.orderType === 'preorder' ? formData.deliveryTime ?? undefined : undefined,
      };

      const orderId = await createOrder(order);
      await clearCart();
      
      setOrderStatus({ loading: false, error: null, success: true });
      router.push(`/orders/${orderId}`);
    } catch (error) {
      logger.error('Checkout error:', error);
      setOrderStatus({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to create order. Please try again.',
        success: false,
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-peach"></div>
          <p className="text-theme-slate animate-pulse">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/sign-in?returnUrl=/checkout');
    return null;
  }

  if (!items || items.length === 0) {
    return (
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInUp}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-theme-dark"
      >
        <div className="relative mb-8">
          <ShoppingBagIcon className="w-24 h-24 text-theme-slate/30" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -bottom-2 -right-2 bg-theme-peach rounded-full p-2"
          >
            <CheckCircleIcon className="w-6 h-6 text-white" />
          </motion.div>
        </div>
        <h1 className="text-3xl font-bold text-theme-peach mb-4 text-center">Your cart is empty</h1>
        <p className="text-theme-slate mb-8 text-center max-w-md">
          Looks like you haven't added any items to your cart yet. Browse our menu to find your favorite dishes!
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/menu')}
          className="flex items-center gap-3 bg-theme-wine hover:bg-theme-red text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-lg shadow-theme-wine/20"
        >
          Browse Menu
          <ArrowLeftIcon className="w-5 h-5 rotate-180" />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-theme-dark"
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-theme-navy z-50">
        <motion.div
          className="h-full bg-theme-peach"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Top Navigation */}
      <div className="sticky top-0 z-40 bg-theme-dark/95 backdrop-blur-sm border-b border-theme-slate/10">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-theme-slate hover:text-theme-peach transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline font-medium">Back to Cart</span>
            </button>

            {/* Features - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {features.map((feature) => (
                <div key={feature.name} className="flex items-center gap-2 text-theme-slate group">
                  <feature.icon className="w-5 h-5 group-hover:text-theme-peach transition-colors" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium group-hover:text-theme-peach transition-colors">
                      {feature.name}
                    </span>
                    <span className="text-xs text-theme-slate/70">
                      {feature.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Features - Mobile */}
            <div className="lg:hidden flex items-center gap-4">
              <div className="flex items-center gap-2 text-theme-slate">
                <TruckIcon className="w-5 h-5" />
                <span className="text-sm">Lalamove Delivery</span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Main Content */}
          <div className="lg:col-span-1">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-theme-peach mb-2">
                Complete Your Order
              </h1>
              <p className="text-theme-slate">
                Please fill in your details to complete your order.
              </p>
            </motion.div>

            {/* Features - Mobile Horizontal Scroll */}
            <div className="lg:hidden mb-8 -mx-4 px-4 overflow-x-auto">
              <div className="flex space-x-6 py-2">
                {features.map((feature) => (
                  <div key={feature.name} className="flex-none">
                    <div className="flex items-center gap-2 text-theme-slate group">
                      <feature.icon className="w-5 h-5" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{feature.name}</span>
                        <span className="text-xs text-theme-slate/70">
                          {feature.description}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-theme-navy/30 rounded-2xl p-6 backdrop-blur-sm border border-theme-slate/10">
              <CheckoutForm onSubmit={handleSubmit} loading={orderStatus.loading} />
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-24">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="bg-theme-navy/30 rounded-2xl backdrop-blur-sm border border-theme-slate/10 overflow-hidden"
              >
                <div className="px-6 py-4 bg-theme-navy/50">
                  <h2 className="text-lg font-medium text-white">Order Summary</h2>
                </div>
                <div className="px-6 py-4">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-theme-slate/10">
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-theme-navy/50">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            )}
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-white">
                                <h3>{item.name}</h3>
                                <p className="ml-4">₱{item.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-theme-slate">Qty {item.quantity}</p>
                              <p className="text-theme-peach">
                                ₱{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-theme-slate text-sm">
                      <p>Subtotal</p>
                      <p className="text-white">₱{getTotal().toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between text-theme-slate text-sm">
                      <p>Delivery</p>
                      <p className="text-theme-peach">Free</p>
                    </div>
                    <div className="flex items-center justify-between text-base font-medium text-white">
                      <p>Total</p>
                      <p>₱{getTotal().toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {orderStatus.error && (
          <Toast
            message={orderStatus.error}
            type="error"
            onClose={() => setOrderStatus(prev => ({ ...prev, error: null }))}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
});
