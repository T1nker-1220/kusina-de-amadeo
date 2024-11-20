import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { logger } from '@/utils/logger';

export async function setUserAsAdmin(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { role: 'admin' }, { merge: true });
  } catch (error) {
    logger.error('Error setting user as admin:', error);
    throw new Error('Failed to set user as admin');
  }
}

export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role === 'admin';
    }
    
    return false;
  } catch (error) {
    logger.error('Error checking admin status:', error);
    return false;
  }
}

export async function removeUserAdmin(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { role: 'user' }, { merge: true });
  } catch (error) {
    logger.error('Error removing admin role:', error);
    throw new Error('Failed to remove admin role');
  }
}
