'use client';

import { withAuth } from '@/components/auth/withAuth';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { motion } from 'framer-motion';

function ProfilePage() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10">
          <div className="flex flex-col items-center space-y-4">
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
            
            <h1 className="text-2xl font-bold text-white">
              {user.displayName || 'Welcome!'}
            </h1>
            
            <p className="text-gray-400">
              {user.email}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut()}
              className="mt-8 px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600
                text-white font-medium shadow-lg shadow-orange-500/30
                hover:shadow-orange-500/40 transition-all duration-300"
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);
