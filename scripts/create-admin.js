const admin = require('firebase-admin');
const serviceAccount = require('../service-account-key.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

// Replace these with your desired admin credentials
const ADMIN_EMAIL = 'admin@kusinade.com';

async function setupAdmin() {
  try {
    console.log('Starting admin setup for:', ADMIN_EMAIL);
    
    // Get user by email
    const userRecord = await auth.getUserByEmail(ADMIN_EMAIL);
    console.log('Found existing user:', userRecord.uid);
    
    // Set custom claims
    await auth.setCustomUserClaims(userRecord.uid, {
      admin: true
    });
    console.log('Set admin custom claim for user');

    // Create or update user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email: ADMIN_EMAIL,
      role: 'admin',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    console.log('Updated Firestore user document');

    // Verify the setup
    const updatedUser = await auth.getUser(userRecord.uid);
    console.log('Updated user claims:', updatedUser.customClaims);
    
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    console.log('Updated Firestore data:', userDoc.data());

    console.log('Admin user setup completed successfully:', userRecord.uid);
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      // Create new admin user if not found
      try {
        console.log('User not found, creating new admin user');
        const newUserRecord = await auth.createUser({
          email: ADMIN_EMAIL,
          password: 'Admin123!',
          emailVerified: true
        });
        console.log('Created new user:', newUserRecord.uid);

        await auth.setCustomUserClaims(newUserRecord.uid, {
          admin: true
        });
        console.log('Set admin custom claim for new user');

        await db.collection('users').doc(newUserRecord.uid).set({
          email: ADMIN_EMAIL,
          role: 'admin',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('Created Firestore user document');

        // Verify the setup
        const updatedUser = await auth.getUser(newUserRecord.uid);
        console.log('New user claims:', updatedUser.customClaims);
        
        const userDoc = await db.collection('users').doc(newUserRecord.uid).get();
        console.log('New user Firestore data:', userDoc.data());

        console.log('New admin user created successfully:', newUserRecord.uid);
        process.exit(0);
      } catch (createError) {
        console.error('Error creating new admin user:', createError);
        process.exit(1);
      }
    } else {
      console.error('Error setting up admin user:', error);
      process.exit(1);
    }
  }
}

setupAdmin();
