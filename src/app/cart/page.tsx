'use client';
import { useCart } from '@/hooks/useCart';
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      // Redirect to sign in page with return URL
      router.push('/sign-in?redirect=/checkout');
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <ShoppingBagIcon className="w-24 h-24 mx-auto text-theme-peach/50" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white/90 mt-8 mb-4">Your cart is empty</h1>
          <p className="text-white/70 text-lg mb-8">Start your culinary journey with our delicious Filipino dishes!</p>
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl 
                bg-gradient-to-r from-theme-wine via-theme-red to-theme-wine
                hover:from-theme-red hover:via-theme-wine hover:to-theme-red
                text-white font-semibold text-lg
                shadow-lg shadow-theme-wine/30
                border border-white/10 backdrop-blur-sm
                transition-all duration-300
                flex items-center gap-3 mx-auto"
            >
              <BookOpenIcon className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              Explore Menu
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
          {/* Header */}
          <div className="flex justify-between items-center bg-theme-navy/30 backdrop-blur-lg 
            rounded-2xl p-6 border border-theme-slate/20 shadow-lg">
            <h1 className="text-4xl font-bold text-white/90">Shopping Cart</h1>
            <div className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-xl bg-theme-wine/20 border border-theme-wine/20 
                text-theme-peach font-medium">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          {/* Cart Items */}
          <AnimatePresence mode="wait">
            <motion.div 
              key="cart-items"
              className="space-y-4"
            >
              {items.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="group relative overflow-hidden rounded-2xl 
                    bg-theme-navy/30 backdrop-blur-lg border border-theme-slate/20 
                    hover:border-theme-peach/20 transition-all duration-300
                    shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-6 p-6">
                    {/* Item Image */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0
                        ring-2 ring-theme-peach/20 ring-offset-2 ring-offset-theme-navy/30"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover transform transition-transform
                          duration-300 group-hover:scale-110"
                      />
                    </motion.div>
                    
                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-white/90 mb-2">{item.name}</h3>
                      <p className="text-theme-peach text-lg font-medium">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 p-1 rounded-lg bg-theme-wine/20 
                          backdrop-blur-sm border border-theme-wine/20"
                      >
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 rounded-lg bg-theme-wine hover:bg-theme-red 
                            transition-colors"
                        >
                          <MinusIcon className="w-4 h-4 text-white" />
                        </motion.button>
                        <span className="w-8 text-center text-white font-medium">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 rounded-lg bg-theme-wine hover:bg-theme-red 
                            transition-colors"
                        >
                          <PlusIcon className="w-4 h-4 text-white" />
                        </motion.button>
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-500/20
                          transition-all duration-300 hover:text-red-300"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Checkout Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-theme-navy/95 backdrop-blur-xl 
                  border-t border-theme-slate/20 p-4 md:p-6"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-white/70">Total</span>
                      <span className="text-2xl font-bold text-white">₱{getTotal().toFixed(2)}</span>
                    </div>
                    <motion.button
                      onClick={handleCheckout}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl 
                        bg-gradient-to-r from-theme-wine via-theme-red to-theme-wine
                        hover:from-theme-red hover:via-theme-wine hover:to-theme-red
                        text-white font-semibold text-lg
                        shadow-lg shadow-theme-wine/30
                        border border-white/10
                        transition-all duration-300
                        flex items-center justify-center gap-3"
                    >
                      {user ? 'Proceed to Checkout' : 'Sign in to Checkout'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}