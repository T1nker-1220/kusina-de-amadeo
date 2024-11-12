'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Category } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const category = searchParams.get('category') as Category;
      if (category && categories.some(cat => cat.id === category)) {
        setSelectedCategory(category);
      }
    } catch {
      setError('Invalid category parameter');
    }
  }, [searchParams]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white/90">Our Menu</h1>
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => setSelectedCategory(category as Category)}
        />

        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-8"
            >
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={{...product, id: Number(product.id), image: product.image || ''}} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-white/70">No products found in this category</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}