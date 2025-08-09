'use client';
import { useState } from 'react';
import { Clock, User, MapPin, Phone, Package, CheckCircle, XCircle, PlayCircle } from 'lucide-react';

interface CartOrder {
  id: string;
  userId: number;
  userName: string;
  userEmail: string;
  restaurantId: number;
  restaurantName: string;
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
    phone: string;
    date: string;
    time: string;
    notes: string;
    tableId: string; // Added tableId for dine-in orders
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  timestamp: string;
}

interface KitchenOrderCardProps {
  order: CartOrder;
  onUpdateStatus: (orderId: string, status: CartOrder['status']) => void;
}

export default function KitchenOrderCard({ order, onUpdateStatus }: KitchenOrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'preparing': return 'Preparando';
      case 'delivered': return 'Entregado';
      default: return status;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} días`;
  };

  const isDelivery = order.deliveryInfo.address && !order.deliveryInfo.address.includes('Mesa reservada');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">{order.id.slice(-8)}</h3>
              <p className="text-sm text-gray-600 truncate">{order.restaurantName}</p>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">{getTimeAgo(order.timestamp)}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700 font-medium truncate">{order.userName}</span>
          </div>
          
          {isDelivery ? (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">🚚 Delivery</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">🍽️ En restaurante</span>
            </div>
          )}
        </div>
      </div>

      {/* Items Summary */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-800">
            Productos ({order.items.reduce((sum, item) => sum + item.quantity, 0)})
          </h4>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 text-sm hover:text-blue-700 font-medium"
          >
            {isExpanded ? 'Ocultar' : 'Ver detalles'}
          </button>
        </div>

        {isExpanded ? (
          // Detailed view
          <div className="space-y-4">
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-800 mb-1 truncate">{item.name}</h5>
                    <p className="text-sm text-gray-600">Cantidad: <span className="font-semibold">{item.quantity}</span></p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Delivery/Table Info */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-3">
                {isDelivery ? '📍 Información de entrega' : '🍽️ Información de mesa'}
              </h5>
              {isDelivery ? (
                <div className="space-y-2 text-sm text-blue-700">
                  <p className="break-words"><strong>Dirección:</strong> {order.deliveryInfo.address}</p>
                  <p className="break-words"><strong>Teléfono:</strong> {order.deliveryInfo.phone}</p>
                  <p><strong>Fecha:</strong> {order.deliveryInfo.date}</p>
                  <p><strong>Hora:</strong> {order.deliveryInfo.time}</p>
                </div>
              ) : (
                <div className="space-y-2 text-sm text-blue-700">
                  <p className="break-words"><strong>Mesa:</strong> {order.deliveryInfo.address}</p>
                  <p><strong>Hora:</strong> {order.deliveryInfo.time}</p>
                </div>
              )}
              {order.deliveryInfo.notes && (
                <div className="mt-4 pt-3 border-t border-blue-200">
                  <p className="text-sm text-yellow-800 bg-yellow-100 p-3 rounded break-words border border-yellow-200">
                    <strong>⚠️ Notas:</strong> {order.deliveryInfo.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Summary view
          <div className="space-y-3">
            {order.items.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-center text-sm py-2">
                <span className="text-gray-700 font-medium truncate">{item.quantity}x {item.name}</span>
              </div>
            ))}
            {order.items.length > 2 && (
              <p className="text-sm text-gray-500 italic">+{order.items.length - 2} productos más...</p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-3">
          {order.status === 'pending' && (
            <>
              <button
                onClick={() => onUpdateStatus(order.id, 'confirmed')}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Confirmar
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'delivered')}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Rechazar
              </button>
            </>
          )}
          
          {order.status === 'confirmed' && (
            <button
              onClick={() => onUpdateStatus(order.id, 'preparing')}
              className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              Iniciar Preparación
            </button>
          )}
          
          {order.status === 'preparing' && (
            <button
              onClick={() => onUpdateStatus(order.id, 'delivered')}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Marcar como Listo
            </button>
          )}
          
          {order.status === 'delivered' && (
            <div className="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded-lg text-center font-medium">
              ✅ Completado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
