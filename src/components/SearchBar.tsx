'use client';
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search menu items..."
          className="w-full py-2.5 px-4 pl-11 pr-10 rounded-xl
            bg-white/5 border border-white/10
            text-white placeholder-white/40
            focus:outline-none focus:border-orange-500/50 focus:bg-white/10
            transition-all duration-300"
        />
        <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 
          w-5 h-5 text-white/40 transition-colors duration-300
          group-focus-within:text-orange-500/70" />
        
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2
                p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white/90
                transition-colors duration-300"
            >
              <XMarkIcon className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute inset-0 -z-10 rounded-xl
                bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-transparent
                blur-xl transition-opacity duration-300"
            />
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}