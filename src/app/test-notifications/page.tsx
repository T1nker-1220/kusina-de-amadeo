'use client';

import { useState } from 'react';
import { 
  sendOrderConfirmation, 
  sendOrderStatusUpdate, 
  sendDeliveryUpdate 
} from '@/services/notifications';

export default function TestNotifications() {
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('TEST' + Math.floor(Math.random() * 1000));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleTest = async (type: string) => {
    try {
      setLoading(true);
      setResult('');

      switch (type) {
        case 'confirmation':
          await sendOrderConfirmation(email, orderId);
          setResult('Order confirmation sent!');
          break;
        case 'preparing':
          await sendOrderStatusUpdate(email, orderId, 'preparing');
          setResult('Preparing status update sent!');
          break;
        case 'ready':
          await sendOrderStatusUpdate(email, orderId, 'ready');
          setResult('Ready status update sent!');
          break;
        case 'delivery':
          await sendDeliveryUpdate(email, orderId, 'out_for_delivery');
          setResult('Delivery update sent!');
          break;
      }
    } catch (error) {
      setResult('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Test Notifications</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter test email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Order ID
          </label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter order ID"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleTest('confirmation')}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Test Confirmation
          </button>
          <button
            onClick={() => handleTest('preparing')}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Test Preparing
          </button>
          <button
            onClick={() => handleTest('ready')}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            Test Ready
          </button>
          <button
            onClick={() => handleTest('delivery')}
            disabled={loading}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            Test Delivery
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-600">
          Sending notification...
        </div>
      )}

      {result && (
        <div className={`text-center p-4 rounded-lg ${
          result.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {result}
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Note: You should see notifications in both:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Your email inbox</li>
          <li>The notification bell in the top navigation</li>
        </ul>
      </div>
    </div>
  );
}
