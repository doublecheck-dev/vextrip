import StatusIcon from '../atoms/StatusIcon';
import StatusBadge from '../atoms/StatusBadge';

interface OrderHeaderProps {
  orderId: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  totalPrice: number;
  timestamp: string;
  tableNumber?: string;
  isDelivery: boolean;
  isFocused: boolean;
  userComments?: string;
}

export default function OrderHeader({
  orderId,
  status,
  totalPrice,
  timestamp,
  tableNumber,
  isDelivery,
  isFocused,
  userComments
}: OrderHeaderProps) {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente de confirmación';
      case 'confirmed': return 'Confirmado - En cola';
      case 'preparing': return 'Preparando tu pedido';
      case 'delivered': return 'Listo para servir';
      default: return status;
    }
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <StatusIcon status={status} />
        <div>
          <p className="font-medium flex items-center gap-2">
            Pedido #{orderId.slice(-6)}
            {isFocused && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded animate-pulse">
                PRIORITARIO
              </span>
            )}
            {isDelivery ? (
              <StatusBadge status="preparing" size="sm">
                🚚 Delivery
              </StatusBadge>
            ) : (
              tableNumber && (
                <StatusBadge status="confirmed" size="sm">
                  🍽️ Mesa {tableNumber}
                </StatusBadge>
              )
            )}
          </p>
          <p className="text-sm opacity-75">{getStatusText(status)}</p>
          {userComments && (
            <p className="text-xs text-gray-600 mt-1 italic">
              💬 "{userComments}"
            </p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">${totalPrice}</p>
        <p className="text-xs opacity-75">
          {new Date(timestamp).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
}
