'use client';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { categories } from '@/data/categories';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full max-w-[2000px] mx-auto">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white/90 leading-tight">
              Savor the Taste of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Authentic Filipino
              </span>{' '}
              Cuisine
            </h1>
            
            <p className="text-xl text-white/70 max-w-2xl">
              Experience the rich flavors and warm hospitality of Filipino cooking, 
              crafted with love and served with pride since 2021.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 
                    text-white font-medium flex items-center gap-2 
                    shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 
                    transition-shadow"
                >
                  View Our Menu
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white/90">
                Featured Categories
              </h2>
              <p className="text-white/70">
                Explore our delicious menu selections
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link 
                  key={category.id}
                  href={`/menu?category=${category.id}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-2xl aspect-square 
                      backdrop-blur-sm bg-white/5 border border-white/10
                      hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10
                      transition-all duration-300"
                  >
                    {/* Category Image */}
                    <div className="absolute inset-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover 
                          group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t 
                        from-black/80 via-black/50 to-transparent" />
                    </div>

                    {/* Category Content */}
                    <div className="relative h-full p-6 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {category.description}
                      </p>
                      <div className="flex items-center gap-2 text-orange-400 
                        group-hover:text-orange-300 transition-colors">
                        <span>View Menu</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 backdrop-blur-3xl bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white/90">
                  Our Story
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Since 2021, Kusina De Amadeo has been serving authentic Filipino cuisine 
                  with a modern twist. Our passion for traditional recipes and commitment 
                  to quality ingredients creates an unforgettable dining experience.
                </p>
                <Link href="/about">
                  <button className="px-6 py-3 rounded-lg bg-white/10 text-white/90 
                    hover:bg-white/20 transition-colors">
                    Learn More
                  </button>
                </Link>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/images/restaurant.jpg"
                  alt="Restaurant Interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 