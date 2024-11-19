'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { logger } from '@/utils/logger';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          setAuthState({
            user,
            loading: false,
            error: null,
          });
        },
        (error) => {
          logger.error('Auth state change error:', error);
          setAuthState({
            user: null,
            loading: false,
            error: error.message,
          });
        }
      );

      return () => unsubscribe();
    } catch (error) {
      logger.error('Auth initialization error:', error);
      setAuthState({
        user: null,
        loading: false,
        error: 'Failed to initialize authentication',
      });
    }
  }, []);

  return authState;
}