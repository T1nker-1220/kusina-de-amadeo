'use client';
import { useState } from 'react';
import { products, categories } from '@/data/products';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Our Menu</h1>
      
      {/* Category Filter */}
      <div className="mb-8">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md bg-white text-gray-800"
          aria-label="Filter products by category"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2 text-gray-800">₱{product.price}</p>
            <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 