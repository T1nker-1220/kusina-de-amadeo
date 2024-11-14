'use client';
import { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { FaFacebook } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer className="bg-theme-dark border-t border-theme-slate/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-theme-peach">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:+639605088715" 
                className="flex items-center gap-2 text-theme-slate hover:text-theme-peach transition-colors">
                <PhoneIcon className="w-5 h-5" />
                +63 9605088715
              </a>
              <a href="tel:0468909060" 
                className="flex items-center gap-2 text-theme-slate hover:text-theme-peach transition-colors">
                <PhoneIcon className="w-5 h-5" />
                (046) 890-9060
              </a>
              <a href="mailto:marquezjohnnathanieljade@gmail.com" 
                className="flex items-center gap-2 text-theme-slate hover:text-theme-peach transition-colors">
                <EnvelopeIcon className="w-5 h-5" />
                marquezjohnnathanieljade@gmail.com
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-theme-peach">Opening Hours</h3>
            <div className="space-y-2 text-theme-slate">
              <p>Everyday</p>
              <p className="font-medium">5:00 AM - 12:00 AM</p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-theme-peach">Location</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-theme-slate">
                <MapPinIcon className="w-5 h-5 mt-1 flex-shrink-0" />
                <p>107 i Purok 4 Dagatan, Amadeo, Cavite</p>
              </div>
              <a 
                href="https://maps.app.goo.gl/nYwvNFvRrAeyDLMG7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mt-4 hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/images/location-qr.png"
                  alt="Google Maps QR Code"
                  width={120}
                  height={120}
                  className="rounded-lg border-2 border-theme-slate/20"
                />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-theme-peach">Newsletter</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg
                  bg-theme-navy border border-theme-slate/30
                  text-theme-peach placeholder-theme-slate/50
                  focus:outline-none focus:border-theme-peach/50
                  transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg
                  bg-theme-wine hover:bg-theme-red
                  text-white font-medium
                  transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-theme-slate/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/kusinaDeAmadeo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full
                  bg-theme-wine hover:bg-theme-red
                  text-white transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
            <p className="text-theme-slate text-sm text-center md:text-right">
              © 2024 Kusina De Amadeo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}