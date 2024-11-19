import type { Metadata } from 'next';
import { Suspense } from 'react';
import OrderClient from './OrderClient';

type Props = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `Order ${params.orderId} - Kusina De Amadeo`,
    description: 'View your order details',
  };
}

export default async function OrderPage(props: Props) {
  const params = await props.params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderClient orderId={params.orderId} />
    </Suspense>
  );
}