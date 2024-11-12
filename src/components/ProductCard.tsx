'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { ShoppingCartIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

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
        updateQuantity((product.id), newQuantity);
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
      className="group relative overflow-hidden rounded-2xl 
        bg-theme-navy border border-theme-slate/30 
        hover:border-theme-peach/30 transition-all duration-300"
    >
      <div className="aspect-square relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-theme-peach">
          {product.name}
        </h3>
        <p className="text-theme-slate">₱{product.price.toFixed(2)}</p>
        
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2.5 px-4 rounded-lg
            bg-theme-wine hover:bg-theme-red
            text-white transition-colors
            flex items-center justify-center gap-2"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
}