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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-1 xs:p-2 sm:p-4 border-b">
      <div className="mb-1 xs:mb-2 sm:mb-0">
        <h3 className="font-semibold text-xs xs:text-sm sm:text-base">{name}</h3>
        <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">₱{price}</p>
      </div>
      <div className="flex items-center gap-1 xs:gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center gap-1 xs:gap-2">
          <button
            onClick={() => updateQuantity((id), quantity - 1)}
            className="w-5 h-5 xs:w-6 xs:h-6 text-xs xs:text-sm sm:text-base bg-gray-200 rounded flex items-center justify-center"
          >
            -
          </button>
          <span className="text-xs xs:text-sm sm:text-base min-w-[16px] text-center">{quantity}</span>
          <button
            onClick={() => updateQuantity((id), quantity + 1)}
            className="w-5 h-5 xs:w-6 xs:h-6 text-xs xs:text-sm sm:text-base bg-gray-200 rounded flex items-center justify-center"
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeFromCart((id))}
          className="text-red-500 text-xs xs:text-sm sm:text-base"
        >
          Remove
        </button>
      </div>
    </div>
  )
}