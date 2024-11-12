import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { CartProvider } from '@/context/CartContext'
import Footer from '@/components/Footer'
import { Suspense } from 'react';



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kusina De Amadeo',
  description: 'Your favorite local fast food store since 2021',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-dark-blue to-navy min-h-screen text-peach">
        <CartProvider>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <main className="pt-16">{children}</main>
          </Suspense>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
} 