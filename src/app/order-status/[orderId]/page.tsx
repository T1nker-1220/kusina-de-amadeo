import OrderStatusClient from './OrderStatusClient';

interface Order {
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  orderStatus: string;
  paymentStatus: string;
  orderType: 'now' | 'preorder';
  preorderDetails?: {
    deliveryDate: string;
    deliveryTime: string;
  };
  orderDate: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function OrderStatus({ params }: { params: { orderId: string } }) {
  return (
    <OrderStatusClient orderId={params.orderId}>
      {/* Order Type and Delivery Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Delivery Details</h3>
        <div className="bg-white/5 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Order Type:</span>
            <span className="font-medium">
              {order.orderType === 'now' ? 'Order Now' : 'Pre-order'}
            </span>
          </div>
          {order.orderType === 'preorder' && order.preorderDetails && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Delivery Date:</span>
                <span className="font-medium">{order.preorderDetails.deliveryDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Delivery Time:</span>
                <span className="font-medium">{order.preorderDetails.deliveryTime}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </OrderStatusClient>
  );
}