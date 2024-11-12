import { useCart } from '@/context/CartContext'

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
}

export function CartItem({ id, name, price, quantity }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-600">${price}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity((id), quantity - 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => updateQuantity((id), quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeFromCart((id))}
          className="text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  )
} 