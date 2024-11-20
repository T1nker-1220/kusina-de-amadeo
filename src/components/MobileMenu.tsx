'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ShoppingBagIcon,
  UserCircleIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid, 
  ShoppingBagIcon as ShoppingBagIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  BookOpenIcon as BookOpenIconSolid,
} from '@heroicons/react/24/solid';
import { 
  XMarkIcon, 
  Bars3Icon, 
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import NotificationBell from './NotificationBell';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: HomeIcon, activeIcon: HomeIconSolid },
    { href: '/menu', label: 'Menu', icon: BookOpenIcon, activeIcon: BookOpenIconSolid },
    { href: '/cart', label: 'Cart', icon: ShoppingBagIcon, activeIcon: ShoppingBagIconSolid },
    { href: '/profile', label: 'Profile', icon: UserCircleIcon, activeIcon: UserCircleIconSolid },
  ];

  const menuItems = [
    { id: 1, href: '/', label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
    { id: 2, href: '/menu', label: 'Menu', icon: <BookOpenIcon className="w-6 h-6" /> },
    { id: 3, href: '/about', label: 'About', icon: <InformationCircleIcon className="w-6 h-6" /> },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="md:hidden">
      {/* Fixed bottom Action Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-theme-dark/95 backdrop-blur-xl border-t border-orange-500/10">
          <div className="max-w-md mx-auto px-4">
            <div className="flex items-center justify-around">
              {links.map(({ href, label, icon: Icon, activeIcon: ActiveIcon }) => {
                const isActive = pathname === href;
                const hasItems = label === 'Cart' && items.length > 0;
                
                return (
                  <Link 
                    key={href} 
                    href={href}
                    className="relative py-1.5"
                  >
                    <motion.div
                      className="flex flex-col items-center gap-0.5 relative"
                      whileTap={{ scale: 0.9 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute -top-1.5 inset-x-0 mx-auto w-6 h-0.5 
                            bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 
                            rounded-full shadow-sm shadow-orange-500/30"
                          transition={{ 
                            type: "spring", 
                            bounce: 0.2, 
                            duration: 0.6 
                          }}
                        />
                      )}
                      
                      <div className={`relative rounded-lg p-1.5 
                        ${isActive 
                          ? 'bg-orange-500/20 shadow-sm shadow-orange-500/10' 
                          : 'hover:bg-theme-slate/10'
                        } transition-colors duration-200`}
                      >
                        {isActive ? (
                          <ActiveIcon className="w-5 h-5 text-orange-400" />
                        ) : (
                          <Icon className="w-5 h-5 text-theme-slate/70" />
                        )}
                        
                        {hasItems && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-3.5 h-3.5
                              bg-gradient-to-r from-orange-500 to-orange-600 
                              rounded-full flex items-center justify-center
                              shadow-sm shadow-orange-500/30 border border-theme-dark/50"
                          >
                            <span className="text-[9px] font-medium text-white">
                              {items.length}
                            </span>
                          </motion.div>
                        )}
                      </div>
                      
                      <span className={`text-[10px] font-medium
                        ${isActive 
                          ? 'text-orange-400' 
                          : 'text-theme-slate/70'
                        } transition-colors duration-200`}
                      >
                        {label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70]"
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-4/5 max-w-sm
                bg-black/90 backdrop-blur-xl
                border-r border-orange-500/20
                p-6 overflow-y-auto
                flex flex-col
                z-[80]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <Image
                    src="/images/logo.png"
                    alt="Kusina De Amadeo Logo"
                    width={40}
                    height={40}
                    priority
                    className="rounded-full"
                  />
                  <span className="text-white font-semibold">
                    Kusina De Amadeo
                  </span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-orange-500/10"
                >
                  <XMarkIcon className="w-6 h-6 text-orange-400" />
                </motion.button>
              </div>

              {/* User Profile */}
              {user && (
                <div className="mb-8 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                  <div className="flex items-center gap-4">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || "Profile"}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-orange-500/10
                        flex items-center justify-center">
                        <UserCircleIcon className="w-8 h-8 text-orange-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-white font-medium">
                        {user.displayName || 'User'}
                      </h3>
                      <p className="text-orange-400/80 text-sm truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <nav className="flex-1">
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.id * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-xl
                          text-white/80 hover:text-white
                          bg-orange-500/5 hover:bg-orange-500/10
                          border border-orange-500/10 hover:border-orange-500/20
                          transition-all duration-300"
                      >
                        <span className="p-2 rounded-lg bg-orange-500/10">
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Footer Actions */}
              <div className="mt-8 space-y-2">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl
                        text-white/80 hover:text-white
                        bg-orange-500/5 hover:bg-orange-500/10
                        border border-orange-500/10 hover:border-orange-500/20
                        transition-all duration-300"
                    >
                      <span className="p-2 rounded-lg bg-orange-500/10">
                        <Cog6ToothIcon className="w-6 h-6" />
                      </span>
                      <span className="font-medium">Settings</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-4 p-4 rounded-xl
                        text-red-400 hover:text-red-300
                        bg-red-500/5 hover:bg-red-500/10
                        border border-red-500/10 hover:border-red-500/20
                        transition-all duration-300"
                    >
                      <span className="p-2 rounded-lg bg-red-500/10">
                        <ArrowRightOnRectangleIcon className="w-6 h-6" />
                      </span>
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-xl
                      text-white/80 hover:text-white
                      bg-orange-500/5 hover:bg-orange-500/10
                      border border-orange-500/10 hover:border-orange-500/20
                      transition-all duration-300"
                  >
                    <span className="p-2 rounded-lg bg-orange-500/10">
                      <UserCircleIcon className="w-6 h-6" />
                    </span>
                    <span className="font-medium">Sign In</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}