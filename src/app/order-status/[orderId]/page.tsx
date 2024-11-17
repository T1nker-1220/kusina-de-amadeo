import { Suspense } from 'react';
import { Metadata } from 'next';
import OrderStatusClient from '../../../components/OrderStatusClient';

type PageProps = {
  params: Promise<{
    orderId: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { orderId } = await params;
  
  return {
    title: `Order Status ${orderId} | Kusina De Amadeo`,
    description: `Check the status of your order ${orderId} at Kusina De Amadeo`,
  };
}

export default async function OrderStatus({ params, searchParams }: PageProps) {
  const { orderId } = await params;

  if (!orderId) {
    return <div>Invalid order ID</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }>
        <OrderStatusClient orderId={orderId} />
      </Suspense>
    </main>
  );
}