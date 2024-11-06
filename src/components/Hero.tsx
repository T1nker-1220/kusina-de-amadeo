export default function Hero() {
  return (
    <div className="relative h-[90vh] overflow-hidden bg-gradient-to-r from-primary-900 to-primary-800">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="font-display text-5xl md:text-7xl mb-6">
            Authentic Filipino Cuisine
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            Experience the rich flavors of traditional Filipino dishes, 
            crafted with passion and served with pride.
          </p>
          <button className="bg-white text-primary-900 px-8 py-3 rounded-full 
            font-medium hover:bg-primary-100 transition-colors">
            View Our Menu
          </button>
        </div>
      </div>
    </div>
  )
} 