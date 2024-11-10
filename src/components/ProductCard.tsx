'use client';
import { useCart } from '@/context/CartContext';
import ProductImage from './ProductImage';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative overflow-hidden rounded-2xl backdrop-blur-glass bg-glass border border-white/20 shadow-glass hover:shadow-lg hover:border-white/30 transition-all duration-300">
      <div className="aspect-square relative">
        <ProductImage 
          src={product.image}
          alt={product.name}
          className="p-4 transition-transform group-hover:scale-105 duration-300"
        />
      </div>
      <div className="p-6 border-t border-white/10 bg-white/5">
        <h3 className="text-lg font-semibold text-white/90">{product.name}</h3>
        <p className="mt-2 text-white/70">₱{product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} 