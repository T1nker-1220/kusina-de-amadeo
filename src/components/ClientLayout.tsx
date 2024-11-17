'use client';
import React from 'react';
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import { CartProvider } from '@/context/CartContext'
import Footer from '@/components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <MobileMenu />
      <main className="safe-padding pt-16">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}