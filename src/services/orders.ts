import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  runTransaction,
  getDoc,
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
  orderType: 'now' | 'preorder';
  deliveryDate?: string;
  deliveryTime?: string;
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
        {
          orderId: orderRef.id,
          status: 'pending',
          customerName: orderDetails.contactInfo.email,
          estimatedDeliveryTime: calculateEstimatedDeliveryTime(),
          items: orderDetails.items.map(item => ({
            name: item.name,
            quantity: item.quantity
          })),
          total: orderDetails.totalAmount
        }
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
        {
          orderId,
          status,
          customerName: order.contactInfo.email,
          estimatedDeliveryTime: calculateEstimatedDeliveryTime(),
          items: order.items.map(item => ({
            name: item.name,
            quantity: item.quantity
          })),
          total: order.totalAmount
        }
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
    const orderDoc = await getDoc(orderRef);
    if (!orderDoc.exists()) {
      return null;
    }
    return orderDoc.data() as OrderDetails;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `KDA-${timestamp}-${random}`;
}

function calculateEstimatedDeliveryTime(): string {
  const now = new Date();
  const estimatedTime = new Date(now.getTime() + 45 * 60000); // 45 minutes from now
  return estimatedTime.toISOString();
}
