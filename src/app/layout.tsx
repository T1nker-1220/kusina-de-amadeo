import './globals.css';
import { Poppins } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import LayoutTransition from '@/components/LayoutTransition';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Kusina De Amadeo',
  description: 'Your favorite local fast food store since 2021',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-theme-dark text-white min-h-screen">
        <CartProvider>
          <Navbar />
          <MobileMenu />
          <Suspense fallback={<div>Loading...</div>}>
            <main className="pt-16 md:pt-20">
              <LayoutTransition>
                {children}
              </LayoutTransition>
            </main>
          </Suspense>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}