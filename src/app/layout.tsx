import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import AnimatedBackground from '@/components/AnimatedBackground'
import { CartProvider } from '@/context/CartContext'

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
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-orange-950 to-orange-900`}>
        <CartProvider>
          <AnimatedBackground />
          <Navbar />
          <main className="relative">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
} 