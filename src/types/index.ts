export type CategoryType = 'budget-meals' | 'silog-meals' | 'ala-carte' | 'beverages' | 'all';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: CategoryType;
  description?: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: CategoryType;
  name: string;
  image: string;
  description: string;
} 