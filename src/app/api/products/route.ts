import { NextResponse } from 'next/server';
import { adminDb } from '@/config/firebase-admin';

export async function GET() {
  try {
    console.log('Fetching products from Firestore...');
    
    // Get all products from Firestore
    const productsSnapshot = await adminDb.collection('products').get();
    
    // Convert the snapshot to an array of products
    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`Successfully fetched ${products.length} products`);
    
    return NextResponse.json({
      success: true,
      products,
      count: products.length
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}
