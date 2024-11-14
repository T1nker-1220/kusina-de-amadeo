// src/components/SearchAndFilter.tsx
import { useState } from 'react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onPriceRange: (range: [number, number]) => void;
}

export default function SearchAndFilter({ onSearch, onPriceRange }: SearchAndFilterProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Search menu items..."
          onChange={(e) => onSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 text-white"
        />
        <div>
          <p className="text-white/70">Price: ₱{priceRange[0]} - ₱{priceRange[1]}</p>
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange[1]}
            aria-label="Price range slider"
            onChange={(e) => {
              const newRange: [number, number] = [0, parseInt(e.target.value)];
              setPriceRange(newRange);
              onPriceRange(newRange);
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}