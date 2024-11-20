'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const [isHovered, setIsHovered] = useState(false);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href="/cart"
        className="relative inline-flex items-center justify-center p-2 text-orange-400 hover:text-orange-500 transition-colors rounded-lg hover:bg-orange-500/5"
      >
        <motion.div
          animate={isHovered ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <ShoppingCartIcon className="w-6 h-6" />
        </motion.div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute -bottom-8 whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded-md shadow-lg"
            >
              View Cart
            </motion.span>
          )}
        </AnimatePresence>

        {/* Cart items count badge */}
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center bg-orange-500 text-white rounded-full"
          >
            {itemCount}
          </motion.div>
        )}
      </Link>

      {/* Hover effect ring */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-0 rounded-lg bg-orange-500/10 -z-10"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
