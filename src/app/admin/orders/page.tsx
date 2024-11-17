import { Metadata } from 'next';
import OrdersClient from './OrdersClient';

export const metadata: Metadata = {
  title: 'Orders Management | Kusina De Amadeo',
  description: 'Manage orders for Kusina De Amadeo',
};

export default function OrdersPage() {
  return <OrdersClient />;
}