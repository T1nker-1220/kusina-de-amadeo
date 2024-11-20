'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading, error } = useAdmin();
  
  useEffect(() => {
    // Only redirect if we're done loading and the user is not admin
    if (!authLoading && !adminLoading) {
      if (!user) {
        router.push('/admin/signin');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, isAdmin, authLoading, adminLoading, router]);

  // Show loading state while checking authentication and admin status
  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Show error state if there was a problem checking admin status
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-dark text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Only render children if user is authenticated and is an admin
  if (user && isAdmin) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
}
