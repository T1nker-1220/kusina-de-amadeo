'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  if (items.length === 0) {
    return null;
  }

  return (
    <main className="min-h-screen pt-20 pb-10">
      <CheckoutForm />
    </main>
  );
}
