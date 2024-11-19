import { collection, query, QueryConstraint, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, CacheItem<any>>();

export async function getCachedCollection<T = DocumentData>(
  collectionName: string,
  queryConstraints: QueryConstraint[] = [],
  cacheKey?: string
) {
  const key = cacheKey || `${collectionName}-${queryConstraints.map(c => c.toString()).join('-')}`;
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data as T[];
  }

  const q = query(collection(db, collectionName), ...queryConstraints);
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];

  cache.set(key, { data, timestamp: now });
  return data;
}

export function clearCache(key?: string) {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

export function invalidateCache() {
  const now = Date.now();
  Array.from(cache.entries()).forEach(([key, value]) => {
    if (now - value.timestamp >= CACHE_DURATION) {
      cache.delete(key);
    }
  });
}
