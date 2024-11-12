'use client';
import { useCart } from '@/context/CartContext';
import ProductImage from './ProductImage';
import { Product } from '@/types/product';
import { ShoppingCartIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart, removeFromCart, updateQuantity, isInCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0) {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl backdrop-blur-glass bg-glass border border-white/20 shadow-glass hover:shadow-lg hover:border-white/30 transition-all duration-300">
      {/* Cart indicator badge */}
      <AnimatePresence>
        {inCart && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="absolute top-4 right-0 z-10"
          >
            <div className="flex items-center gap-2 py-1.5 pl-4 pr-3 
              bg-gradient-to-r from-orange-500 to-orange-600
              shadow-lg shadow-orange-500/20 rounded-l-full"
            >
              <span className="text-sm font-medium text-white">In Cart</span>
              <div className="flex items-center justify-center w-5 h-5 
                rounded-full bg-white/20 text-white text-xs font-bold">
                {quantity}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="aspect-square relative">
        <ProductImage 
          src={product.image}
          alt={product.name}
          className="p-4 transition-transform group-hover:scale-105 duration-300"
        />
      </div>

      <div className="p-6 border-t border-white/10 bg-white/5">
        <h3 className="text-lg font-semibold text-white/90">{product.name}</h3>
        <p className="mt-2 text-white/70">₱{product.price.toFixed(2)}</p>
        
        {inCart ? (
          <div className="mt-4 space-y-3">
            {/* Quantity Controls */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 
                  flex items-center justify-center transition-colors"
                title="Decrease quantity"
              >
                <MinusIcon className="w-4 h-4 text-white/90" />
              </button>
              
              <span className="text-lg font-medium text-white/90">
                {quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 
                  flex items-center justify-center transition-colors"
                title="Increase quantity"
              >
                <PlusIcon className="w-4 h-4 text-white/90" />
              </button>
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => removeFromCart(product.id)}
              className="w-full py-2.5 px-4 rounded-lg 
                bg-gradient-to-r from-rose-500/20 to-red-500/20
                hover:from-rose-500/30 hover:to-red-500/30
                border border-rose-500/30 hover:border-rose-500/50
                text-rose-300 hover:text-rose-200
                transition-all duration-300
                flex items-center justify-center gap-2
                group/cancel"
            >
              <XMarkIcon className="w-5 h-5 transition-transform duration-300 
                group-hover/cancel:rotate-90" />
              <span>Cancel Order</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full py-2.5 px-4 rounded-lg
              bg-white/10 text-white/90 hover:bg-white/20
              transition-all duration-300
              flex items-center justify-center gap-2"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
}