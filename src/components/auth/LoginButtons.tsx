'use client';

import { useAuth } from '@/context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface LoginButtonsProps {
  callbackUrl?: string;
}

export default function LoginButtons({ callbackUrl = '/' }: LoginButtonsProps) {
  const { signInWithGoogle, signInWithFacebook, loading, error } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push(callbackUrl);
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
      router.push(callbackUrl);
    } catch (error) {
      console.error('Facebook sign in error:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <motion.button
        onClick={handleGoogleSignIn}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-3 w-full px-6 py-3
          bg-white/10 hover:bg-white/20 backdrop-blur-xl
          border border-white/10 hover:border-white/20
          rounded-xl text-white font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200"
      >
        <FcGoogle className="w-5 h-5" />
        <span>Continue with Google</span>
      </motion.button>

      <motion.button
        onClick={handleFacebookSignIn}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-3 w-full px-6 py-3
          bg-[#1877F2]/20 hover:bg-[#1877F2]/30 backdrop-blur-xl
          border border-[#1877F2]/20 hover:border-[#1877F2]/30
          rounded-xl text-white font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200"
      >
        <FaFacebook className="w-5 h-5 text-[#1877F2]" />
        <span>Continue with Facebook</span>
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 text-sm text-red-400 bg-red-500/10 backdrop-blur-xl
            border border-red-500/20 rounded-xl text-center"
        >
          {error.message}
        </motion.div>
      )}

      {loading && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white/80
            rounded-full animate-spin"
          />
        </div>
      )}
    </div>
  );
}
