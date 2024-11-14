'use client';
import { useState } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import { Product } from '@/types/index';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 bg-gradient-to-br from-theme-navy/40 to-theme-dark/60
        backdrop-blur-md rounded-2xl p-6 border border-theme-slate/10 
        shadow-xl shadow-theme-dark/10">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
        animate-fadeIn">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center p-12 rounded-2xl 
          bg-gradient-to-br from-theme-navy/40 to-theme-dark/60
          backdrop-blur-md border border-theme-slate/10">
          <p className="text-xl bg-gradient-to-r from-theme-slate to-theme-peach/70 
            bg-clip-text text-transparent">
            No products found matching your search
          </p>
        </div>
      )}
    </div>
  );
}