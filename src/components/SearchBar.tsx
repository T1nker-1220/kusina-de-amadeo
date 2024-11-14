'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  // Call onSearch whenever query changes
  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission since we're searching on every change
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search menu items..."
          className="w-full py-2 px-4 pl-10 rounded-lg
            bg-white/5 border border-white/10
            text-white placeholder-white/50
            focus:outline-none focus:border-orange-500/50
            transition-colors"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 
          w-5 h-5 text-white/50" />
      </div>
    </form>
  );
}