'use client';
import { useState, useEffect } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon,
  MapPinIcon,
  ChevronDownIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const socialHoverVariants = {
  hover: {
    scale: 1.15,
    rotate: 8,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.9,
    rotate: -8
  }
};

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'contact',
      title: 'Contact Us',
      content: (
        <div className="space-y-4">
          <motion.a
            href="tel:+639605088715" 
            className="flex items-center gap-3 text-theme-slate hover:text-theme-peach transition-all duration-300 group"
            whileHover={{ x: 8 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="p-2 rounded-lg bg-theme-wine/20 group-hover:bg-theme-wine/30 transition-colors">
              <PhoneIcon className="w-5 h-5" />
            </span>
            <span className="font-medium">+63 9605088715</span>
          </motion.a>
          <motion.a
            href="tel:0468909060" 
            className="flex items-center gap-3 text-theme-slate hover:text-theme-peach transition-all duration-300 group"
            whileHover={{ x: 8 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="p-2 rounded-lg bg-theme-wine/20 group-hover:bg-theme-wine/30 transition-colors">
              <PhoneIcon className="w-5 h-5" />
            </span>
            <span className="font-medium">(046) 890-9060</span>
          </motion.a>
          <motion.a
            href="mailto:marquezjohnnathanieljade@gmail.com" 
            className="flex items-center gap-3 text-theme-slate hover:text-theme-peach transition-all duration-300 group"
            whileHover={{ x: 8 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="p-2 rounded-lg bg-theme-wine/20 group-hover:bg-theme-wine/30 transition-colors">
              <EnvelopeIcon className="w-5 h-5" />
            </span>
            <span className="text-sm font-medium break-all">marquezjohnnathanieljade@gmail.com</span>
          </motion.a>
        </div>
      )
    },
    {
      id: 'hours',
      title: 'Opening Hours',
      content: (
        <div className="space-y-3 p-4 rounded-xl bg-theme-wine/10 backdrop-blur-sm">
          <p className="text-sm text-theme-slate/80">Everyday</p>
          <p className="text-xl font-medium text-theme-peach">5:00 AM - 12:00 AM</p>
          <p className="text-sm text-theme-slate/80">Ready to serve you!</p>
        </div>
      )
    },
    {
      id: 'location',
      title: 'Location',
      content: (
        <div className="space-y-4">
          <motion.div 
            className="flex items-start gap-3 text-theme-slate group"
            whileHover={{ x: 8 }}
          >
            <span className="p-2 rounded-lg bg-theme-wine/20 group-hover:bg-theme-wine/30 transition-colors mt-1">
              <MapPinIcon className="w-5 h-5" />
            </span>
            <p className="text-sm leading-relaxed">107 i Purok 4 Dagatan, Amadeo, Cavite</p>
          </motion.div>
          <div className="flex items-center gap-4 mt-2">
            <motion.a 
              href="https://maps.app.goo.gl/nYwvNFvRrAeyDLMG7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative group">
                <Image
                  src="/images/location-qr.png"
                  alt="Google Maps QR Code"
                  width={100}
                  height={100}
                  className="rounded-xl border-2 border-theme-slate/20 group-hover:border-theme-peach/40 transition-colors"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-theme-wine/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
            <div className="flex-1">
              <Link 
                href="https://maps.app.goo.gl/nYwvNFvRrAeyDLMG7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-5 py-3 rounded-xl
                    bg-gradient-to-r from-theme-wine to-theme-red
                    hover:from-theme-red hover:to-theme-wine
                    text-white text-sm font-medium
                    transition-all duration-300
                    flex items-center justify-center gap-2
                    shadow-lg shadow-theme-wine/20
                    hover:shadow-xl hover:shadow-theme-wine/30"
                >
                  <MapPinIcon className="w-4 h-4" />
                  Open in Maps
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'social',
      title: 'Connect With Us',
      content: (
        <div className="flex flex-wrap gap-4">
          <motion.a
            href="https://facebook.com/kusinaDeAmadeo"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialHoverVariants}
            whileHover="hover"
            whileTap="tap"
            className="p-3 rounded-xl bg-gradient-to-br from-theme-wine to-theme-red
              hover:from-theme-red hover:to-theme-wine text-white
              shadow-lg shadow-theme-wine/20 hover:shadow-xl hover:shadow-theme-wine/30
              transition-all duration-300"
          >
            <FaFacebook className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialHoverVariants}
            whileHover="hover"
            whileTap="tap"
            className="p-3 rounded-xl bg-gradient-to-br from-theme-wine to-theme-red
              hover:from-theme-red hover:to-theme-wine text-white
              shadow-lg shadow-theme-wine/20 hover:shadow-xl hover:shadow-theme-wine/30
              transition-all duration-300"
          >
            <FaInstagram className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialHoverVariants}
            whileHover="hover"
            whileTap="tap"
            className="p-3 rounded-xl bg-gradient-to-br from-theme-wine to-theme-red
              hover:from-theme-red hover:to-theme-wine text-white
              shadow-lg shadow-theme-wine/20 hover:shadow-xl hover:shadow-theme-wine/30
              transition-all duration-300"
          >
            <FaTiktok className="w-6 h-6" />
          </motion.a>
        </div>
      )
    }
  ];

  return (
    <motion.footer 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-theme-dark via-theme-navy to-theme-dark
        border-t border-theme-slate/20 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-theme-wine blur-[128px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-theme-red blur-[128px] translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-4">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="backdrop-blur-md bg-theme-navy/30 rounded-xl overflow-hidden
                border border-theme-slate/10 shadow-lg"
            >
              <motion.button
                onClick={() => toggleSection(section.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg font-medium text-theme-peach">{section.title}</span>
                <motion.span
                  animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="w-5 h-5 text-theme-slate/60" />
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-5 pb-4"
                  >
                    {section.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="backdrop-blur-md bg-theme-navy/30 rounded-xl p-6
                border border-theme-slate/10 shadow-lg"
            >
              <h3 className="text-xl font-medium text-theme-peach mb-6">{section.title}</h3>
              {section.content}
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-theme-slate/10 text-center"
        >
          <p className="text-sm text-theme-slate/60">
            &copy; 2024 Kusina De Amadeo. All rights reserved.
          </p>
          <motion.div
            className="mt-2 flex items-center justify-center gap-2 text-sm text-theme-slate/60"
            whileHover={{ scale: 1.02 }}
          >
            <HeartIcon className="w-4 h-4 text-theme-red" />
            <span>Made with love in Amadeo, Cavite</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}