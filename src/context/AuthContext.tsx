'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { AuthContextType, AuthProviderProps, AuthState, UserProfile } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Update user's last login
        try {
          await setDoc(
            doc(db, 'users', user.uid),
            {
              lastLoginAt: serverTimestamp(),
            },
            { merge: true }
          );
        } catch (error) {
          console.error('Error updating user last login:', error);
        }
      }
      setState((prev) => ({ ...prev, user, loading: false }));
    });

    return () => unsubscribe();
  }, []);

  const createUserProfile = async (user: UserProfile) => {
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          ...user,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userProfile: UserProfile = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        phoneNumber: result.user.phoneNumber,
        providerId: result.providerId || 'google.com',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        role: 'user',
      };
      await createUserProfile(userProfile);
      setState((prev) => ({ ...prev, error: null }));
    } catch (error) {
      console.error('Google sign in error:', error);
      setState((prev) => ({ ...prev, error: error as Error }));
    }
  };

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userProfile: UserProfile = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        phoneNumber: result.user.phoneNumber,
        providerId: result.providerId || 'facebook.com',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        role: 'user',
      };
      await createUserProfile(userProfile);
      setState((prev) => ({ ...prev, error: null }));
    } catch (error) {
      console.error('Facebook sign in error:', error);
      setState((prev) => ({ ...prev, error: error as Error }));
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setState((prev) => ({ ...prev, user: null, error: null }));
    } catch (error) {
      console.error('Sign out error:', error);
      setState((prev) => ({ ...prev, error: error as Error }));
    }
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const value = {
    ...state,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
