'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';

// Create a client component for the part that uses useSearchParams
function MenuContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
    setIsLoading(false);
  }, [searchParams]);

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="min-h-screen w-full max-w-[2000px] mx-auto">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white/90">Our Menu</h1>
              <p className="text-white/70">
                Discover our delicious selection of Filipino dishes
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={(category) => {
                setSelectedCategory(category);
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 300);
              }}
            />
          </div>

          {/* Results Count */}
          <div className="mb-4 text-white/60">
            {filteredProducts.length} items found
          </div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/70">No items found in this category</p>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-2xl bg-white/5 aspect-square"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Your page component
export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuContent />
    </Suspense>
  )
}