'use client';

import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { BiLoaderAlt } from 'react-icons/bi';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { logger } from '@/utils/logger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PaymentFormProps {
  orderId: string;
  totalAmount: number;
  isSubmitting?: boolean;
  onSubmit: (data: {
    paymentProofUrl: string;
    referenceNumber: string;
  }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  orderId,
  totalAmount,
  isSubmitting = false,
  onSubmit
}) => {
  const [paymentProofUrl, setPaymentProofUrl] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    paymentProof: false,
    referenceNumber: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      paymentProof: true,
      referenceNumber: true
    });

    if (!paymentProofUrl || !referenceNumber) {
      setError('Please complete all required fields');
      return;
    }

    if (referenceNumber.length < 8) {
      setError('Please enter a valid GCash reference number');
      return;
    }

    setError(null);
    try {
      await onSubmit({
        paymentProofUrl,
        referenceNumber
      });
    } catch (err) {
      const error = err as Error;
      logger.error('Payment processing error:', error);
      setError(error.message || 'An error occurred during payment processing');
    }
  };

  const isFormValid = paymentProofUrl && referenceNumber && referenceNumber.length >= 8;

  return (
    <motion.div 
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-theme-navy/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden
          shadow-xl shadow-black/10">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-500/20 via-orange-600/20 to-orange-700/20 
            border-b border-white/10 px-6 py-6 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Payment Details</h2>
            <p className="text-white/70">Complete your order by providing payment information</p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Order Summary */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white/50 mb-1">Order ID</p>
                  <p className="font-mono text-white/90 text-lg">{orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/50 mb-1">Amount Due</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 
                    bg-clip-text text-transparent">
                    ₱{totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* GCash Instructions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Payment Instructions</h3>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/images/gcash-logo.png"
                      alt="GCash Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <p className="text-white/90">Send payment to:</p>
                      <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                        <span className="font-mono text-white/80">0917 123 4567</span>
                        <button
                          type="button"
                          className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                          onClick={() => navigator.clipboard.writeText('09171234567')}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <ol className="space-y-2 text-sm text-white/70">
                      <li>1. Open your GCash app</li>
                      <li>2. Send the exact amount to the number above</li>
                      <li>3. Take a screenshot of the payment confirmation</li>
                      <li>4. Upload the screenshot below</li>
                      <li>5. Enter the reference number from GCash</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 text-red-400">
                    <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Payment Proof Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Payment Screenshot
                <span className="text-orange-500 ml-1">*</span>
              </label>
              <ImageUpload
                onImageSelected={setPaymentProofUrl}
                className="w-full aspect-[3/2] rounded-xl bg-white/5 border border-white/10
                  hover:bg-white/10 transition-colors"
              />
              {touched.paymentProof && !paymentProofUrl && (
                <p className="text-sm text-red-400">Please upload your payment screenshot</p>
              )}
            </div>

            {/* Reference Number Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                GCash Reference Number
                <span className="text-orange-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Enter your GCash reference number"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                  text-white placeholder-white/30
                  focus:outline-none focus:border-orange-500/50 focus:bg-white/10
                  transition-colors"
              />
              {touched.referenceNumber && (!referenceNumber || referenceNumber.length < 8) && (
                <p className="text-sm text-red-400">Please enter a valid reference number</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold
                transition-all duration-200 flex items-center justify-center gap-2
                ${isFormValid && !isSubmitting
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                  : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
            >
              {isSubmitting ? (
                <>
                  <BiLoaderAlt className="w-5 h-5 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <FiCheckCircle className="w-5 h-5" />
                  Confirm Payment
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default PaymentForm;
