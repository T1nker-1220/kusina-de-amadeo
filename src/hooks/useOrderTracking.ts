'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface OrderStatus {
  id: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  currentLocation?: {
    lat: number;
    lng: number;
  };
  estimatedDeliveryTime?: string;
  lastUpdated: string;
  statusHistory: {
    status: string;
    timestamp: string;
    note?: string;
  }[];
}

export function useOrderTracking(orderId: string) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'orders', orderId),
      (doc) => {
        if (doc.exists()) {
          setOrderStatus({
            id: doc.id,
            ...doc.data(),
          } as OrderStatus);
        } else {
          setError(new Error('Order not found'));
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error tracking order:', error);
        setError(error as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [orderId]);

  return { orderStatus, loading, error };
}
