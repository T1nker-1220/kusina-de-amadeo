'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  HomeIcon, 
  BookOpenIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { FaFacebook } from 'react-icons/fa';
import NotificationBell from './NotificationBell'; // Assuming NotificationBell is in the same directory

export default function Navbar() {
  const { items } = useCart();
  const { user, loading: authLoading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-theme-dark/90 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-theme-slate/10' 
          : 'bg-transparent'}
        safe-padding`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image
                src="/images/logo.png"
                alt="Kusina De Amadeo Logo"
                width={40}
                height={40}
                priority
                className="object-contain"
              />
            </motion.div>
            <motion.span 
              className="animated-text font-bold hidden md:inline"
            >
              Kusina De Amadeo
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" icon={<HomeIcon className="w-5 h-5" />}>Home</NavLink>
            <NavLink href="/menu" icon={<BookOpenIcon className="w-5 h-5" />}>Menu</NavLink>
            <NavLink href="/about" icon={<InformationCircleIcon className="w-5 h-5" />}>About</NavLink>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            {/* Login/Profile Button */}
            <Link href={user ? "/profile" : "/login"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10
                  hover:from-orange-500/20 hover:to-orange-600/20
                  border border-orange-500/20 hover:border-orange-500/30
                  transition-all duration-300 group"
              >
                {user && user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || "Profile"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-6 h-6 text-orange-400 
                    group-hover:text-orange-500 transition-colors" />
                )}
              </motion.button>
            </Link>

            {/* Notification Bell */}
            <NotificationBell />

            {/* Cart Button */}
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10
                  hover:from-orange-500/20 hover:to-orange-600/20
                  border border-orange-500/20 hover:border-orange-500/30
                  transition-all duration-300 group"
              >
                <ShoppingCartIcon className="w-6 h-6 text-orange-400 
                  group-hover:text-orange-500 transition-colors" />
                {items.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full
                      bg-gradient-to-r from-orange-500 to-orange-600
                      text-white text-xs font-medium
                      flex items-center justify-center
                      shadow-lg shadow-orange-500/30"
                  >
                    {items.length}
                  </motion.span>
                )}
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link href={href} className="group flex items-center gap-2">
      <span className="text-orange-400 group-hover:text-orange-500 transition-colors">
        {icon}
      </span>
      <span className="text-theme-slate group-hover:text-white transition-colors">
        {children}
      </span>
    </Link>
  );
}