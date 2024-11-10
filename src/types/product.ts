export interface Product {
  id: string | number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}