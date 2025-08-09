'use client';
import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, RefreshCw, Filter, Search, Bell } from 'lucide-react';
import KitchenOrderCard from '@/components/KitchenOrderCard';

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
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  timestamp: string;
}

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<CartOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<CartOrder[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load orders from localStorage
  const loadOrders = () => {
    setIsLoading(true);
    try {
      const storedOrders = JSON.parse(localStorage.getItem('tourex_orders') || '[]');
      setOrders(storedOrders);
      console.log('🍳 Loaded orders for kitchen:', storedOrders.length);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique restaurants
  const restaurants = Array.from(new Set(orders.map(order => order.restaurantName)));

  // Filter orders based on selected filters
  useEffect(() => {
    let filtered = orders;

    // Filter by restaurant
    if (selectedRestaurant !== 'all') {
      filtered = filtered.filter(order => order.restaurantName === selectedRestaurant);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    setFilteredOrders(filtered);
  }, [orders, selectedRestaurant, statusFilter, searchTerm]);

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: CartOrder['status']) => {
    try {
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      
      setOrders(updatedOrders);
      localStorage.setItem('tourex_orders', JSON.stringify(updatedOrders));
      console.log(`📋 Order ${orderId} updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Get order counts by status
  const getOrderCounts = () => {
    const counts = {
      pending: filteredOrders.filter(order => order.status === 'pending').length,
      confirmed: filteredOrders.filter(order => order.status === 'confirmed').length,
      preparing: filteredOrders.filter(order => order.status === 'preparing').length,
      delivered: filteredOrders.filter(order => order.status === 'delivered').length,
    };
    return counts;
  };

  const orderCounts = getOrderCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🍳 Dashboard de Cocina Global</h1>
              <p className="text-gray-600 mt-1">Gestión de pedidos de todos los restaurantes</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={loadOrders}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Actualizar
              </button>
              
              {orderCounts.pending > 0 && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  {orderCounts.pending} nuevos
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Quick Links */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Acceso rápido por restaurante</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {restaurants.map((restaurant) => {
              const restaurantOrderCount = orders.filter(order => order.restaurantId === restaurant.id).length;
              const pendingCount = orders.filter(order => order.restaurantId === restaurant.id && order.status === 'pending').length;
              
              return (
                <a
                  key={restaurant.id}
                  href={`/restaurantes/${restaurant.id}/kitchen`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-800">{restaurant.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">{restaurantOrderCount} pedidos</span>
                    {pendingCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{pendingCount}</span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Restaurant Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restaurante
              </label>
              <select
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="all">Todos los restaurantes</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant} value={restaurant}>
                    {restaurant}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmado</option>
                <option value="preparing">Preparando</option>
                <option value="delivered">Entregado</option>
              </select>
            </div>

            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por cliente, pedido o plato..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-800">{orderCounts.pending}</p>
                <p className="text-yellow-600 text-sm">Pendientes</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-800">{orderCounts.confirmed}</p>
                <p className="text-blue-600 text-sm">Confirmados</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-800">{orderCounts.preparing}</p>
                <p className="text-orange-600 text-sm">Preparando</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-800">{orderCounts.delivered}</p>
                <p className="text-green-600 text-sm">Entregados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Cargando pedidos...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600 text-lg">No hay pedidos que mostrar</p>
              <p className="text-gray-400 text-sm mt-2">Los pedidos aparecerán aquí cuando los clientes realicen compras</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                onUpdateStatus={updateOrderStatus}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
