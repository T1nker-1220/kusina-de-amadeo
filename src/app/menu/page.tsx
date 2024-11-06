'use client';
import { products } from '@/data/products';
import ProductsGrid from '@/components/ProductsGrid';
import { Product } from '@/types/product';
export default function MenuPage() {
  const handleAddToCart = (product: Product) => {
    // Implement cart functionality
    console.log(`Adding ${product.name} to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <ProductsGrid products={products.map(p => ({
        ...p,
        available: true,
        description: p.description || '', // Ensure description is always a string
        image: p.image || '/default-product-image.jpg' // Provide default image
      }))} onAddToCart={handleAddToCart} />
    </div>
  );
}