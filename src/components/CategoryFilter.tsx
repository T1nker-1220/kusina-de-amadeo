'use client';
import { categories } from '@/data/categories';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-2 min-w-max">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300
            ${selectedCategory === 'all' 
              ? 'bg-orange-500/20 border-orange-500/30 text-white' 
              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
        >
          All Items
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300
              ${selectedCategory === category.id
                ? 'bg-orange-500/20 border-orange-500/30 text-white' 
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
} 