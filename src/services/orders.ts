import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { sendOrderUpdateNotification } from './notifications';
import { addPointsFromPurchase } from './loyalty';
import { CartItem } from '@/types/cart';

export interface OrderDetails {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  contactInfo: {
    email: string;
    phone: string;
  };
  specialInstructions?: string;
}

export async function createOrder(orderDetails: OrderDetails): Promise<string> {
  try {
    // Start a transaction to ensure all operations are atomic
    return await runTransaction(db, async (transaction) => {
      // 1. Create the order document
      const orderRef = doc(collection(db, 'orders'));
      const order = {
        ...orderDetails,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        orderNumber: generateOrderNumber(),
      };

      transaction.set(orderRef, order);

      // 2. Update product inventory
      for (const item of orderDetails.items) {
        const productRef = doc(db, 'products', item.id);
        transaction.update(productRef, {
          inventory: item.quantity,
        });
      }

      // 3. Clear user's cart
      const cartRef = doc(db, 'carts', orderDetails.userId);
      transaction.update(cartRef, {
        items: [],
        updatedAt: serverTimestamp(),
      });

      // 4. Add loyalty points
      await addPointsFromPurchase(orderDetails.userId, orderDetails.totalAmount);

      // 5. Send order confirmation email
      await sendOrderUpdateNotification(
        orderDetails.contactInfo.email,
        orderRef.id,
        'pending',
        calculateEstimatedDeliveryTime()
      );

      return orderRef.id;
    });
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderDetails['orderStatus'],
  userId: string
): Promise<void> {
  const orderRef = doc(db, 'orders', orderId);

  try {
    await updateDoc(orderRef, {
      orderStatus: status,
      updatedAt: serverTimestamp(),
    });

    // Send notification about status update
    const order = await getOrderById(orderId);
    if (order) {
      await sendOrderUpdateNotification(
        order.contactInfo.email,
        orderId,
        status,
        calculateEstimatedDeliveryTime()
      );
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

export async function getOrderById(orderId: string): Promise<OrderDetails | null> {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await orderRef.get();

    if (orderDoc.exists()) {
      return orderDoc.data() as OrderDetails;
    }
    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
}

function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `KDA-${timestamp}-${random}`;
}

function calculateEstimatedDeliveryTime(): string {
  const now = new Date();
  // Add 45 minutes for preparation and delivery
  const estimatedTime = new Date(now.getTime() + 45 * 60000);
  return estimatedTime.toISOString();
}
