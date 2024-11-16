'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import AdminLayout from '@/components/admin/AdminLayout';
import Image from 'next/image';

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  paymentDate: any;
  status: string;
  proofUrl: string;
  referenceNumber: string;
  customerName: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'payments'), orderBy('paymentDate', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const paymentsData: Payment[] = [];
      querySnapshot.forEach((doc) => {
        paymentsData.push({ id: doc.id, ...doc.data() } as Payment);
      });
      setPayments(paymentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleVerifyPayment = async (paymentId: string, verified: boolean) => {
    try {
      const paymentRef = doc(db, 'payments', paymentId);
      await updateDoc(paymentRef, {
        status: verified ? 'verified' : 'rejected',
        verifiedAt: new Date(),
      });

      // Update order payment status if needed
      const payment = payments.find(p => p.id === paymentId);
      if (payment?.orderId) {
        const orderRef = doc(db, 'orders', payment.orderId);
        await updateDoc(orderRef, {
          paymentStatus: verified ? 'paid' : 'rejected'
        });
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Payment Verification</h1>
          <div className="flex gap-2">
            <select 
              className="border rounded-md px-3 py-2 text-sm"
              onChange={(e) => console.log(e.target.value)}
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{payment.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₱{payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.referenceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.paymentDate?.seconds * 1000).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => setSelectedPayment(payment)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      View Proof
                    </button>
                    {payment.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleVerifyPayment(payment.id, true)}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          Verify
                        </button>
                        <button 
                          onClick={() => handleVerifyPayment(payment.id, false)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Proof Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Payment Proof</h3>
                  <button 
                    onClick={() => setSelectedPayment(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="aspect-w-16 aspect-h-9 relative h-96">
                  <Image
                    src={selectedPayment.proofUrl}
                    alt="Payment Proof"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Reference Number:</p>
                    <p>{selectedPayment.referenceNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Amount:</p>
                    <p>₱{selectedPayment.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Customer:</p>
                    <p>{selectedPayment.customerName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Date:</p>
                    <p>{new Date(selectedPayment.paymentDate?.seconds * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t flex justify-end gap-2">
                {selectedPayment.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleVerifyPayment(selectedPayment.id, true);
                        setSelectedPayment(null);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Verify Payment
                    </button>
                    <button
                      onClick={() => {
                        handleVerifyPayment(selectedPayment.id, false);
                        setSelectedPayment(null);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject Payment
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
