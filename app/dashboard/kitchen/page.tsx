'use client';
import { useState } from 'react';
import { Clock, CheckCircle, RefreshCw, Search, Bell } from 'lucide-react';
import KitchenOrderCard from '@/components/KitchenOrderCard';
import { useKitchenData } from '@/lib/hooks/useKitchenData';

const getIconComponent = (iconType: string) => {
  switch (iconType) {
    case 'clock': return Clock;
    case 'check-circle': return CheckCircle;
    case 'refresh': return RefreshCw;
    default: return Clock;
  }
};

export default function KitchenDashboard() {
  const {
    filteredOrders,
    loading,
    error,
    loadOrders,
    updateOrderStatus,
    updateFilters,
    getHeaderData,
    getFilterSectionData,
    getStatusCardsData,
    getRestaurantQuickLinksData,
    getOrderCounts
  } = useKitchenData();

  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get component data
  const headerData = getHeaderData();
  const filterData = getFilterSectionData();
  const statusCards = getStatusCardsData();
  const quickLinksData = getRestaurantQuickLinksData();
  const orderCounts = getOrderCounts();

  // Handle filter changes
  const handleRestaurantChange = (restaurant: string) => {
    setSelectedRestaurant(restaurant);
    updateFilters({ 
      restaurantId: restaurant === 'all' ? undefined : parseInt(restaurant) 
    });
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    updateFilters({ 
      status: status === 'all' ? undefined : status as any 
    });
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    updateFilters({ searchTerm: search || undefined });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={loadOrders}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {headerData && (
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{headerData.title}</h1>
                <p className="text-gray-600 mt-1">{headerData.subtitle}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={loadOrders}
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Actualizar
                </button>
                
                {headerData.showNotification && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    {headerData.notificationCount} nuevos
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Restaurant Quick Links */}
        {quickLinksData && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{quickLinksData.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {quickLinksData.restaurants.map((restaurant) => (
                <a
                  key={restaurant.id}
                  href={restaurant.href}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-800">{restaurant.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">{restaurant.totalOrders} pedidos</span>
                    {restaurant.hasNotification && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {restaurant.pendingOrders}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        {filterData && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Restaurant Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurante
                </label>
                <select
                  value={selectedRestaurant}
                  onChange={(e) => handleRestaurantChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  {filterData.restaurantOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  {filterData.statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Buscar por cliente, pedido o plato..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {statusCards.map((card, index) => {
            const IconComponent = getIconComponent(card.icon);
            return (
              <div key={index} className={`bg-${card.color}-50 border border-${card.color}-200 rounded-lg p-4`}>
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-8 h-8 text-${card.color}-600`} />
                  <div>
                    <p className={`text-2xl font-bold text-${card.color}-800`}>{card.count}</p>
                    <p className={`text-${card.color}-600 text-sm`}>{card.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Orders List */}
        {/* <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Cargando pedidos...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600 text-lg">No hay pedidos que mostrar</p>
              <p className="text-gray-400 text-sm mt-2">
                Los pedidos aparecerán aquí cuando los clientes realicen compras
              </p>
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
        </div> */}
      </div>
    </div>
  );
}
