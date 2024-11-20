'use client';

import OrdersClient from './OrdersClient';
import AdminRoute from '@/components/admin/AdminRoute';

export default function OrdersPage() {
  return (
    <AdminRoute>
      <OrdersClient />
    </AdminRoute>
  );
}