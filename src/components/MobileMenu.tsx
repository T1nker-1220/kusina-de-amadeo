'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, Bars3Icon, HomeIcon, BookOpenIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
    { href: '/menu', label: 'Menu', icon: <BookOpenIcon className="w-6 h-6" /> },
    { href: '/about', label: 'About', icon: <InformationCircleIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => setIsOpen(true)}
        className="fixed left-1/2 top-4 -translate-x-1/2 z-50
          p-3 rounded-full bg-theme-wine/20 backdrop-blur-md
          hover:bg-theme-wine/30 transition-all duration-300
          border border-white/10 shadow-lg"
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
              className="fixed right-0 top-0 bottom-0 w-72 bg-black/90 
                backdrop-blur-lg z-50 p-6 shadow-xl"
            >
              <div className="flex flex-col items-center gap-6 mb-12">
                <Image
                  src="/images/logo.png"
                  alt="Kusina De Amadeo Logo"
                  width={100}
                  height={100}
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

              <nav className="space-y-3">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl
                        text-white/70 hover:text-white
                        bg-white/5 hover:bg-white/10
                        transition-all duration-300
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
}