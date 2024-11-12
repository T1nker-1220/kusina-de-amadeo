 'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About' },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => setIsOpen(true)}
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Open menu"
      >
        <Bars3Icon className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-black/90 
                backdrop-blur-lg z-50 p-6 shadow-xl"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 
                    transition-colors"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="w-6 h-6 text-white" />
                </button>
              </div>

              <nav className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-lg text-white/70 
                      hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}