'use client';
import { useCart } from '@/hooks/useCart';
import { 
  MinusIcon, 
  PlusIcon, 
  TrashIcon, 
  ShoppingBagIcon, 
  BookOpenIcon, 
  ArrowLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      router.push('/sign-in?redirect=/checkout');
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 bg-gradient-to-b from-theme-dark via-theme-dark to-theme-navy/90">
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
            className="relative"
          >
            <ShoppingBagIcon className="w-32 h-32 mx-auto text-theme-peach/30" />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <ExclamationTriangleIcon className="w-12 h-12 text-theme-peach/50" />
            </motion.div>
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white/90 mt-8 mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-12">
            Start your culinary journey with our delicious Filipino dishes!
          </p>
          
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-2xl 
                bg-gradient-to-r from-theme-peach via-theme-red to-theme-peach
                hover:from-theme-red hover:via-theme-peach hover:to-theme-red
                text-white font-semibold text-lg md:text-xl
                shadow-lg shadow-theme-peach/20 hover:shadow-xl hover:shadow-theme-peach/30
                border border-white/10 backdrop-blur-sm
                transition-all duration-500
                flex items-center gap-4 mx-auto"
            >
              <BookOpenIcon className="w-6 h-6 md:w-7 md:h-7 
                transform group-hover:rotate-12 transition-transform duration-500" />
              Explore Our Menu
              <ChevronRightIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-500" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 
      bg-gradient-to-b from-theme-dark via-theme-dark to-theme-navy/90">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Back Button - Mobile Only */}
          <motion.button
            variants={itemVariants}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="md:hidden flex items-center gap-3 text-white/70 hover:text-white
              px-4 py-2 rounded-xl bg-theme-navy/30 backdrop-blur-sm
              border border-theme-slate/10 hover:border-theme-slate/20
              transition-all duration-300 shadow-lg mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </motion.button>

          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-start md:items-center 
              bg-theme-navy/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 
              border border-theme-slate/20 shadow-xl"
          >
            <div className="space-y-2 mb-4 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold text-white/90">Your Cart</h1>
              <p className="text-base md:text-lg text-white/60 flex items-center gap-2">
                <ShoppingBagIcon className="w-5 h-5" />
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <div className="text-right bg-theme-peach/5 rounded-lg p-3 w-fit ml-auto">
              <div className="text-sm text-white/60 mb-0.5">Total Amount</div>
              <div className="text-xl md:text-2xl font-bold text-theme-peach">
                ₱{getTotal().toFixed(2)}
              </div>
            </div>
          </motion.div>

          {/* Cart Items */}
          <AnimatePresence mode="wait">
            <motion.div 
              key="cart-items"
              variants={containerVariants}
              className="space-y-4"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  custom={index}
                  layoutId={item.id.toString()}
                  className="group relative overflow-hidden rounded-xl 
                    bg-theme-navy/40 backdrop-blur-xl border border-theme-slate/20 
                    hover:border-theme-peach/30 transition-all duration-500
                    shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-6 p-6">
                    {/* Item Image */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0
                        ring-2 ring-theme-peach/30 ring-offset-2 ring-offset-theme-navy/40
                        transform-gpu"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transform transition-transform
                          duration-500 group-hover:scale-110"
                      />
                    </motion.div>
                    
                    {/* Item Details */}
                    <div className="flex-1 min-w-0 space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white/90 truncate mb-1">
                            {item.name}
                          </h3>
                          <p className="text-theme-peach text-lg md:text-xl font-semibold">
                            ₱{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20
                            text-red-400 hover:text-red-300 
                            border border-red-500/20 hover:border-red-500/30
                            transition-all duration-300 shadow-lg"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 bg-theme-navy/60 rounded-xl p-2 w-fit">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 rounded-lg bg-theme-wine/20 hover:bg-theme-wine/30
                            text-white border border-theme-wine/30
                            transition-all duration-300 shadow-lg
                            disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </motion.button>
                        <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 rounded-lg bg-theme-wine/20 hover:bg-theme-wine/30
                            text-white border border-theme-wine/30
                            transition-all duration-300 shadow-lg"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Checkout Section */}
          <motion.div
            variants={itemVariants}
            className="sticky bottom-0 left-0 right-0 mt-auto 
              bg-gradient-to-t from-theme-navy via-theme-navy/95 to-theme-navy/90
              backdrop-blur-xl border-t border-theme-slate/20 
              p-4 md:p-5 rounded-t-2xl shadow-[0_-8px_35px_rgba(0,0,0,0.3)]"
          >
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-white/60">
                  <span>Subtotal</span>
                  <span>₱{getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-white/60">
                  <span>Delivery Fee</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="h-px bg-theme-slate/20 my-3"></div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-white/90">Total</span>
                  <span className="text-theme-peach">₱{getTotal().toFixed(2)}</span>
                </div>
              </div>
              
              {/* Checkout Buttons */}
              <div className="flex gap-3">
                <Link href="/menu" className="flex-1">
                  <motion.button
                    whileHover={{ x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2.5 rounded-lg
                      bg-theme-navy/60 hover:bg-theme-navy/80
                      text-white/80 hover:text-white font-medium text-sm
                      border border-theme-slate/20 hover:border-theme-slate/30
                      transition-all duration-300
                      flex items-center justify-center gap-2"
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span className="hidden md:inline">Continue Shopping</span>
                    <span className="md:hidden">Menu</span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="group flex-[2] py-2.5 rounded-lg
                    bg-gradient-to-r from-theme-peach via-theme-red to-theme-peach
                    hover:from-theme-red hover:via-theme-peach hover:to-theme-red
                    text-white text-sm font-bold
                    shadow-lg shadow-theme-peach/20 hover:shadow-xl hover:shadow-theme-peach/30
                    border border-white/10
                    transition-all duration-500
                    flex items-center justify-center gap-2"
                >
                  <ShoppingBagIcon className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-500" />
                  <span className="hidden md:inline">Proceed to Checkout</span>
                  <span className="md:hidden">Checkout</span>
                  <ChevronRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}