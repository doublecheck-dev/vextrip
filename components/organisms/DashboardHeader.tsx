import { Eye, EyeOff } from 'lucide-react';

interface DashboardHeaderProps {
  restaurantName: string;
  ordersCount: number;
  activeOrdersCount: number;
  completedOrdersCount: number;
  hasActiveOrders: boolean;
  isVisible: boolean;
  tableFilter?: string;
  onToggleVisibility: () => void;
}

export default function DashboardHeader({
  restaurantName,
  ordersCount,
  activeOrdersCount,
  completedOrdersCount,
  hasActiveOrders,
  isVisible,
  tableFilter,
  onToggleVisibility
}: DashboardHeaderProps) {
  return (
    <div className={`bg-gradient-to-r text-white p-4 ${
      hasActiveOrders 
        ? 'from-orange-500 to-red-500' 
        : 'from-green-500 to-blue-500'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            📋 Estado de tus Pedidos ({ordersCount})
            {tableFilter && (
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                Mesa Específica
              </span>
            )}
            {hasActiveOrders && (
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full animate-pulse">
                {activeOrdersCount} Activos
              </span>
            )}
          </h3>
          <p className="text-white/80 text-sm">
            {restaurantName}
            {tableFilter && (
              <span className="ml-2">• Solo esta mesa</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveOrders && (
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {activeOrdersCount} pendientes
            </div>
          )}
          {completedOrdersCount > 0 && (
            <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
              {completedOrdersCount} completados
            </div>
          )}
          <button
            onClick={onToggleVisibility}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
            title={isVisible ? 'Ocultar pedidos' : 'Mostrar pedidos'}
          >
            {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
