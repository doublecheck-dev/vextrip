import { useState, useEffect, useCallback } from 'react';
import { KitchenOrder, KitchenFilters, OrderCounts, KitchenStats, RestaurantSummary } from '../database/kitchen-models';
import { KitchenDataService } from '../services/kitchen-data-service';
import { OrderStatus } from '../database/models';

export function useKitchenData() {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<KitchenOrder[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantSummary[]>([]);
  const [stats, setStats] = useState<KitchenStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState<KitchenFilters>({});

  // Load orders from storage
  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const loadedOrders = KitchenDataService.loadOrdersFromStorage();
      setOrders(loadedOrders);
      
      const restaurantSummaries = KitchenDataService.getRestaurantSummaries(loadedOrders);
      setRestaurants(restaurantSummaries);
      
      const kitchenStats = KitchenDataService.calculateKitchenStats(loadedOrders);
      setStats(kitchenStats);
      
      console.log('🍳 Loaded orders for kitchen:', loadedOrders.length);
    } catch (err) {
      setError('Error al cargar los pedidos');
      console.error('Error loading kitchen data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter orders when filters or orders change
  useEffect(() => {
    const filtered = KitchenDataService.filterOrders(orders, filters);
    setFilteredOrders(filtered);
  }, [orders, filters]);

  // Load data on mount and set up auto-refresh
  useEffect(() => {
    loadOrders();
    
    const interval = setInterval(loadOrders, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [loadOrders]);

  // Update order status
  const updateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus) => {
    try {
      const updatedOrders = KitchenDataService.updateOrderStatus(orders, orderId, newStatus);
      setOrders(updatedOrders);
      
      // Recalculate stats
      const newStats = KitchenDataService.calculateKitchenStats(updatedOrders);
      setStats(newStats);
      
      console.log(`📋 Order ${orderId} updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Error al actualizar el estado del pedido');
    }
  }, [orders]);

  // Filter management
  const updateFilters = useCallback((newFilters: Partial<KitchenFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Component data getters
  const getHeaderData = useCallback(() => {
    if (!stats) return null;
    return KitchenDataService.getKitchenHeaderData(stats);
  }, [stats]);

  const getFilterSectionData = useCallback(() => {
    return KitchenDataService.getFilterSectionData(restaurants);
  }, [restaurants]);

  const getStatusCardsData = useCallback(() => {
    const counts = KitchenDataService.calculateOrderCounts(filteredOrders);
    return KitchenDataService.getStatusCardsData(counts);
  }, [filteredOrders]);

  const getRestaurantQuickLinksData = useCallback(() => {
    return KitchenDataService.getRestaurantQuickLinksData(restaurants);
  }, [restaurants]);

  const getOrderCounts = useCallback((): OrderCounts => {
    return KitchenDataService.calculateOrderCounts(filteredOrders);
  }, [filteredOrders]);

  return {
    // Data
    orders,
    filteredOrders,
    restaurants,
    stats,
    filters,
    loading,
    error,
    
    // Actions
    loadOrders,
    updateOrderStatus,
    updateFilters,
    clearFilters,
    
    // Component Data Getters
    getHeaderData,
    getFilterSectionData, 
    getStatusCardsData,
    getRestaurantQuickLinksData,
    getOrderCounts
  };
}
