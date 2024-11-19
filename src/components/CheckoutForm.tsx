'use client';
import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useRouter } from 'next/navigation';

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

interface CheckoutFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
}

export default function CheckoutForm({ onSubmit, loading }: CheckoutFormProps) {
  const { items, getTotal, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'cod',
    orderType: 'now',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliveryTime: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    e: React.ChangeEvent<T>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate cart is not empty
    if (items.length === 0) {
      setError('Your cart is empty. Please add items before checking out.');
      return;
    }

    // Validate delivery fields for pre-orders
    if (formData.orderType === 'preorder') {
      if (!formData.deliveryDate) {
        setError('Please select a delivery date');
        return;
      }
      if (!formData.deliveryTime) {
        setError('Please select a delivery time');
        return;
      }
    }

    // Validate required fields
    if (!formData.phone || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    setError(null);
    
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing your order.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-4"
    >
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      {/* Order Type Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Order Type</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, orderType: 'now' }))}
            className={`p-4 rounded-lg border ${
              formData.orderType === 'now'
                ? 'bg-yellow-500 text-black border-yellow-500'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            } transition-colors`}
          >
            <h4 className="font-semibold">Order Now</h4>
            <p className="text-sm opacity-75">Get your food delivered ASAP</p>
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, orderType: 'preorder' }))}
            className={`p-4 rounded-lg border ${
              formData.orderType === 'preorder'
                ? 'bg-yellow-500 text-black border-yellow-500'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            } transition-colors`}
          >
            <h4 className="font-semibold">Pre-order</h4>
            <p className="text-sm opacity-75">Schedule for later delivery</p>
          </button>
        </div>
      </div>

      {/* Pre-order Details */}
      {formData.orderType === 'preorder' && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-lg font-semibold">Delivery Schedule</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="deliveryDate" className="block text-sm font-medium mb-1">
                Delivery Date
              </label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required={formData.orderType === 'preorder'}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium mb-1">
                Delivery Time
              </label>
              <select
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleInputChange}
                required={formData.orderType === 'preorder'}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                <option value="">Select time</option>
                <option value="05:00">5:00 AM</option>
                <option value="06:00">6:00 AM</option>
                <option value="07:00">7:00 AM</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
                <option value="22:00">10:00 PM</option>
                <option value="23:00">11:00 PM</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Customer Information</h3>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-orange-500/50
              placeholder:text-gray-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-orange-500/50
              placeholder:text-gray-500"
            placeholder="Enter your contact number"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Delivery Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-orange-500/50
              placeholder:text-gray-500 resize-none"
            placeholder="Enter your complete delivery address"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Order Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-orange-500/50
              placeholder:text-gray-500 resize-none"
            placeholder="Any special instructions for your order?"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Method</h3>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-orange-500/50"
        >
          <option value="cod">Cash on Delivery</option>
          <option value="gcash">GCash (Manual Verification)</option>
        </select>
      </div>

      {/* Order Summary */}
      <div className="bg-white/5 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} x{item.quantity}</span>
              <span>₱{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-white/10 pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₱{getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full py-3 rounded-lg font-semibold
            ${loading
              ? 'bg-orange-500/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
            } transition-all duration-300`}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </motion.button>
      </form>
    </motion.div>
  );
}
