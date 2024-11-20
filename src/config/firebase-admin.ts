import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';
import * as path from 'path';

// Initialize Firebase Admin
function initializeFirebaseAdmin() {
  try {
    console.log('Initializing Firebase Admin...');
    
    if (getApps().length > 0) {
      console.log('Firebase Admin already initialized');
      return getApps()[0];
    }

    // Get the service account path
    const serviceAccountPath = path.join(process.cwd(), 'src', 'config', 'service-account.json');
    console.log('Loading service account from:', serviceAccountPath);

    try {
      // Initialize the app with the service account
      const app = initializeApp({
        credential: cert(serviceAccountPath),
      });
      
      console.log('Firebase Admin initialized successfully');
      return app;
    } catch (error) {
      console.error('Error initializing Firebase Admin:', error);
      throw new Error(`Failed to initialize Firebase Admin: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error in initializeFirebaseAdmin:', error);
    throw error;
  }
}

// Initialize Firebase Admin
let app;
try {
  app = initializeFirebaseAdmin();
} catch (error) {
  console.error('Failed to initialize Firebase Admin:', error);
}

// Export Firestore instance
export const adminDb = getFirestore();
export const adminAuth = getAuth();
export const adminMessaging = getMessaging();

// Helper function to send notifications
export async function sendNotification(
  token: string,
  title: string,
  body: string,
  data?: Record<string, string>
) {
  try {
    const message = {
      token,
      notification: {
        title,
        body,
      },
      data,
    };

    const response = await adminMessaging.send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export { initializeFirebaseAdmin };
