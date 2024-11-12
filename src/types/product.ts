export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

export type Category = 'budget-meals' | 'silog-meals' | 'ala-carte' | 'beverages' | 'all';