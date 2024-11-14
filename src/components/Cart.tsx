'use client';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative bg-white/5 backdrop-blur-sm rounded-lg shadow-xl 
        p-1 mobile-s:p-1.5 xs:p-3 min-h-[calc(100vh-3rem)] w-full max-w-2xl mx-auto 
        overflow-hidden transition-all duration-300"
    >
      {/* Cart Header */}
      <motion.div 
        layout
        className="sticky top-0 z-20 bg-black/50 backdrop-blur-md"
      >
        <motion.h2 
          layout
          className="text-sm mobile-s:text-base xs:text-lg sm:text-xl font-bold 
            p-2 flex justify-between items-center"
        >
          <span>My Cart</span>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs mobile-s:text-sm text-gray-400 bg-white/5 
              px-2 py-1 rounded-full">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </motion.div>
        </motion.h2>
        {items.length > 0 && (
          <div className="text-xs text-gray-400 px-2 pb-2">
            Swipe items left to remove
          </div>
        )}
      </motion.div>

      {/* Cart Content */}
      {items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center h-[50vh] text-gray-400"
        >
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-center">Your cart is empty</p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="pb-32 mobile-s:pb-36 overflow-y-auto 
              max-h-[calc(100vh-10rem)] px-1 mobile-s:px-2"
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -100) {
                    removeFromCart(item.id);
                  }
                }}
                className="group bg-white/5 hover:bg-white/10 transition-all rounded-lg 
                  my-1.5 mobile-s:my-2 transform will-change-transform relative
                  overflow-hidden"
              >
                {/* Slide indicator */}
                {isMobile && (
                  <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l 
                    from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 
                    transition-opacity pointer-events-none" />
                )}

                <div className="p-2 mobile-s:p-3">
                  <div className="flex items-start gap-1.5 mobile-s:gap-2 xs:gap-3">
                    <motion.div 
                      layoutId={`image-${item.id}`}
                      className="relative flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 mobile-s:w-14 mobile-s:h-14 xs:w-20 xs:h-20 
                          object-cover rounded-lg ring-1 ring-white/10"
                      />
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] 
                        font-bold w-4 h-4 mobile-s:w-5 mobile-s:h-5 flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </motion.div>
                    
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex justify-between items-start gap-1">
                        <h3 className="font-medium text-xs mobile-s:text-sm xs:text-base 
                          truncate max-w-[150px] mobile-s:max-w-[180px]">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 text-[10px] mobile-s:text-xs p-1"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm mobile-s:text-base xs:text-lg font-bold text-primary mt-0.5">₱{item.price}</p>
                      
                      <div className="flex items-center justify-between mt-1.5">
                        <motion.div 
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center bg-white/5 rounded-lg shadow-inner"
                        >
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 mobile-s:w-7 mobile-s:h-7 xs:w-8 xs:h-8 
                              flex items-center justify-center active:bg-white/20 
                              rounded-l-lg transition-colors touch-manipulation"
                          >
                            -
                          </motion.button>
                          <span className="w-5 mobile-s:w-6 xs:w-8 text-center text-xs mobile-s:text-sm">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 mobile-s:w-7 mobile-s:h-7 xs:w-8 xs:h-8 
                              flex items-center justify-center active:bg-white/20 
                              rounded-r-lg transition-colors touch-manipulation"
                          >
                            +
                          </motion.button>
                        </motion.div>
                        <p className="text-xs mobile-s:text-sm xs:text-base font-semibold">
                          ₱{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Checkout Bar */}
          <motion.div 
            layout
            initial={false}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 inset-x-0 mobile-s:mx-2 xs:mx-4 
              bg-black/95 backdrop-blur-lg rounded-t-xl shadow-2xl 
              border-t border-white/10 transform transition-transform 
              duration-300 ease-in-out z-30"
          >
            <motion.div 
              layout
              className="max-w-2xl mx-auto p-3 mobile-s:p-4 space-y-2"
            >
              {/* Price Summary */}
              <div className="grid grid-cols-2 gap-1 text-xs mobile-s:text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-right">₱{getTotal().toFixed(2)}</span>
                <span className="text-gray-400">Delivery</span>
                <span className="text-right">Free</span>
                <span className="font-bold pt-1 border-t border-white/10">Total</span>
                <span className="text-right font-bold text-primary pt-1 border-t border-white/10">
                  ₱{getTotal().toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="fancy-button w-full py-2.5 mobile-s:py-3"
              >
                Checkout
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}