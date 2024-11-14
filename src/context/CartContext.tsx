'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getItemCount: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = {
    items,
    addToCart: (product: Product) => {
      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === product.id);
        if (existingItem) {
          return currentItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...currentItems, { ...product, quantity: 1 }];
      });
    },
    removeFromCart: (id: string) => {
      setItems(currentItems => {
        const itemToRemove = currentItems.find(item => item.id === id);
        if (itemToRemove) {
          // Trigger animation before removal
          const updatedItems = currentItems.map(item =>
            item.id === id ? { ...item, removing: true } : item
          );
          setTimeout(() => {
            setItems(items => items.filter(item => item.id !== id));
          }, 300);
          return updatedItems;
        }
        return currentItems;
      });
    },
    updateQuantity: (id: string, quantity: number) => {
      if (quantity <= 0) {
        // Add a slight delay before removal for smooth animation
        setTimeout(() => {
          value.removeFromCart(id);
        }, 150);
        return;
      }
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    },
    getItemCount: () => {
      return items.reduce((total, item) => total + item.quantity, 0);
    },
    getTotal: () => {
      return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};