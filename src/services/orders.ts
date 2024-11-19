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
import { 
  sendOrderConfirmation,
  sendOrderStatusUpdate,
  sendDeliveryUpdate
} from './notifications';
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
    name: string;
  };
  specialInstructions?: string;
  orderType: 'now' | 'preorder';
  deliveryDate?: string;
  deliveryTime?: string;
}

export async function createOrder(orderDetails: OrderDetails): Promise<string> {
  try {
    // Start a transaction to ensure all operations are atomic
    const orderId = await runTransaction(db, async (transaction) => {
      // First, perform all reads
      const productReads = await Promise.all(
        orderDetails.items.map(async (item) => {
          const productRef = doc(db, 'products', item.id);
          const productDoc = await transaction.get(productRef);
          
          if (!productDoc.exists()) {
            throw new Error(`Product ${item.id} not found`);
          }

          const currentInventory = productDoc.data().inventory;
          if (currentInventory < item.quantity) {
            throw new Error(`Insufficient inventory for product ${item.id}`);
          }

          return {
            ref: productRef,
            currentInventory,
            requestedQuantity: item.quantity
          };
        })
      );

      // Read cart document
      const cartRef = doc(db, 'carts', orderDetails.userId);
      await transaction.get(cartRef);

      // Now perform all writes
      const orderRef = doc(collection(db, 'orders'));
      const order = {
        ...orderDetails,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        orderNumber: generateOrderNumber(),
      };

      // 1. Create order
      transaction.set(orderRef, order);

      // 2. Update product inventory
      for (const product of productReads) {
        transaction.update(product.ref, {
          inventory: product.currentInventory - product.requestedQuantity,
        });
      }

      // 3. Clear user's cart
      transaction.update(cartRef, {
        items: [],
        updatedAt: serverTimestamp(),
      });

      return orderRef.id;
    });

    // After transaction succeeds, perform non-critical operations
    try {
      // 4. Add loyalty points (non-critical)
      await addPointsFromPurchase(orderDetails.userId, orderDetails.totalAmount);
    } catch (error) {
      console.error('Error adding loyalty points:', error);
    }

    try {
      // 5. Send order confirmation notification
      await sendOrderConfirmation(
        orderDetails.contactInfo.email,
        orderDetails.contactInfo.phone,
        orderId,
        orderDetails.contactInfo.name,
        orderDetails.items.map(item => ({
          name: item.name,
          quantity: item.quantity
        })),
        orderDetails.totalAmount
      );
    } catch (error) {
      console.error('Error sending order notifications:', error);
    }

    return orderId;
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
      await sendOrderStatusUpdate(
        order.contactInfo.email,
        orderId,
        status,
        order.contactInfo.name,
        order.items.map(item => ({
          name: item.name,
          quantity: item.quantity
        })),
        order.totalAmount
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
