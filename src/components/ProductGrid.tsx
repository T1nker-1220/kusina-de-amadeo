import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { FadeIn } from '../animations/FadeIn';

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {products.map(product => (
        <motion.div
          key={product.id}
          variants={FadeIn}
          initial="initial"
          animate="animate"
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
} 