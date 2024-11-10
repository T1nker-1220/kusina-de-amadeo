'use client';
import { useCart } from '@/context/CartContext';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white/90 mb-4">Your cart is empty</h1>
        <p className="text-white/70">Add some delicious items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white/90 mb-8">Shopping Cart</h1>
      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl backdrop-blur-glass bg-glass border border-white/20 p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white/90">{item.name}</h3>
                <p className="text-white/70">₱{item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="text-white/90 w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 ml-2"
                  aria-label="Remove item"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <div className="rounded-xl backdrop-blur-glass bg-glass border border-white/20 p-6">
          <p className="text-xl font-bold text-white/90">
            Total: ₱{getTotal().toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
} 