import { X } from 'lucide-react';
import OrderHeader from '../molecules/OrderHeader';
import OrderItems from '../molecules/OrderItems';
import OrderActions from '../molecules/OrderActions';

interface CartOrder {
  id: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  totalPrice: number;
  deliveryInfo: {
    address: string;
    notes: string;
    tableId?: string;
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  timestamp: string;
}

interface OrderCardProps {
  order: CartOrder;
  restaurantName: string;
  isExpanded: boolean;
  isFocused: boolean;
  tableFilter?: string;
  onToggleExpansion: () => void;
  onDismissFocus: () => void;
  getTableNumber: (order: CartOrder) => string | null;
  getUserComments: (notes: string) => string;
  getStatusColor: (status: string) => string;
}

export default function OrderCard({
  order,
  restaurantName,
  isExpanded,
  isFocused,
  tableFilter,
  onToggleExpansion,
  onDismissFocus,
  getTableNumber,
  getUserComments,
  getStatusColor
}: OrderCardProps) {
  const tableNumber = getTableNumber(order);
  const isDelivery = !order.deliveryInfo.address.includes('Mesa reservada') && 
                   !order.deliveryInfo.address.includes(restaurantName);
  const userComments = getUserComments(order.deliveryInfo.notes);

  return (
    <div 
      id={`order-${order.id}`}
      className={`p-4 rounded-lg border transition-all duration-500 ${
        getStatusColor(order.status)
      } ${
        isFocused 
          ? 'ring-4 ring-blue-300 ring-opacity-75 shadow-xl scale-[1.02] bg-gradient-to-r from-blue-50 to-white border-blue-300' 
          : ''
      }`}
    >
      {/* Focused order indicator */}
      {isFocused && (
        <div className="flex items-center gap-2 mb-3 p-2 bg-blue-100 rounded-lg border border-blue-200">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-blue-800 font-semibold text-sm">
            🎯 Pedido confirmado - Listo para preparar
          </span>
          <button
            onClick={onDismissFocus}
            className="ml-auto text-blue-600 hover:text-blue-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <OrderHeader
        orderId={order.id}
        status={order.status}
        totalPrice={order.totalPrice}
        timestamp={order.timestamp}
        tableNumber={tableNumber}
        isDelivery={isDelivery}
        isFocused={isFocused}
        userComments={userComments}
      />

      <OrderItems
        items={order.items}
        isExpanded={isExpanded}
        onToggleExpansion={onToggleExpansion}
        totalPrice={order.totalPrice}
        userComments={userComments}
        tableNumber={tableNumber}
        tableFilter={tableFilter}
        notes={order.deliveryInfo.notes}
      />

      {/* Enhanced progress bar for focused orders */}
      <div className={`mt-3 rounded-full h-2 ${isFocused ? 'bg-blue-200' : 'bg-white/50'}`}>
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${
            order.status === 'pending' ? 'bg-yellow-400 w-1/4' :
            order.status === 'confirmed' ? (isFocused ? 'bg-blue-500 w-2/4 animate-pulse' : 'bg-blue-400 w-2/4') :
            order.status === 'preparing' ? 'bg-orange-400 w-3/4' :
            'bg-green-400 w-full'
          }`}
        />
      </div>

      <OrderActions
        orderId={order.id}
        status={order.status}
        isFocused={isFocused}
        onDismissFocus={onDismissFocus}
      />
    </div>
  );
}
