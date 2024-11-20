import { NextResponse } from 'next/server';
import { adminDb } from '@/config/firebase-admin';

export async function GET() {
  try {
    // Test Firestore connection
    const testCollection = adminDb.collection('test');
    const testDoc = testCollection.doc('test-connection');
    
    // Try to write a document
    await testDoc.set({
      timestamp: new Date().toISOString(),
      message: 'Firebase Admin SDK test successful'
    });

    // Try to read the document back
    const doc = await testDoc.get();
    const data = doc.data();

    // Clean up - delete the test document
    await testDoc.delete();

    return NextResponse.json({
      success: true,
      message: 'Firebase Admin SDK is working correctly',
      testData: data
    });
  } catch (error) {
    console.error('Firebase Admin SDK test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}
