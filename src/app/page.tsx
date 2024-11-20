'use client';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  StarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { categories } from '@/data/categories';
import { testimonials } from '@/data/testimonials';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.2,
    rotateY: direction > 0 ? 30 : -30,
    filter: 'blur(10px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
      scale: { duration: 0.8, ease: "easeOut" },
      rotateY: { duration: 0.8, ease: "easeOut" },
      filter: { duration: 0.5 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 30 : -30,
    filter: 'blur(10px)',
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  })
};

const features = [
  {
    name: 'Quick Delivery',
    description: 'Fast and reliable delivery within Amadeo',
    icon: ClockIcon,
  },
  {
    name: 'Easy Ordering',
    description: 'Simple online ordering process',
    icon: PhoneIcon,
  },
  {
    name: 'Local Favorite',
    description: 'Loved by the community',
    icon: StarIcon,
  },
  {
    name: 'Fresh Ingredients',
    description: 'Quality local ingredients',
    icon: SparklesIcon,
  },
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);

  // Refs for scroll animations
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transformations
  const heroY = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  // InView states for sections
  const isHeroInView = useInView(heroRef, { once: false, margin: "-100px" });
  const isFeaturesInView = useInView(featuresRef, { once: false, margin: "-100px" });
  const isMenuInView = useInView(menuRef, { once: false, margin: "-100px" });
  const isGalleryInView = useInView(galleryRef, { once: false, margin: "-100px" });
  const isCtaInView = useInView(ctaRef, { once: false, margin: "-100px" });

  // Navigation functions
  const handleNext = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <main className="min-h-screen bg-theme-dark">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        >
          <Image
            src="/images/restaurant.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-theme-navy/80 via-theme-dark to-theme-dark" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <motion.div
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-2xl lg:max-w-3xl"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Taste the{' '}
              <span className="text-theme-peach">
                Authentic Filipino
              </span>{' '}
              Experience
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg leading-8 text-theme-slate max-w-xl"
            >
              Discover the rich flavors and warm hospitality of Filipino cuisine, 
              crafted with love and served with pride since 2021.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="mt-10 flex items-center gap-x-6"
            >
              <Link href="/menu">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-theme-peach px-6 py-3.5 text-sm font-semibold text-white 
                    shadow-sm hover:bg-theme-red focus-visible:outline focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-theme-peach transition-all duration-300"
                >
                  View Our Menu
                </motion.a>
              </Link>
              <Link href="/about">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-semibold leading-6 text-white group"
                >
                  Learn More{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </motion.a>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ height: ["20%", "80%", "20%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 bg-theme-peach rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className="relative py-24 sm:py-32">
        <motion.div
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mx-auto max-w-7xl px-6 lg:px-8"
        >
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                variants={fadeInUp}
                custom={index}
                className="flex flex-col items-start"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="rounded-lg bg-theme-peach/10 p-3 ring-1 ring-theme-peach/20"
                >
                  <feature.icon className="h-6 w-6 text-theme-peach" aria-hidden="true" />
                </motion.div>
                <h3 className="mt-4 font-semibold text-white">{feature.name}</h3>
                <p className="mt-2 text-sm leading-6 text-theme-slate">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Menu Categories */}
      <section ref={menuRef} className="relative py-24 sm:py-32 overflow-hidden">
        <motion.div
          initial="hidden"
          animate={isMenuInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mx-auto max-w-7xl px-6 lg:px-8"
        >
          <motion.div 
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Menu Categories</h2>
            <p className="mt-4 text-lg leading-8 text-theme-slate">
              Explore our carefully curated selection of Filipino favorites
            </p>
          </motion.div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -10 }}
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-theme-navy/30 px-8 pb-8 pt-40 sm:pt-24 lg:pt-40"
              >
                <div className="absolute inset-0 -z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="h-full w-full"
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-dark via-theme-dark/50" />
                </div>
                <div className="relative">
                  <h3 className="text-lg font-semibold leading-6 text-white">
                    <Link href={`/menu?category=${category.id}`}>
                      <span className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-theme-slate">{category.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative isolate overflow-hidden">
        <motion.div
          initial="hidden"
          animate={isCtaInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
        >
          <motion.div
            variants={fadeInUp}
            className="relative isolate overflow-hidden bg-theme-navy/30 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Experience the Taste of Home
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-theme-slate"
            >
              Join us for an authentic Filipino dining experience. Order now and savor the flavors of our carefully crafted dishes.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link href="/menu">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-theme-peach px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-theme-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-peach transition-all duration-300"
                >
                  Order Now
                </motion.a>
              </Link>
              <Link href="/contact">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Contact Us <span aria-hidden="true">→</span>
                </motion.a>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}