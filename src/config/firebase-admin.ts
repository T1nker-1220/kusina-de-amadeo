import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';

// Initialize Firebase Admin
function initializeFirebaseAdmin() {
  try {
    console.log('Initializing Firebase Admin...');
    
    if (getApps().length > 0) {
      console.log('Firebase Admin already initialized');
      return getApps()[0];
    }

    // Initialize with environment variables
    const app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        privateKeyId: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: `firebase-adminsdk-gjssy@${process.env.FIREBASE_ADMIN_PROJECT_ID}.iam.gserviceaccount.com`,
      }),
    });

    console.log('Firebase Admin initialized successfully');
    return app;
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
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
