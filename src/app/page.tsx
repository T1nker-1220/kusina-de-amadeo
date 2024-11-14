'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'; // Add this import
import Link from 'next/link';
import { useState } from 'react';
import { categories } from '@/data/categories';
import { testimonials } from '@/data/testimonials';

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const testimonialVariants = {
    enter: {
      opacity: 0,
      rotateY: 90,
      transformPerspective: 1200,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    center: {
      opacity: 1,
      rotateY: 0,
      transformPerspective: 1200,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      rotateY: -90,
      transformPerspective: 1200,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const getImageIndex = (index: number) => wrap(0, testimonials.length, index);

  const getVisibleImages = () => {
    const current = currentTestimonial;
    return [-2, -1, 0, 1, 2].map((offset) => ({
      image: testimonials[getImageIndex(current + offset)].image,
      index: getImageIndex(current + offset)
    }));
  };

  const sliderVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const jumpToImage = (index: number) => {
    const diff = index - currentTestimonial;
    setDirection(diff > 0 ? 1 : -1);
    setCurrentTestimonial(getImageIndex(index));
  };

  const paginationControls = (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-10 
      flex items-center gap-4 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md 
      border border-white/20">
      <button
        onClick={() => jumpToImage(currentTestimonial - 5)}
        className="text-white/80 hover:text-orange-400 transition-colors"
      >
        «
      </button>
      {[-2, -1, 0, 1, 2].map((offset) => {
        const index = getImageIndex(currentTestimonial + offset);
        return (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => jumpToImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentTestimonial
                ? 'bg-orange-500 w-4'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        );
      })}
      <button
        onClick={() => jumpToImage(currentTestimonial + 5)}
        className="text-white/80 hover:text-orange-400 transition-colors"
      >
        »
      </button>
    </div>
  );

  return (
    <div className="min-h-screen w-full max-w-[2000px] mx-auto">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
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
                        group-hover:text-orange-300 transition-colors
                        bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm
                        group-hover:bg-black/50 text-base font-medium
                        border border-orange-500/20 group-hover:border-orange-500/40
                        transition-all duration-300 w-fit">
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto"> {/* Changed from max-w-7xl */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white/90">
                Moments at Kusina De Amadeo
              </h2>
              <p className="text-white/70">
                Capturing the joy of dining with us
              </p>
            </div>

            <div className="relative group">
              {/* Image Slider */}
              <div className="relative h-[600px] overflow-hidden rounded-3xl 
                shadow-2xl shadow-black/20 border border-white/10
                group-hover:shadow-orange-500/10 transition-all duration-500">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  {getVisibleImages().map(({ image, index }) => (
                    <motion.div
                      key={index}
                      custom={direction}
                      variants={sliderVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className={`absolute inset-0 w-full h-full ${
                        index === currentTestimonial ? 'z-10' : 'z-0'
                      }`}
                    >
                      <motion.div
                        className="relative w-full h-full overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 1 }}
                      >
                        <img
                          src={image}
                          alt="Dining Moment"
                          className="w-full h-full object-cover transform
                            transition-all duration-[1.5s] ease-out"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 bg-gradient-to-t 
                            from-black/60 via-black/20 to-transparent
                            hover:from-black/40 hover:via-black/10 
                            transition-all duration-500"
                        ></motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Navigation Arrows with Enhanced Styling */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 
                  flex justify-between px-6 z-10 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    className="p-4 rounded-full bg-black/40 backdrop-blur-md 
                      border border-white/20 hover:bg-black/60 
                      transition-all duration-300
                      hover:border-orange-500/50 group/btn
                      shadow-lg shadow-black/20"
                  >
                    <ArrowLeftIcon className="w-6 h-6 text-white 
                      group-hover/btn:text-orange-400 transition-colors" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    className="p-4 rounded-full bg-black/40 backdrop-blur-md 
                      border border-white/20 hover:bg-black/60 
                      transition-all duration-300
                      hover:border-orange-500/50 group/btn
                      shadow-lg shadow-black/20"
                  >
                    <ArrowRightIcon className="w-6 h-6 text-white 
                      group-hover/btn:text-orange-400 transition-colors" />
                  </motion.button>
                </div>

                {/* New Number Indicator */}
                <div className="absolute bottom-6 right-6 z-10">
                  <motion.div
                    initial={false}
                    animate={{ scale: [1.2, 1], opacity: [0, 1] }}
                    key={currentTestimonial}
                    className="px-6 py-3 rounded-full bg-black/60 backdrop-blur-md 
                      border border-white/20 text-white font-medium
                      flex items-center gap-2"
                  >
                    <span className="text-orange-400">
                      {(currentTestimonial + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-white/60">/</span>
                    <span className="text-white/60">
                      {testimonials.length.toString().padStart(2, '0')}
                    </span>
                  </motion.div>
                </div>

                {/* Quick Jump Navigation */}
                <div className="absolute left-6 bottom-6 z-10 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentTestimonial(0)}
                    className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-md 
                      border border-white/20 text-white/80 text-sm
                      hover:bg-black/60 hover:border-orange-500/30
                      transition-all duration-300"
                  >
                    First
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentTestimonial(testimonials.length - 1)}
                    className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-md 
                      border border-white/20 text-white/80 text-sm
                      hover:bg-black/60 hover:border-orange-500/30
                      transition-all duration-300"
                  >
                    Last
                  </motion.button>
                </div>

                {paginationControls}
              </div>
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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 
                      text-white font-medium flex items-center gap-2 
                      shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 
                      transition-shadow"
                  >
                    Learn More
                    <ArrowRightIcon className="w-5 h-5" />
                  </motion.button>
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