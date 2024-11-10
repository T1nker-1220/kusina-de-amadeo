import { ShoppingCartIcon } from '@heroicons/react/24/solid';

export default function FloatingCartButton() {
  return (
    <button className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all">
      <ShoppingCartIcon className="w-6 h-6 text-white" />
      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-orange-500 text-sm flex items-center justify-center">
        {itemCount}
      </span>
    </button>
  );
} 