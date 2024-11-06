'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-orange-600/90 text-white shadow-lg">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo.png"
                alt="Kusina De Amadeo Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold hidden md:block">Kusina De Amadeo</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link 
              href="/menu" 
              className="hover:text-orange-200 transition-colors font-medium"
            >
              Menu
            </Link>
            <Link 
              href="/cart" 
              className="hover:text-orange-200 transition-colors font-medium"
            >
              Cart
            </Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              href="/menu" 
              className="block hover:text-orange-200 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link 
              href="/cart" 
              className="block hover:text-orange-200 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
} 