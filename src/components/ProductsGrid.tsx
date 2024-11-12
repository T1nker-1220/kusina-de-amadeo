import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductsGrid({ products, onAddToCart }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
} 