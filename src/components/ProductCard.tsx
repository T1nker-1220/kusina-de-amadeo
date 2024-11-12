'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import ProductImage from './ProductImage';
import { Product } from '@/types';
import { ShoppingCartIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white/90">{product.name}</h3>
        <p className="text-white/60 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-white/90">₱{product.price}</span>
          <div className="flex items-center">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-2 py-1 rounded-lg bg-orange-500/20 text-orange-400 
                hover:bg-orange-500/30 transition-colors"
              title="Decrease quantity"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="text-white/90 mx-2">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-2 py-1 rounded-lg bg-orange-500/20 text-orange-400 
                hover:bg-orange-500/30 transition-colors"
              title="Increase quantity"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 
              hover:bg-orange-500/30 transition-colors"
          >
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}