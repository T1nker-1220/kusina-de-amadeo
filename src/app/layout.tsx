import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import AnimatedBackground from '@/components/AnimatedBackground'

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
      <body className={`${inter.className} text-gray-800`}>
        <AnimatedBackground />
        <Navbar />
        <main className="container mx-auto px-4 py-8 relative">
          {children}
        </main>
      </body>
    </html>
  )
} 