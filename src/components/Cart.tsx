'use client';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();

  return (
    <div className="p-4 min-h-[400px]">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      
      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex items-center gap-4 border-b border-white/10 py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-white/60">₱{item.price}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </motion.div>
          ))}
          
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span>Total:</span>
              <span className="font-bold">₱{getTotal()}</span>
            </div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
} 