'use client';
import { categories } from '@/data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex gap-2 pb-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full backdrop-blur-glass border transition-all duration-300 whitespace-nowrap
            ${selectedCategory === 'all' 
              ? 'bg-white/20 border-white/30 text-white' 
              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
            }`}
        >
          All Items
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full backdrop-blur-glass border transition-all duration-300 whitespace-nowrap
              ${selectedCategory === category 
                ? 'bg-white/20 border-white/30 text-white' 
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
} 