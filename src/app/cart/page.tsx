'use client';
import { useCart } from '@/context/CartContext';
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center space-y-6"
        >
          <ShoppingBagIcon className="w-20 h-20 mx-auto text-theme-peach/50" />
          <h1 className="text-3xl font-bold text-white/90">Your cart is empty</h1>
          <p className="text-white/70">Add some delicious Filipino dishes to your cart!</p>
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-theme-wine hover:bg-theme-red
                text-white font-medium transition-colors"
            >
              Browse Menu
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white/90">Shopping Cart</h1>
            <p className="text-white/70">{items.length} items</p>
          </div>

          <div className="space-y-4">
            {items.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="group relative overflow-hidden rounded-2xl 
                  bg-theme-navy/50 border border-theme-slate/20 
                  hover:border-theme-peach/20 transition-all duration-300"
              >
                <div className="flex items-center gap-6 p-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-white/90 mb-1">{item.name}</h3>
                    <p className="text-theme-peach text-lg">₱{item.price}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 p-1 rounded-lg bg-theme-wine/20">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 rounded-lg bg-theme-wine hover:bg-theme-red 
                          transition-colors"
                      >
                        <MinusIcon className="w-4 h-4 text-white" />
                      </button>
                      <span className="w-8 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 rounded-lg bg-theme-wine hover:bg-theme-red 
                          transition-colors"
                      >
                        <PlusIcon className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-500/20
                        transition-colors"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-theme-navy/50 border 
            border-theme-slate/20 p-6">
            <div className="flex justify-between items-center text-xl">
              <span className="text-white/70">Total Amount</span>
              <span className="text-theme-peach font-bold">
                ₱{getTotal().toFixed(2)}
              </span>
            </div>
            <button className="w-full mt-4 py-3 rounded-xl bg-theme-wine 
              hover:bg-theme-red text-white font-medium transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}