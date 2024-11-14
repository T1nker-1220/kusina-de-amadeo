'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, Bars3Icon, HomeIcon, BookOpenIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 1, href: '/', label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
    { id: 2, href: '/menu', label: 'Menu', icon: <BookOpenIcon className="w-6 h-6" /> },
    { id: 3, href: '/about', label: 'About', icon: <InformationCircleIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-1/2 -translate-x-1/2 top-2 z-50
          px-5 py-3 rounded-2xl
          bg-gradient-to-r from-orange-500/5 to-orange-600/10
          hover:from-orange-500/10 hover:to-orange-600/15
          border border-orange-400/30
          backdrop-blur-xl shadow-xl
          transition-all duration-300 ease-in-out
          flex items-center gap-3
          hover:scale-105"
        aria-label="Open menu"
      >
        <Bars3Icon className="w-5 h-5 text-orange-400" />
        <span className="text-orange-400 text-sm font-medium tracking-wide uppercase">Menu</span>
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <motion.div
              key="mobile-menu-overlay"
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              key="mobile-menu-content"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed left-0 right-0 top-0 w-full 
                bg-gradient-to-b from-black/90 via-black/85 to-black/90
                backdrop-blur-2xl z-50 p-6 shadow-2xl overflow-y-auto
                border-b border-orange-500/20
                before:absolute before:inset-0 before:z-[-1]
                before:bg-gradient-to-b before:from-orange-500/10 before:via-orange-400/5 before:to-orange-600/10
                before:animate-pulse before:pointer-events-none"
            >
              <div className="flex flex-col items-center gap-6 mb-8">
                <Image
                  src="/images/logo.png"
                  alt="Kusina De Amadeo Logo"
                  width={80}
                  height={80}
                  priority
                  className="rounded-full border-2 border-theme-peach/20"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full 
                    bg-white/10 hover:bg-white/20 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="w-6 h-6 text-white" />
                </button>
              </div>

              <nav className="flex flex-col items-center justify-center space-y-4">
                {menuItems.map((item) => (
                  <motion.div
                    key={`menu-item-${item.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl
                        text-white/80 hover:text-white
                        bg-gradient-to-r from-orange-500/10 to-orange-600/10
                        hover:from-orange-500/20 hover:to-orange-600/20
                        border border-orange-500/20 hover:border-orange-500/30
                        transition-all duration-300 ease-in-out
                        backdrop-blur-md
                        transform hover:translate-x-1 hover:scale-105
                        group"
                    >
                      <span className="p-2 rounded-lg bg-theme-wine/20 
                        group-hover:bg-theme-wine/30 transition-colors">
                        {item.icon}
                      </span>
                      <span className="text-lg font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}