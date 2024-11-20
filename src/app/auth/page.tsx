'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUserCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

type AuthMode = 'user' | 'admin';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>('user');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading('Signing in...');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (mode === 'admin') {
        // Check admin status
        const token = await userCredential.user.getIdTokenResult();
        const isAdmin = token.claims.admin === true;
        
        if (isAdmin) {
          toast.success('Welcome back, Admin!', { id: loadingToast });
          router.push('/admin/dashboard');
        } else {
          toast.error('Access denied. Admin privileges required.', { id: loadingToast });
          await auth.signOut();
        }
      } else {
        toast.success('Welcome back!', { id: loadingToast });
        router.push(callbackUrl);
      }
    } catch (error: any) {
      toast.error(error.message || 'Sign in failed', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (mode === 'admin') {
      toast.error('Admin accounts cannot use Google Sign In');
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Welcome back!');
      router.push(callbackUrl);
    } catch (error: any) {
      toast.error(error.message || 'Google sign in failed');
    }
  };

  const handleFacebookSignIn = async () => {
    if (mode === 'admin') {
      toast.error('Admin accounts cannot use Facebook Sign In');
      return;
    }

    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Welcome back!');
      router.push(callbackUrl);
    } catch (error: any) {
      toast.error(error.message || 'Facebook sign in failed');
    }
  };

  return (
    <div className="min-h-screen bg-theme-dark flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-theme-navy p-8 rounded-2xl shadow-xl"
      >
        {/* Logo and Header */}
        <div className="text-center">
          <Image
            src="/images/logo.png"
            alt="Kusina De Amadeo Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-orange-500">
            {mode === 'admin' ? 'Admin Sign In' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {mode === 'admin' 
              ? 'Sign in to access the admin dashboard'
              : 'Sign in to your account to continue'
            }
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setMode('user')}
            className={`px-4 py-2 rounded-lg transition-all ${
              mode === 'user'
                ? 'bg-orange-500 text-white'
                : 'bg-theme-dark text-gray-400 hover:bg-gray-800'
            }`}
          >
            <HiOutlineUserCircle className="inline-block mr-2 w-5 h-5" />
            Customer
          </button>
          <button
            onClick={() => setMode('admin')}
            className={`px-4 py-2 rounded-lg transition-all ${
              mode === 'admin'
                ? 'bg-orange-500 text-white'
                : 'bg-theme-dark text-gray-400 hover:bg-gray-800'
            }`}
          >
            <HiOutlineLockClosed className="inline-block mr-2 w-5 h-5" />
            Admin
          </button>
        </div>

        {/* Social Sign In Buttons (Only for users) */}
        {mode === 'user' && (
          <>
            <div className="space-y-3">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-200 bg-theme-dark hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
              >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </button>

              <button
                onClick={handleFacebookSignIn}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-200 bg-[#1877F2] hover:bg-[#1865CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2] transition-all"
              >
                <FaFacebook className="w-5 h-5" />
                Continue with Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-theme-navy text-gray-400">Or continue with email</span>
              </div>
            </div>
          </>
        )}

        {/* Email Sign In Form */}
        <form onSubmit={handleEmailSignIn} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="mt-1 relative">
                <HiOutlineMail className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-theme-dark text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <HiOutlineLockClosed className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-theme-dark text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {mode === 'user' && (
            <div className="text-sm text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <a href="/signup" className="text-orange-500 hover:text-orange-400">
                  Sign up
                </a>
              </p>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
