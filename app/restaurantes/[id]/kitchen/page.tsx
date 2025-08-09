'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle, XCircle, RefreshCw, Search, Bell } from 'lucide-react';
import { restaurants } from "@/lib/restaurants-data";
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
    tableId: string; // Added tableId for dine-in orders
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  timestamp: string;
}

export default function RestaurantKitchenDashboard({ params }: { params: { id: string } }) {
  const [orders, setOrders] = useState<CartOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<CartOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const restaurant = restaurants.find(r => r.id === parseInt(params.id));
  const restaurantId = parseInt(params.id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Restaurante no encontrado</h1>
          <Link href="/gastronomia" className="text-green-600 hover:text-green-700">
            Volver a restaurantes
          </Link>
        </div>
      </div>
    );
  }

  // Load orders from localStorage
  const loadOrders = () => {
    setIsLoading(true);
    try {
      const storedOrders = JSON.parse(localStorage.getItem('tourex_orders') || '[]');
      // Filter only orders for this restaurant
      const restaurantOrders = storedOrders.filter((order: CartOrder) => order.restaurantId === restaurantId);
      setOrders(restaurantOrders);
      console.log(`🍳 Loaded ${restaurantOrders.length} orders for ${restaurant.name}`);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter orders based on selected filters
  useEffect(() => {
    let filtered = orders;

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
  }, [orders, statusFilter, searchTerm]);

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadOrders, 30000);
    return () => clearInterval(interval);
  }, [restaurantId]);

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: CartOrder['status']) => {
    try {
      // Load all orders from storage
      const allOrders = JSON.parse(localStorage.getItem('tourex_orders') || '[]');
      
      // Update the specific order
      const updatedOrders = allOrders.map((order: CartOrder) => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      
      // Save back to storage
      localStorage.setItem('tourex_orders', JSON.stringify(updatedOrders));
      
      // Update local state
      const updatedRestaurantOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedRestaurantOrders);
      
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
          <Link href={`/restaurantes/${restaurant.id}`} className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver al restaurante
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🍳 Cocina - {restaurant.name}</h1>
              <p className="text-gray-600 mt-1">Gestión de pedidos del restaurante</p>
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

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-sm">
              <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-6 text-gray-400" />
              <p className="text-gray-600 text-lg">Cargando pedidos...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-gray-600 text-xl mb-2">No hay pedidos para {restaurant.name}</p>
                <p className="text-gray-400 text-sm">Los pedidos aparecerán aquí cuando los clientes realicen compras</p>
              </div>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="h-fit">
                <KitchenOrderCard
                  order={order}
                  onUpdateStatus={updateOrderStatus}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
