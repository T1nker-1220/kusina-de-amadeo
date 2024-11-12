export interface Product {
  id: number;
  name: string;
  price: number;
  category: CategoryType;
  image: string;
  description?: string;
}

export type CategoryType = 'budget-meals' | 'silog-meals' | 'ala-carte' | 'beverages' | 'all';

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: CategoryType;
  name: string;
  image: string;
  description: string;
} 