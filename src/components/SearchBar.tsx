'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
      className="relative max-w-xl mx-auto"
    >
      <input
        type="text"
        placeholder="Search menu items..."
        onChange={(e) => onSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-3 pl-12
          rounded-xl backdrop-blur-xl
          bg-white/5 border border-white/20
          text-white/90 placeholder:text-white/50
          focus:outline-none focus:border-white/30
          transition-all duration-300"
      />
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
    </motion.div>
  );
} 