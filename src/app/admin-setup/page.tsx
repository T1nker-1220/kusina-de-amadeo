'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { setUserAsAdmin } from '@/services/admin';

export default function AdminSetupPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSetupAdmin = async () => {
    if (!user) {
      setError('Please sign in first');
      return;
    }

    try {
      await setUserAsAdmin(user.uid);
      setMessage('Successfully set up as admin!');
      setError('');
    } catch (err) {
      setError('Failed to set up admin. Please try again.');
      setMessage('');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-theme-dark text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Setup</h1>
          <p className="text-red-400">Please sign in first to set up admin access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Setup</h1>
        
        <div className="bg-theme-navy rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Set Up Admin Access</h2>
          <p className="text-gray-300 mb-6">
            Current User: {user.email}
          </p>
          
          <button
            onClick={handleSetupAdmin}
            className="px-6 py-2 rounded-lg font-semibold transition-colors bg-theme-peach hover:bg-theme-peach/90"
          >
            Set Up as Admin
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
