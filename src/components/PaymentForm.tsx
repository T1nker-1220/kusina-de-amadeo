'use client';

import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { BiLoaderAlt } from 'react-icons/bi';
import { FiAlertCircle } from 'react-icons/fi';
import { logger } from '@/utils/logger';

interface PaymentFormProps {
  orderId: string;
  totalAmount: number;
  onSubmit: (data: {
    paymentProofUrl: string;
    referenceNumber: string;
  }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  orderId,
  totalAmount,
  onSubmit
}) => {
  const [paymentProofUrl, setPaymentProofUrl] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    try {
      await onSubmit({
        paymentProofUrl,
        referenceNumber
      });
    } catch (err) {
      const error = err as Error;
      logger.error('Payment processing error:', error);
      setError(error.message || 'An error occurred during payment processing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = paymentProofUrl && referenceNumber && referenceNumber.length >= 8;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 sm:px-8 sm:py-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Payment Confirmation</h2>
            <p className="text-blue-100 text-sm sm:text-base">Complete your payment details below</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono text-gray-900">{orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Amount Due</p>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">₱{totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex items-center">
                  <FiAlertCircle className="text-red-400 w-5 h-5 mr-2" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Payment Proof Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                GCash Payment Screenshot
                <span className="text-red-500">*</span>
              </label>
              <ImageUpload
                value={paymentProofUrl}
                onChange={(url) => {
                  setPaymentProofUrl(url);
                  setTouched(prev => ({ ...prev, paymentProof: true }));
                  setError(null);
                }}
              />
              {touched.paymentProof && !paymentProofUrl && (
                <p className="text-red-500 text-sm mt-1">Please upload your payment screenshot</p>
              )}
            </div>

            {/* Reference Number Input */}
            <div className="space-y-2">
              <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                GCash Reference Number
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="reference"
                value={referenceNumber}
                onChange={(e) => {
                  setReferenceNumber(e.target.value);
                  setError(null);
                }}
                onBlur={() => setTouched(prev => ({ ...prev, referenceNumber: true }))}
                className={`
                  appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                  ${touched.referenceNumber && !referenceNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                `}
                placeholder="Enter your GCash reference number"
                required
              />
              {touched.referenceNumber && !referenceNumber && (
                <p className="text-red-500 text-sm mt-1">Please enter the reference number</p>
              )}
              {touched.referenceNumber && referenceNumber && referenceNumber.length < 8 && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid reference number</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                You can find this in your GCash transaction history
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`
                w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                transition-all duration-200
                ${isFormValid && !isSubmitting
                  ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  : 'bg-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                <BiLoaderAlt className="h-5 w-5 animate-spin" />
              ) : (
                'Submit Payment'
              )}
            </button>

            {/* Help Text */}
            <p className="text-xs text-center text-gray-500">
              Need help? Contact our support team
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
