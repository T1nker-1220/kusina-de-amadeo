'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types';
import { ShoppingCartIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, removeFromCart, updateQuantity, items } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const quantity = items.find(item => item.id === product.id)?.quantity || 0;
  const inCart = items.some(item => item.id === product.id);

  const handleQuantityChange = (change: number) => {
    try {
      const newQuantity = quantity + change;
      if (newQuantity > 0) {
        updateQuantity(product.id, newQuantity);
      } else {
        removeFromCart(product.id);
      }
    } catch (error) {
      setError('Error updating quantity');
    }
  };

  if (error) {
    return <div className="text-red-400 p-4">{error}</div>;
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl 
        bg-gradient-to-br from-theme-navy/95 via-theme-dark to-theme-navy/90
        border border-theme-slate/10 shadow-lg
        hover:shadow-2xl hover:shadow-theme-peach/20
        hover:border-theme-peach/30 transition-all duration-500"
    >
      {/* Image Container with Loading State */}
      <div className="relative w-full aspect-square overflow-hidden rounded-t-xl sm:rounded-t-2xl">
        <AnimatePresence mode="wait">
          {isImageLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-theme-navy/50 animate-pulse"
            />
          )}
        </AnimatePresence>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover w-full h-full transform transition-all duration-500 
            group-hover:scale-110 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority
          onLoadingComplete={() => setIsImageLoading(false)}
        />
      </div>
      
      <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 relative">
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white line-clamp-2
            group-hover:text-theme-peach transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm sm:text-base md:text-lg font-bold flex items-baseline gap-1">
            <span className="text-theme-slate">₱</span>
            <span className="text-white">{product.price.toFixed(2)}</span>
          </p>
        </div>
        
        <AnimatePresence mode="wait">
          {!inCart ? (
            <motion.button
              key="add"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => addToCart({ ...product, description: product.description || '' })}
              className="fancy-button w-full py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-2
                text-xs sm:text-sm md:text-base active:scale-95 transform transition-transform"
            >
              <ShoppingCartIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span>Add to Cart</span>
            </motion.button>
          ) : (
            <motion.div
              key="controls"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
            >
              <div className="flex-1 flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 md:p-2 
                rounded-lg sm:rounded-xl bg-gradient-to-br from-theme-wine/30 to-theme-dark/50 
                backdrop-blur-sm border border-theme-wine/30">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(-1)}
                  className="p-1 sm:p-1.5 md:p-2 rounded-lg bg-theme-wine hover:bg-theme-red 
                    transition-colors active:scale-95 transform"
                  title="Decrease quantity"
                  type="button"
                >
                  <MinusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                </motion.button>
                
                <span className="flex-1 text-center text-xs sm:text-sm md:text-base font-medium text-white">
                  {quantity}
                </span>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(1)}
                  className="p-1 sm:p-1.5 md:p-2 rounded-lg bg-theme-wine hover:bg-theme-red 
                    transition-colors active:scale-95 transform"
                  title="Increase quantity"
                  type="button"
                >
                  <PlusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                </motion.button>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => removeFromCart(product.id)}
                className="p-1 sm:p-1.5 md:p-2 rounded-lg bg-theme-wine hover:bg-theme-red 
                  transition-colors active:scale-95 transform"
                title="Remove from cart"
                type="button"
              >
                <XMarkIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}