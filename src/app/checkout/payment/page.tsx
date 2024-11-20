'use client';

import { useState } from 'react';
import PaymentForm from '@/components/PaymentForm';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PaymentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaymentSubmit = async (data: {
    paymentProofUrl: string;
    referenceNumber: string;
  }) => {
    try {
      setIsSubmitting(true);
      // Here you would typically:
      // 1. Save the payment details to your database
      // 2. Update the order status
      // 3. Send confirmation to admin
      console.log('Payment submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to confirmation page
      router.push('/checkout/confirmation');
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-theme-dark to-theme-navy pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="group mb-6 inline-flex items-center gap-2 text-white/70 hover:text-white 
            transition-colors duration-200"
        >
          <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Checkout</span>
        </motion.button>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PaymentForm
            orderId="ORD123" // Replace with actual order ID
            totalAmount={1000} // Replace with actual amount
            onSubmit={handlePaymentSubmit}
            isSubmitting={isSubmitting}
          />
        </motion.div>
      </div>
    </div>
  );
}
