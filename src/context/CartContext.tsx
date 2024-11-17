'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getItemCount: () => number;
  getTotal: () => number;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  const value: CartContextType = {
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
      setItems(currentItems => currentItems.filter(item => item.id !== id));
    },
    updateQuantity: (id: string, quantity: number) => {
      if (quantity <= 0) {
        value.removeFromCart(id);
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
    clearCart: () => {
      setItems([]);
    }
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}