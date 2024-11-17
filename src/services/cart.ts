import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { CartItem } from '@/types/cart';

export interface Cart {
  userId: string;
  items: CartItem[];
  updatedAt: any;
}

export async function getCart(userId: string): Promise<Cart | null> {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      return cartDoc.data() as Cart;
    }

    // Initialize empty cart if it doesn't exist
    const newCart: Cart = {
      userId,
      items: [],
      updatedAt: serverTimestamp(),
    };
    await setDoc(cartRef, newCart);
    return newCart;
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
}

export async function addToCart(
  userId: string,
  item: Omit<CartItem, 'quantity'>,
  quantity: number = 1
): Promise<void> {
  try {
    const cartRef = doc(db, 'carts', userId);

    await runTransaction(db, async (transaction) => {
      const cartDoc = await transaction.get(cartRef);
      const cart = cartDoc.data() as Cart;

      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex((i) => i.id === item.id);

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item if it doesn't exist
        cart.items.push({ ...item, quantity });
      }

      transaction.update(cartRef, {
        items: cart.items,
        updatedAt: serverTimestamp(),
      });

      // Update product inventory
      const productRef = doc(db, 'products', item.id);
      const productDoc = await transaction.get(productRef);
      const currentInventory = productDoc.data()?.inventory || 0;

      if (currentInventory < quantity) {
        throw new Error('Not enough inventory');
      }

      transaction.update(productRef, {
        inventory: currentInventory - quantity,
      });
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export async function updateCartItemQuantity(
  userId: string,
  itemId: string,
  quantity: number
): Promise<void> {
  try {
    const cartRef = doc(db, 'carts', userId);

    await runTransaction(db, async (transaction) => {
      const cartDoc = await transaction.get(cartRef);
      const cart = cartDoc.data() as Cart;

      const itemIndex = cart.items.findIndex((i) => i.id === itemId);
      if (itemIndex === -1) {
        throw new Error('Item not found in cart');
      }

      const oldQuantity = cart.items[itemIndex].quantity;
      cart.items[itemIndex].quantity = quantity;

      transaction.update(cartRef, {
        items: cart.items,
        updatedAt: serverTimestamp(),
      });

      // Update product inventory
      const productRef = doc(db, 'products', itemId);
      const productDoc = await transaction.get(productRef);
      const currentInventory = productDoc.data()?.inventory || 0;
      const inventoryDiff = oldQuantity - quantity;

      if (currentInventory + inventoryDiff < 0) {
        throw new Error('Not enough inventory');
      }

      transaction.update(productRef, {
        inventory: currentInventory + inventoryDiff,
      });
    });
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
}

export async function removeFromCart(userId: string, itemId: string): Promise<void> {
  try {
    const cartRef = doc(db, 'carts', userId);

    await runTransaction(db, async (transaction) => {
      const cartDoc = await transaction.get(cartRef);
      const cart = cartDoc.data() as Cart;

      const itemIndex = cart.items.findIndex((i) => i.id === itemId);
      if (itemIndex === -1) {
        throw new Error('Item not found in cart');
      }

      const removedQuantity = cart.items[itemIndex].quantity;
      cart.items.splice(itemIndex, 1);

      transaction.update(cartRef, {
        items: cart.items,
        updatedAt: serverTimestamp(),
      });

      // Return quantity to product inventory
      const productRef = doc(db, 'products', itemId);
      const productDoc = await transaction.get(productRef);
      const currentInventory = productDoc.data()?.inventory || 0;

      transaction.update(productRef, {
        inventory: currentInventory + removedQuantity,
      });
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

export async function clearCart(userId: string): Promise<void> {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);
    const cart = cartDoc.data() as Cart;

    // Return all quantities to product inventory
    for (const item of cart.items) {
      const productRef = doc(db, 'products', item.id);
      await updateDoc(productRef, {
        inventory: item.quantity,
      });
    }

    await updateDoc(cartRef, {
      items: [],
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}
