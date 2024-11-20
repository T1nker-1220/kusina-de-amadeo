import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '@/config/firebase';
import { products } from '@/data/products';
import { Product } from '@/types';

// Function to sync a single product to Firestore
export async function syncProductToFirestore(product: Product): Promise<void> {
  console.log(`Syncing product ${product.id} to Firestore...`);
  
  // Ensure user is authenticated
  const currentUser = auth.currentUser;
  if (!currentUser) {
    console.log('No authenticated user found, signing in anonymously...');
    await signInAnonymously(auth);
  }

  const productRef = doc(db, 'products', product.id);
  const productDoc = await getDoc(productRef);

  if (!productDoc.exists()) {
    console.log(`Product ${product.id} not found in Firestore, creating...`);
    // Add default inventory if product doesn't exist
    await setDoc(productRef, {
      ...product,
      inventory: 100, // Default inventory
      rating: {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      }
    });
    console.log(`Product ${product.id} created successfully`);
  } else {
    console.log(`Product ${product.id} already exists in Firestore`);
  }
}

// Function to sync all products to Firestore
export async function syncAllProductsToFirestore(): Promise<void> {
  try {
    console.log('Starting product sync...');
    
    // Ensure user is authenticated
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log('No authenticated user found, signing in anonymously...');
      await signInAnonymously(auth);
    }
    
    console.log(`Syncing ${products.length} products...`);
    await Promise.all(products.map(syncProductToFirestore));
    console.log('Successfully synced all products to Firestore');
  } catch (error) {
    console.error('Error syncing products to Firestore:', error);
    throw error;
  }
}

// Function to get a product from Firestore
export async function getProductFromFirestore(productId: string): Promise<Product | null> {
  try {
    const productRef = doc(db, 'products', productId);
    const productDoc = await getDoc(productRef);
    
    if (!productDoc.exists()) {
      return null;
    }
    
    return productDoc.data() as Product;
  } catch (error) {
    console.error('Error getting product from Firestore:', error);
    throw error;
  }
}
