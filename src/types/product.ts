export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export type Category = 'budget-meals' | 'silog-meals' | 'ala-carte' | 'beverages' | 'all';