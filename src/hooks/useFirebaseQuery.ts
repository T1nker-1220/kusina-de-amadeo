'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  query,
  QueryConstraint,
  onSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export function useFirebaseQuery<T = DocumentData>(
  collectionName: string,
  queryConstraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching collection:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, queryConstraints]);

  return { data, loading, error };
}
