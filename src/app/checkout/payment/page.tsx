'use client';

import PaymentForm from '@/components/PaymentForm';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();

  const handlePaymentSubmit = async (data: {
    paymentProofUrl: string;
    referenceNumber: string;
  }) => {
    try {
      // Here you would typically:
      // 1. Save the payment details to your database
      // 2. Update the order status
      // 3. Send confirmation to admin
      console.log('Payment submitted:', data);
      
      // Navigate to confirmation page
      router.push('/checkout/confirmation');
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <PaymentForm
        orderId="ORD123" // Replace with actual order ID
        totalAmount={1000} // Replace with actual amount
        onSubmit={handlePaymentSubmit}
      />
    </div>
  );
}
