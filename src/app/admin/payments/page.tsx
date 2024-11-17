import { Metadata } from 'next';
import PaymentsClient from './PaymentsClient';

export const metadata: Metadata = {
  title: 'Payments Management | Kusina De Amadeo',
  description: 'Manage payments for Kusina De Amadeo',
};

export default function PaymentsPage() {
  return <PaymentsClient />;
}