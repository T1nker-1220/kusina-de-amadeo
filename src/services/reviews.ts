import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  increment,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface Review {
  id: string;
  userId: string;
  productId: string;
  orderId: string;
  rating: number;
  comment: string;
  images?: string[];
  likes: number;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
}

export interface ProductRating {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export async function submitReview(reviewData: Omit<Review, 'id' | 'likes' | 'verified'>): Promise<string> {
  const review = {
    ...reviewData,
    likes: 0,
    verified: true, // Verified if submitted with a valid order
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, 'reviews'), review);

  // Update product rating statistics
  const productRef = doc(db, 'products', reviewData.productId);
  const productDoc = await getDoc(productRef);

  if (productDoc.exists()) {
    const rating = productDoc.data().rating || { averageRating: 0, totalReviews: 0, ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
    const newTotal = rating.totalReviews + 1;
    const newAverage = ((rating.averageRating * rating.totalReviews) + reviewData.rating) / newTotal;

    await updateDoc(productRef, {
      'rating.averageRating': newAverage,
      'rating.totalReviews': increment(1),
      [`rating.ratingDistribution.${reviewData.rating}`]: increment(1),
    });
  }

  return docRef.id;
}

export async function getProductReviews(
  productId: string,
  page: number = 1,
  pageSize: number = 10,
  sortBy: 'recent' | 'helpful' = 'recent'
): Promise<{ reviews: Review[]; hasMore: boolean }> {
  const reviewsRef = collection(db, 'reviews');
  const q = query(
    reviewsRef,
    where('productId', '==', productId),
    orderBy(sortBy === 'recent' ? 'createdAt' : 'likes', 'desc'),
    limit(pageSize + 1)
  );

  const snapshot = await getDocs(q);
  const reviews = snapshot.docs.slice(0, pageSize).map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Review[];

  return {
    reviews,
    hasMore: snapshot.docs.length > pageSize
  };
}

export async function likeReview(reviewId: string, userId: string): Promise<void> {
  const reviewRef = doc(db, 'reviews', reviewId);
  const likeRef = doc(db, `reviews/${reviewId}/likes`, userId);

  const likeDoc = await getDoc(likeRef);

  if (likeDoc.exists()) {
    throw new Error('User has already liked this review');
  }

  await updateDoc(reviewRef, {
    likes: increment(1)
  });
}
