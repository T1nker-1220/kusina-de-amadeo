'use client';

import React from 'react';
import './globals.css';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

// Dynamically import components with loading fallbacks
const Navbar = dynamic(() => import('@/components/Navbar'), {
  loading: () => <div className="h-16 md:h-20 bg-theme-dark"></div>
});

const MobileMenu = dynamic(() => import('@/components/MobileMenu'), {
  ssr: false
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-16 bg-theme-dark"></div>
});

const LayoutTransition = dynamic(() => import('@/components/LayoutTransition'), {
  ssr: false
});

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
                <React.Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                  </div>
                }>
                  <LayoutTransition>
                    {children}
                  </LayoutTransition>
                </React.Suspense>
              </main>
              <Footer />
              <Toaster 
                position="top-center"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#1F2937',
                    color: '#fff',
                  },
                  success: {
                    iconTheme: {
                      primary: '#F97316',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}