export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  updatedAt: any; // Firebase Timestamp
  total?: number;
}
