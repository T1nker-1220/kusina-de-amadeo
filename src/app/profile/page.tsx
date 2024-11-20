'use client';

import { useState } from 'react';
import { withAuth } from '@/components/auth/withAuth';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ClockIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  MapPinIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

function ProfilePage() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'addresses'>('orders');

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-theme-dark">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row items-center md:space-x-6">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "Profile"}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-orange-500/20"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-500">
                    {user.displayName?.[0] || user.email?.[0] || '?'}
                  </span>
                </div>
              )}
              
              <div className="mt-4 md:mt-0 text-center md:text-left">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white">
                    {user.displayName || 'Welcome!'}
                  </h1>
                  <button className="text-orange-400 hover:text-orange-500 transition-colors">
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-400 mt-1">
                  {user.email}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut()}
              className="mt-6 md:mt-0 px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600
                text-white font-medium shadow-lg shadow-orange-500/30
                hover:shadow-orange-500/40 transition-all duration-300"
            >
              Sign Out
            </motion.button>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 mb-8">
          <div className="flex flex-col sm:flex-row">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'orders'
                  ? 'bg-orange-500/10 text-orange-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ClockIcon className="w-5 h-5" />
              Order History
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'favorites'
                  ? 'bg-orange-500/10 text-orange-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <HeartIcon className="w-5 h-5" />
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-orange-500/10 text-orange-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MapPinIcon className="w-5 h-5" />
              Addresses
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-semibold text-white">Order #12345</h3>
                  <p className="text-sm text-gray-400">Placed on March 15, 2024</p>
                </div>
                <Link 
                  href="/orders/12345"
                  className="px-4 py-2 rounded-lg text-sm bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-colors"
                >
                  View Details
                </Link>
              </div>
              {/* Add more orders here */}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add favorite items here */}
              <div className="text-gray-400">No favorite items yet.</div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-start justify-between p-4 border border-white/10 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Home</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    123 Main Street, Apt 4B<br />
                    New York, NY 10001
                  </p>
                </div>
                <button className="text-orange-400 hover:text-orange-500 transition-colors">
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
              </div>
              <button className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors">
                + Add New Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);
