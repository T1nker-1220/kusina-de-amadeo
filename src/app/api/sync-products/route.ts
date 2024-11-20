import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { adminDb } from '@/config/firebase-admin';

async function syncProductToFirestore(product: any) {
  try {
    console.log(`Syncing product ${product.id} to Firestore...`);
    const productRef = adminDb.collection('products').doc(product.id);
    
    // Create the product document
    await productRef.set({
      ...product,
      inventory: 100,
      rating: {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      },
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    console.log(`Product ${product.id} synced successfully`);
  } catch (error) {
    console.error(`Error syncing product ${product.id}:`, error);
    throw error;
  }
}

async function syncAllProducts() {
  console.log('Starting product sync...');
  console.log(`Syncing ${products.length} products...`);
  
  try {
    // Sync products sequentially to avoid overwhelming Firestore
    for (const product of products) {
      await syncProductToFirestore(product);
    }
    console.log('Successfully synced all products to Firestore');
  } catch (error) {
    console.error('Error syncing products:', error);
    throw error;
  }
}

export async function GET() {
  try {
    await syncAllProducts();
    return NextResponse.json(
      { message: 'Products synced successfully' },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error) {
    console.error('Error in sync handler:', error);
    return NextResponse.json(
      { 
        error: 'Failed to sync products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

export async function POST() {
  return GET();
}

export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
