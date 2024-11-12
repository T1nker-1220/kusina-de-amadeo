'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  HomeIcon, 
  BookOpenIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { FaFacebook } from 'react-icons/fa';

export default function Navbar() {
  const { items } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-theme-dark/80 backdrop-blur-lg border-b border-theme-slate/20' 
        : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <span className="text-xl font-bold text-theme-peach">
              Kusina De Amadeo
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" icon={<HomeIcon className="w-6 h-6" />}>Home</NavLink>
            <NavLink href="/menu" icon={<BookOpenIcon className="w-6 h-6" />}>Menu</NavLink>
            <NavLink href="/about" icon={<InformationCircleIcon className="w-6 h-6" />}>About</NavLink>
          </div>

          <Link href="/cart">
            <button className="relative p-2 rounded-lg bg-theme-wine/20 
              hover:bg-theme-wine/30 transition-colors">
              <ShoppingCartIcon className="w-6 h-6 text-theme-peach" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full
                  bg-theme-red text-white text-xs flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link href={href}>
      <span className="text-white/70 hover:text-white transition-colors
        flex items-center gap-2">
        {icon}
        {children}
      </span>
    </Link>
  );
} 