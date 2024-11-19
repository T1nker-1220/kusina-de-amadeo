'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
  initial: { 
    opacity: 0,
    y: 20,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1,
    y: 0,
    filter: 'blur(0px)'
  },
  exit: { 
    opacity: 0,
    y: -20,
    filter: 'blur(10px)'
  }
};

export default function LayoutTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname || 'default'}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.4,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}