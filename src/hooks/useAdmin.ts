'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';
import { logger } from '@/utils/logger';

interface AdminState {
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

export function useAdmin() {
  const { user, loading: authLoading } = useAuth();
  const [adminState, setAdminState] = useState<AdminState>({
    isAdmin: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const checkAdminStatus = async () => {
      if (!user) {
        logger.info('No user found');
        if (mounted) {
          setAdminState({
            isAdmin: false,
            loading: false,
            error: null,
          });
        }
        return;
      }

      try {
        logger.info('Checking admin status for user:', user.email);
        
        // First check custom claims
        const token = await user.getIdTokenResult(true);
        logger.info('Token claims:', token.claims);
        
        // Check either custom claims or Firestore role
        if (token.claims.admin === true) {
          logger.info('User is admin via claims');
          if (mounted) {
            setAdminState({
              isAdmin: true,
              loading: false,
              error: null,
            });
          }
          return;
        }

        // Fallback to Firestore check
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        logger.info('Firestore user data:', userData);
        
        if (mounted) {
          const isAdminRole = userData?.role === 'admin';
          logger.info('User role from Firestore:', userData?.role, 'Is admin?', isAdminRole);
          
          setAdminState({
            isAdmin: isAdminRole,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        logger.error('Error checking admin status:', error);
        if (mounted) {
          setAdminState({
            isAdmin: false,
            loading: false,
            error: 'Failed to verify admin status',
          });
        }
      }
    };

    if (!authLoading) {
      checkAdminStatus();
    }

    return () => {
      mounted = false;
    };
  }, [user, authLoading]);

  return adminState;
}
