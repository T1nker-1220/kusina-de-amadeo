'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import ResponsiveGrid from '@/components/ResponsiveGrid';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { FolderIcon, FunnelIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export default function MenuPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Refs for scroll animations
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const headerY = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const headerOpacity = useTransform(smoothProgress, [0, 1], [1, 0]);
  const headerScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  // InView animations
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-100px" });
  const isMenuInView = useInView(menuRef, { once: false, margin: "-100px" });
  const isCategoriesInView = useInView(categoriesRef, { once: false, margin: "-100px" });

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
    setIsLoading(false);
  }, [searchParams]);

  const filteredProducts = useMemo(() => 
    products.filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ), [selectedCategory, searchQuery]
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    requestAnimationFrame(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-theme-dark via-theme-dark to-theme-navy/90">
      {/* Hero Header */}
      <section 
        ref={headerRef} 
        className="relative h-[45vh] md:h-[55vh] lg:h-[65vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: headerY, scale: headerScale, opacity: headerOpacity }}
        >
          <Image
            src="/images/menu-hero.jpg"
            alt="Menu Background"
            fill
            className="object-cover object-center"
            priority
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-theme-navy/90 via-theme-dark/95 to-theme-dark" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Our Menu
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl lg:text-2xl text-theme-slate/90 max-w-2xl mx-auto font-medium"
          >
            Discover our authentic Filipino dishes, crafted with love and tradition
          </motion.p>
        </motion.div>
      </section>

      {/* Category Filters */}
      <section 
        ref={categoriesRef}
        className="sticky top-0 z-50 bg-theme-navy/95 backdrop-blur-xl border-y border-theme-slate/20 py-6 shadow-xl"
      >
        <motion.div
          initial="hidden"
          animate={isCategoriesInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4"
        >
          {/* Filter Header */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Browse Categories</h2>
            <p className="text-theme-slate/80">Filter our menu items by category</p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            {/* Search Bar */}
            <motion.div 
              variants={slideIn} 
              className="w-full md:w-auto md:min-w-[320px] lg:min-w-[400px]"
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>
            
            {/* Category Filter */}
            <motion.div 
              variants={slideIn}
              className="w-full md:flex-1 flex items-center gap-4"
            >
              {/* Mobile Filter Toggle */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 text-white px-5 py-3 rounded-xl bg-theme-peach/20 border border-theme-peach/30 hover:bg-theme-peach/30 transition-all duration-300 ease-out shadow-lg shadow-theme-peach/5"
              >
                <FunnelIcon className="h-5 w-5" />
                <span className="font-medium">
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </span>
              </motion.button>
              
              {/* Filter Container */}
              <motion.div 
                className={`${
                  isMobile && !showFilters ? 'hidden' : 'flex'
                } w-full md:w-auto justify-center bg-theme-dark/40 md:bg-transparent rounded-2xl p-4 md:p-0`}
                initial={false}
                animate={showFilters || !isMobile ? 
                  { opacity: 1, y: 0, height: 'auto' } : 
                  { opacity: 0, y: -20, height: 0 }
                }
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              >
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(category) => {
                    setSelectedCategory(category);
                    if (isMobile) {
                      setShowFilters(false);
                    }
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Menu Grid */}
      <section 
        ref={menuRef}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <motion.div
          initial="hidden"
          animate={isMenuInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="space-y-8"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
              >
                <SparklesIcon className="h-10 w-10 text-theme-peach animate-spin" />
                <p className="text-theme-slate animate-pulse">Loading menu items...</p>
              </motion.div>
            ) : (
              <ResponsiveGrid>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={scaleUp}
                    custom={index}
                    layout
                    className="w-full transform hover:scale-[1.02] transition-transform duration-300 ease-out"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </ResponsiveGrid>
            )}
          </AnimatePresence>

          {!isLoading && filteredProducts.length === 0 && (
            <motion.div
              variants={fadeInUp}
              className="text-center py-16 px-4"
            >
              <FolderIcon className="h-16 w-16 text-theme-slate/30 mx-auto mb-4" />
              <p className="text-theme-slate text-lg font-medium mb-2">
                No items found
              </p>
              <p className="text-theme-slate/70">
                Try adjusting your filters or search terms
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </main>
  );
}