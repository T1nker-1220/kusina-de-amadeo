'use client';
import { categories } from '@/data/categories';
import { motion, AnimatePresence } from 'framer-motion';
import { memo, useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CategoryFilterProps {
  categories: { id: string; name: string; image: string; description: string; products: string[]; }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const buttonVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: { opacity: 0, scale: 0.9 },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

const CategoryFilter: React.FC<CategoryFilterProps> = memo(({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // Initialize scroll check
  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Scroll handlers
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group max-w-full">
      {/* Scroll Left Button */}
      <AnimatePresence>
        {showLeftScroll && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center
              bg-theme-navy hover:bg-theme-slate rounded-full shadow-xl backdrop-blur-sm
              text-white/90 hover:text-white border border-theme-slate/20 hover:border-theme-slate/40
              transform transition-all duration-300 ease-out
              -translate-x-3 hover:-translate-x-4"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll Right Button */}
      <AnimatePresence>
        {showRightScroll && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center
              bg-theme-navy hover:bg-theme-slate rounded-full shadow-xl backdrop-blur-sm
              text-white/90 hover:text-white border border-theme-slate/20 hover:border-theme-slate/40
              transform transition-all duration-300 ease-out
              translate-x-3 hover:translate-x-4"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="overflow-x-auto scrollbar-none overscroll-x-contain mask-edges relative"
      >
        <div className="flex gap-3 min-w-max py-2 px-4">
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onSelectCategory('all')}
            className={`px-6 py-3 rounded-xl backdrop-blur-sm border font-medium
              transition-all duration-300 shadow-lg hover:shadow-xl
              ${selectedCategory === 'all'
                ? 'bg-gradient-to-br from-theme-peach to-theme-red border-theme-peach text-white shadow-theme-peach/20'
                : 'bg-theme-dark/40 border-theme-slate/20 text-white/90 hover:bg-theme-dark/60 hover:border-theme-slate/40 hover:text-white'
              }`}
          >
            All Items
          </motion.button>

          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onSelectCategory(category.id)}
              className={`px-6 py-3 rounded-xl backdrop-blur-sm border font-medium
                transition-all duration-300 shadow-lg hover:shadow-xl
                ${selectedCategory === category.id
                  ? 'bg-gradient-to-br from-theme-peach to-theme-red border-theme-peach text-white shadow-theme-peach/20'
                  : 'bg-theme-dark/40 border-theme-slate/20 text-white/90 hover:bg-theme-dark/60 hover:border-theme-slate/40 hover:text-white'
                }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-theme-navy via-theme-navy/95 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-theme-navy via-theme-navy/95 to-transparent pointer-events-none" />
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;