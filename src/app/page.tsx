import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center max-w-4xl mx-auto">
      {/* Logo Container */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-64 h-64 animate-fade-in">
          <Image
            src="/images/products/logo.png"
            alt="Kusina De Amadeo Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to Kusina De Amadeo
      </h1>
      <p className="mb-8 text-gray-700 text-lg">
        Serving delicious Filipino meals since 2021
      </p>
      
      {/* Menu Buttons */}
      <div className="space-y-4 md:space-y-0 md:space-x-4">
        <Link 
          href="/menu" 
          className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 inline-block transition-all hover:scale-105"
        >
          View Our Menu
        </Link>
        <Link 
          href="/about" 
          className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 inline-block transition-all hover:scale-105"
        >
          About Us
        </Link>
      </div>

      {/* Optional: Add business hours or contact info */}
      <div className="mt-12 bg-orange-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Hours</h2>
        <p className="text-gray-700">
          Open Daily: 5:00 AM - 12:00 AM
        </p>
        <p className="text-gray-700 mt-2">
          Contact: (09605088715)
        </p>
      </div>
    </div>
  )
} 