'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginButtons from '@/components/auth/LoginButtons';
import Image from 'next/image';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';

  useEffect(() => {
    // Only redirect if user is already logged in when arriving at login page
    if (user && !loading && document.referrer !== window.location.href) {
      router.push(callbackUrl);
    }
  }, [user, loading, router, callbackUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10">
          <div className="flex flex-col items-center space-y-6">
            <Image
              src="/images/logo.png"
              alt="Kusina De Amadeo Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
            <p className="text-gray-400 text-center">
              Sign in to order your favorite Filipino dishes and access your account
            </p>

            <LoginButtons callbackUrl={callbackUrl} />

            <p className="text-sm text-gray-500 text-center">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-orange-500 hover:text-orange-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-orange-500 hover:text-orange-400">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
