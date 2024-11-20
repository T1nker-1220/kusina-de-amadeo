'use client';

import { useState } from 'react';
import { syncAllProductsToFirestore } from '@/services/products';
import AdminRoute from '@/components/admin/AdminRoute';

export default function SyncPage() {
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSync = async () => {
    try {
      setSyncing(true);
      setError(null);
      setSuccess(false);
      await syncAllProductsToFirestore();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync products');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <AdminRoute>
      <div className="min-h-screen bg-theme-dark text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin - Sync Products</h1>
          
          <div className="bg-theme-navy rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Sync Products to Firestore</h2>
            <p className="text-gray-300 mb-6">
              This will sync all products from the client-side data to Firestore. Each product will be
              created with a default inventory of 100 if it doesn't exist.
            </p>
            
            <button
              onClick={handleSync}
              disabled={syncing}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                syncing
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-theme-peach hover:bg-theme-peach/90'
              }`}
            >
              {syncing ? 'Syncing...' : 'Sync Products'}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300">
                Successfully synced all products to Firestore!
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}
