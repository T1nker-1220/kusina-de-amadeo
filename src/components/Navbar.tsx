'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-glass bg-glass border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-all">
            <div className="relative w-12 h-12 bg-white/10 rounded-xl p-2 backdrop-blur-sm">
              <Image
                src="/images/logo.png"
                alt="Kusina De Amadeo Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold hidden md:block text-white/90">
              Kusina De Amadeo
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {['Menu', 'Cart'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative text-white/80 hover:text-white transition-colors group"
              >
                <span>{item}</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 mt-4 border-t border-white/10">
            {['Menu', 'Cart'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
} 