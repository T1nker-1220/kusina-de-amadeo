'use client';

import React, { Suspense } from 'react';
import './globals.css';
import { Poppins } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LayoutTransition from '@/components/LayoutTransition';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-theme-dark text-white min-h-screen">
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <MobileMenu />
              <main className="flex-grow pt-16 md:pt-20">
                <Suspense fallback={<div>Loading...</div>}>
                  <LayoutTransition>
                    {children}
                  </LayoutTransition>
                </Suspense>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}