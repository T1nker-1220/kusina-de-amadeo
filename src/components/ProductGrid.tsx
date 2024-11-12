import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {products.map(product => (
        <motion.div
          key={product.id}
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <ProductCard product={product} onAddToCart={() => {}} />
        </motion.div>
      ))}
    </div>
  );
} 