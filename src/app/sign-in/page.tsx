'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Successfully signed in:', userCredential.user.email);
      
      // Redirect to the specified page or home
      router.push(redirect);
    } catch (err: any) {
      console.error('Sign in error:', err);
      // Provide more specific error messages
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Please check your email or sign up.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address. Please enter a valid email.');
      } else {
        setError('Failed to sign in. Please check your credentials and try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-theme-navy/30 backdrop-blur-lg 
          p-8 rounded-2xl border border-theme-slate/20 shadow-xl"
      >
        <div>
          <h2 className="text-center text-3xl font-bold text-white/90">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-white/70">
            Please sign in to continue with your order
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 
                  bg-theme-navy/30 backdrop-blur-sm border border-theme-slate/20 
                  placeholder-white/50 text-white rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-theme-peach/50 
                  focus:border-theme-peach/50"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 
                  bg-theme-navy/30 backdrop-blur-sm border border-theme-slate/20 
                  placeholder-white/50 text-white rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-theme-peach/50 
                  focus:border-theme-peach/50"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl 
              bg-gradient-to-r from-theme-wine via-theme-red to-theme-wine
              hover:from-theme-red hover:via-theme-wine hover:to-theme-red
              text-white font-semibold text-lg
              shadow-lg shadow-theme-wine/30
              border border-white/10
              transition-all duration-300
              flex items-center justify-center gap-3
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign in'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
