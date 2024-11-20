'use client';
import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, UserIcon, PhoneIcon, MapPinIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^(09|\+639)\d{9}$/, 'Please enter a valid Philippine mobile number'),
  address: z.string().min(10, 'Please enter a complete delivery address'),
  notes: z.string().optional(),
  paymentMethod: z.enum(['cod', 'gcash']),
  orderType: z.enum(['now', 'preorder']),
  deliveryDate: z.string().optional(),
  deliveryTime: z.string().optional(),
}).refine((data) => {
  if (data.orderType === 'preorder') {
    return !!data.deliveryDate && !!data.deliveryTime;
  }
  return true;
}, {
  message: "Delivery date and time are required for pre-orders",
  path: ["deliveryDate"],
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

const formAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CheckoutForm({ onSubmit, loading = false }: Props) {
  const [showPreorderFields, setShowPreorderFields] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      orderType: 'now',
      paymentMethod: 'cod',
    },
  });

  const orderType = watch('orderType');

  // Calculate minimum date (today) and maximum date (7 days from now)
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <motion.form
      variants={formAnimation}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Contact Information */}
      <motion.div
        variants={itemAnimation}
        className="bg-theme-navy/50 backdrop-blur-sm rounded-2xl p-6 border border-theme-slate/10 shadow-xl shadow-black/5"
      >
        <h2 className="text-xl font-bold mb-6 text-theme-peach flex items-center gap-2">
          <UserIcon className="w-6 h-6" />
          Contact Information
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-theme-slate">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-theme-dark border border-theme-slate/20 focus:border-theme-peach focus:ring-1 focus:ring-theme-peach transition-colors"
                placeholder="Juan Dela Cruz"
              />
              <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-slate/50" />
            </div>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-500"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1 text-theme-slate">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-theme-dark border border-theme-slate/20 focus:border-theme-peach focus:ring-1 focus:ring-theme-peach transition-colors"
                placeholder="09123456789"
              />
              <PhoneIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-slate/50" />
            </div>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-500"
              >
                {errors.phone.message}
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Delivery Information */}
      <motion.div
        variants={itemAnimation}
        className="bg-theme-navy/50 backdrop-blur-sm rounded-2xl p-6 border border-theme-slate/10 shadow-xl shadow-black/5"
      >
        <h2 className="text-xl font-bold mb-6 text-theme-peach flex items-center gap-2">
          <MapPinIcon className="w-6 h-6" />
          Delivery Information (via Lalamove)
        </h2>
        <div className="space-y-4">
          <div className="bg-theme-peach/10 rounded-xl p-4 mb-4">
            <p className="text-sm text-theme-slate">
              We use Lalamove for all our deliveries to ensure fast and reliable service. 
              Delivery fees will be calculated based on your location through Lalamove's pricing.
            </p>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1 text-theme-slate">
              Delivery Address
            </label>
            <div className="relative">
              <textarea
                id="address"
                {...register('address')}
                rows={3}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-theme-dark border border-theme-slate/20 focus:border-theme-peach focus:ring-1 focus:ring-theme-peach transition-colors resize-none"
                placeholder="Complete address for Lalamove delivery (House/Unit Number, Street Name, Barangay, Landmarks)"
              />
              <MapPinIcon className="absolute right-3 top-3 w-5 h-5 text-theme-slate/50" />
            </div>
            {errors.address && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-500"
              >
                {errors.address.message}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1 text-theme-slate">
              Special Instructions for Lalamove Rider (Optional)
            </label>
            <div className="relative">
              <textarea
                id="notes"
                {...register('notes')}
                rows={2}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-theme-dark border border-theme-slate/20 focus:border-theme-peach focus:ring-1 focus:ring-theme-peach transition-colors resize-none"
                placeholder="Additional instructions for the Lalamove rider (e.g., landmarks, gate access, etc.)"
              />
              <PencilIcon className="absolute right-3 top-3 w-5 h-5 text-theme-slate/50" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Order Type */}
      <motion.div
        variants={itemAnimation}
        className="bg-theme-navy/50 backdrop-blur-sm rounded-2xl p-6 border border-theme-slate/10 shadow-xl shadow-black/5"
      >
        <h2 className="text-xl font-bold mb-6 text-theme-peach">When would you like your order?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="relative">
            <input
              type="radio"
              value="now"
              {...register('orderType')}
              className="peer sr-only"
              onChange={() => setShowPreorderFields(false)}
            />
            <div className="p-4 rounded-xl border-2 border-theme-slate/20 cursor-pointer transition-all hover:border-theme-peach peer-checked:border-theme-peach peer-checked:bg-theme-peach/10">
              <h3 className="font-medium mb-1">Order Now</h3>
              <p className="text-sm text-theme-slate">Deliver as soon as possible</p>
            </div>
          </label>

          <label className="relative">
            <input
              type="radio"
              value="preorder"
              {...register('orderType')}
              className="peer sr-only"
              onChange={() => setShowPreorderFields(true)}
            />
            <div className="p-4 rounded-xl border-2 border-theme-slate/20 cursor-pointer transition-all hover:border-theme-peach peer-checked:border-theme-peach peer-checked:bg-theme-peach/10">
              <h3 className="font-medium mb-1">Pre-order</h3>
              <p className="text-sm text-theme-slate">Schedule for later delivery</p>
            </div>
          </label>
        </div>

        {orderType === 'preorder' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 space-y-4"
          >
            <div>
              <label htmlFor="deliveryDate" className="block text-sm font-medium mb-1 text-theme-slate">
                Delivery Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="deliveryDate"
                  {...register('deliveryDate')}
                  min={formatDate(today)}
                  max={formatDate(maxDate)}
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-theme-dark border border-theme-slate/20 focus:border-theme-peach focus:ring-1 focus:ring-theme-peach transition-colors"
                />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-slate/50" />
              </div>
              {errors.deliveryDate && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.deliveryDate.message}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium mb-1 text-theme-slate">
                Delivery Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="deliveryTime"
                  {...register('deliveryTime')}
                  min="09:00"
                  max="21:00"
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-theme-dark border border-theme-slate/20 focus:border-theme-peach focus:ring-1 focus:ring-theme-peach transition-colors"
                />
                <ClockIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-slate/50" />
              </div>
              {errors.deliveryTime && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.deliveryTime.message}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Payment Method */}
      <motion.div
        variants={itemAnimation}
        className="bg-theme-navy/50 backdrop-blur-sm rounded-2xl p-6 border border-theme-slate/10 shadow-xl shadow-black/5"
      >
        <h2 className="text-xl font-bold mb-6 text-theme-peach">How would you like to pay?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="relative">
            <input
              type="radio"
              value="cod"
              {...register('paymentMethod')}
              className="peer sr-only"
            />
            <div className="p-4 rounded-xl border-2 border-theme-slate/20 cursor-pointer transition-all hover:border-theme-peach peer-checked:border-theme-peach peer-checked:bg-theme-peach/10">
              <h3 className="font-medium mb-1">Cash on Delivery</h3>
              <p className="text-sm text-theme-slate">Pay when you receive your order</p>
            </div>
          </label>

          <label className="relative">
            <input
              type="radio"
              value="gcash"
              {...register('paymentMethod')}
              className="peer sr-only"
            />
            <div className="p-4 rounded-xl border-2 border-theme-slate/20 cursor-pointer transition-all hover:border-theme-peach peer-checked:border-theme-peach peer-checked:bg-theme-peach/10">
              <h3 className="font-medium mb-1">GCash</h3>
              <p className="text-sm text-theme-slate">Pay securely with GCash</p>
            </div>
          </label>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        variants={itemAnimation}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        type="submit"
        className="w-full bg-theme-wine hover:bg-theme-red text-white font-medium py-4 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-theme-wine/20"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing Order...
          </div>
        ) : (
          'Place Order'
        )}
      </motion.button>
    </motion.form>
  );
}
