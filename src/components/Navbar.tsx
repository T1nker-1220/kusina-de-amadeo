'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { toast } from 'react-hot-toast';
import { 
  HomeIcon, 
  BookOpenIcon, 
  InformationCircleIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

// Dynamically import components that are not immediately needed
const NotificationBell = dynamic(() => import('./NotificationBell'), {
  ssr: false,
  loading: () => (
    <div className="w-6 h-6 rounded-full bg-gray-700/20 animate-pulse" />
  ),
});

const CartButton = dynamic(() => import('./CartButton'), {
  ssr: false,
  loading: () => (
    <div className="w-6 h-6 rounded-full bg-gray-700/20 animate-pulse" />
  ),
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();

  // Memoize scroll handler
  const handleScroll = useCallback(() => {
    const scrollThreshold = 10;
    setIsScrolled(window.scrollY > scrollThreshold);
  }, []);

  useEffect(() => {
    // Add passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleProfileClick = () => {
    if (!user) {
      router.push('/auth');
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform
          ${isScrolled 
            ? 'bg-theme-dark/95 backdrop-blur-xl shadow-lg shadow-black/10' 
            : 'bg-transparent backdrop-blur-sm'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Section - Optimized for mobile */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-8 h-8 sm:w-10 sm:h-10"
                >
                  <Image
                    src="/images/logo.png"
                    alt="Kusina De Amadeo"
                    fill
                    sizes="(max-width: 640px) 2rem, 2.5rem"
                    priority
                    className="object-contain"
                  />
                </motion.div>
                <motion.span 
                  className="text-xs sm:text-sm md:text-base font-semibold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
                    bg-clip-text text-transparent whitespace-nowrap"
                >
                  Kusina De Amadeo
                </motion.span>
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden md:flex items-center justify-center flex-1 ml-8">
              <div className="flex items-center gap-1">
                <NavLink href="/" icon={<HomeIcon className="w-5 h-5" />}>Home</NavLink>
                <NavLink href="/menu" icon={<BookOpenIcon className="w-5 h-5" />}>Menu</NavLink>
                <NavLink href="/about" icon={<InformationCircleIcon className="w-5 h-5" />}>About</NavLink>
              </div>
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-3">
              <CartButton />
              <NotificationBell />
              {user ? (
                <div className="flex items-center gap-2">
                  <Link 
                    href="/profile" 
                    className="text-orange-400 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-500/5"
                  >
                    <UserCircleIcon className="w-6 h-6" />
                  </Link>
                  {isAdmin && (
                    <Link 
                      href="/admin/orders" 
                      className="text-orange-400 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-500/5"
                    >
                      <Cog6ToothIcon className="w-6 h-6" />
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-orange-400 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-500/5"
                  >
                    <ArrowRightOnRectangleIcon className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="text-orange-400 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-500/5"
                >
                  <UserCircleIcon className="w-6 h-6" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              <NotificationBell />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-orange-400 hover:text-orange-500 hover:bg-orange-500/5 transition-colors"
                aria-label="Toggle menu"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with AnimatePresence */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-theme-dark/95 backdrop-blur-xl border-t border-gray-800"
            >
              <div className="px-4 pt-2 pb-3 space-y-1">
                <MobileNavLink href="/" icon={<HomeIcon className="w-5 h-5" />}>Home</MobileNavLink>
                <MobileNavLink href="/menu" icon={<BookOpenIcon className="w-5 h-5" />}>Menu</MobileNavLink>
                <MobileNavLink href="/about" icon={<InformationCircleIcon className="w-5 h-5" />}>About</MobileNavLink>
                <MobileNavLink href="/cart" icon={<ShoppingCartIcon className="w-5 h-5" />}>View Cart</MobileNavLink>
                {isAdmin && (
                  <MobileNavLink href="/admin/orders" icon={<Cog6ToothIcon className="w-5 h-5" />}>Admin</MobileNavLink>
                )}
                
                {/* Profile/Sign In Section */}
                {user ? (
                  <>
                    <MobileNavLink href="/profile" icon={<UserCircleIcon className="w-5 h-5" />}>Profile</MobileNavLink>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2 text-base font-medium text-orange-400 hover:text-orange-500 hover:bg-orange-500/5 rounded-lg transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => router.push('/auth')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-base font-medium text-orange-400 hover:text-orange-500 hover:bg-orange-500/5 rounded-lg transition-colors"
                  >
                    <UserCircleIcon className="w-5 h-5" />
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors
        ${isActive 
          ? 'text-orange-400 bg-orange-500/10' 
          : 'text-gray-300 hover:text-orange-400 hover:bg-orange-500/5'
        }`}
    >
      {icon}
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 text-base font-medium rounded-lg transition-colors
        ${isActive 
          ? 'text-orange-400 bg-orange-500/10' 
          : 'text-gray-300 hover:text-orange-400 hover:bg-orange-500/5'
        }`}
    >
      {icon}
      {children}
    </Link>
  );
}