'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/config/firebase';
import { logger } from '@/utils/logger';
import Toast from './ui/Toast';

interface GCashPaymentProps {
  orderId: string;
  amount: number;
}

export default function GCashPayment({ orderId, amount }: GCashPaymentProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a payment screenshot');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Upload payment proof to storage
      const storageRef = ref(storage, `payment-proofs/${orderId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Update order with payment proof
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        paymentStatus: 'proof_submitted',
        paymentProof: {
          url: downloadURL,
          uploadedAt: new Date().toISOString(),
          fileName: file.name
        }
      });

      setSuccess(true);
      setTimeout(() => {
        router.push(`/order-status/${orderId}`);
      }, 2000);
    } catch (error) {
      logger.error('Payment proof upload error:', error);
      setError('Failed to upload payment proof. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">GCash Payment</h2>
        <p className="text-gray-600 mb-4">Order ID: {orderId}</p>
        <p className="text-2xl font-bold text-yellow-500">₱{amount.toFixed(2)}</p>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 space-y-4">
        <div className="text-center">
          <Image
            src="/images/gcash-qr.png"
            alt="GCash QR Code"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm text-gray-600">Scan QR code to pay</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Or send payment to:</p>
          <div className="bg-gray-50 p-3 rounded">
            <p className="font-medium">GCash Number: 09123456789</p>
            <p className="text-sm text-gray-600">Account Name: Kusina De Amadeo</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Payment Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-200 rounded-lg"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {file.name}
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white
            ${uploading || !file
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600'
            }
          `}
        >
          {uploading ? 'Uploading...' : 'Submit Payment Proof'}
        </button>
      </div>

      {error && (
        <Toast
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {success && (
        <Toast
          type="success"
          message="Payment proof submitted successfully! Redirecting..."
          onClose={() => setSuccess(false)}
        />
      )}
    </div>
  );
}
