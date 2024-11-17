'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
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
  const quantity = items.find(item => item.id === product.id)?.quantity || 0;
  const inCart = items.some(item => item.id === product.id);

  const handleQuantityChange = (change: number) => {
    try {
      const newQuantity = quantity + change;
      if (newQuantity > 0) {
        updateQuantity(product.id, newQuantity);
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
      className="group relative overflow-hidden rounded-2xl 
        bg-gradient-to-br from-theme-navy/95 via-theme-dark to-theme-navy/90
        border border-theme-slate/10 shadow-lg
        hover:shadow-2xl hover:shadow-theme-peach/20
        hover:border-theme-peach/30 transition-all duration-500"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6 space-y-4 relative">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white 
            group-hover:text-theme-peach transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-lg font-bold flex items-baseline gap-1">
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
              className="fancy-button w-full py-3 px-4 flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span>Add to Cart</span>
            </motion.button>
          ) : (
            <motion.div
              key="controls"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="flex-1 flex items-center gap-2 p-2 
                rounded-xl bg-gradient-to-br from-theme-wine/30 to-theme-dark/50 
                backdrop-blur-sm border border-theme-wine/30">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 rounded-lg bg-theme-wine hover:bg-theme-red 
                    transition-colors"
                  title="Decrease quantity"
                  type="button"
                >
                  <MinusIcon className="w-4 h-4 text-white" />
                </button>
                <span className="flex-1 text-center text-white font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 rounded-lg bg-theme-wine hover:bg-theme-red 
                    transition-colors"
                  title="Increase quantity"
                  type="button"
                >
                  <PlusIcon className="w-4 h-4 text-white" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="p-2 rounded-lg bg-gradient-to-br from-red-500/30 to-theme-dark/50
                  hover:from-red-500/40 hover:to-theme-dark/60
                  transition-all duration-300 border border-red-500/20"
                title="Remove from cart"
                type="button"
              >
                <XMarkIcon className="w-5 h-5 text-red-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}