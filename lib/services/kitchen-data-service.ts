import { KitchenOrder, KitchenStats, OrderCounts, KitchenFilters, RestaurantSummary, KitchenPriority } from '../database/kitchen-models';
import { OrderStatus } from '../database/models';

export class KitchenDataService {
  // Data Loading Services
  static loadOrdersFromStorage(): KitchenOrder[] {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('vextrip_orders') || '[]');
      return storedOrders.map((order: any) => this.enhanceOrderForKitchen(order));
    } catch (error) {
      console.error('Error loading orders from storage:', error);
      return [];
    }
  }

  static saveOrdersToStorage(orders: KitchenOrder[]): void {
    try {
      localStorage.setItem('vextrip_orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders to storage:', error);
    }
  }

  // Order Enhancement
  private static enhanceOrderForKitchen(order: any): KitchenOrder {
    return {
      ...order,
      tableId: order.deliveryInfo?.tableId || this.extractTableId(order),
      kitchenPriority: this.calculateKitchenPriority(order),
      estimatedCompletionTime: this.calculateEstimatedTime(order),
      specialInstructions: this.extractSpecialInstructions(order)
    };
  }

  private static extractTableId(order: any): string {
    const notes = order.deliveryInfo?.notes;
    const address = order.deliveryInfo?.address;

    if (notes) {
      const tableIdMatch = notes.match(/Table ID: ([^|]+)/) || notes.match(/TableRef: ([^|]+)/);
      if (tableIdMatch) return tableIdMatch[1].trim();
    }

    if (address?.includes('Mesa')) {
      const addressMatch = address.match(/Mesa\s*(\d+)/i);
      if (addressMatch) return `mesa-${addressMatch[1]}`;
    }

    return '';
  }

  private static calculateKitchenPriority(order: any): KitchenPriority {
    const orderTime = new Date(order.timestamp);
    const now = new Date();
    const minutesSinceOrder = (now.getTime() - orderTime.getTime()) / (1000 * 60);

    if (minutesSinceOrder > 30) return KitchenPriority.URGENT;
    if (minutesSinceOrder > 15) return KitchenPriority.HIGH;
    if (order.items.length > 5) return KitchenPriority.HIGH;
    return KitchenPriority.NORMAL;
  }

  private static calculateEstimatedTime(order: any): Date {
    const baseTime = 15; // minutes
    const itemTime = order.items.length * 3;
    const totalMinutes = baseTime + itemTime;
    
    const estimatedTime = new Date(order.timestamp);
    estimatedTime.setMinutes(estimatedTime.getMinutes() + totalMinutes);
    return estimatedTime;
  }

  private static extractSpecialInstructions(order: any): string[] {
    const instructions: string[] = [];
    
    order.items.forEach((item: any) => {
      if (item.notes) instructions.push(item.notes);
      if (item.customizations) instructions.push(...item.customizations);
    });

    if (order.notes) instructions.push(order.notes);
    
    return Array.from(new Set(instructions));
  }

  // Filtering Services
  static filterOrders(orders: KitchenOrder[], filters: KitchenFilters): KitchenOrder[] {
    let filtered = [...orders];

    if (filters.restaurantId) {
      filtered = filtered.filter(order => order.restaurantId === filters.restaurantId);
    }

    if (filters.status) {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.customerInfo.name.toLowerCase().includes(searchLower) ||
        order.id.toString().toLowerCase().includes(searchLower) ||
        order.items.some(item => item.menuItemId.toString().includes(searchLower))
      );
    }

    if (filters.dateRange) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= filters.dateRange!.start && orderDate <= filters.dateRange!.end;
      });
    }

    // Sort by priority and timestamp
    return filtered.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
      const aPriority = priorityOrder[a.kitchenPriority];
      const bPriority = priorityOrder[b.kitchenPriority];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  // Statistics Services
  static calculateOrderCounts(orders: KitchenOrder[]): OrderCounts {
    return {
      pending: orders.filter(order => order.status === OrderStatus.PENDING).length,
      confirmed: orders.filter(order => order.status === OrderStatus.CONFIRMED).length,
      preparing: orders.filter(order => order.status === OrderStatus.PREPARING).length,
      delivered: orders.filter(order => order.status === OrderStatus.DELIVERED).length
    };
  }

  static calculateKitchenStats(orders: KitchenOrder[]): KitchenStats {
    const totalOrders = orders.length;
    const counts = this.calculateOrderCounts(orders);
    
    // Calculate average preparation time
    const completedOrders = orders.filter(order => 
      order.status === OrderStatus.DELIVERED && 
      order.actualStartTime && 
      order.actualCompletionTime
    );
    
    const averagePreparationTime = completedOrders.length > 0 
      ? completedOrders.reduce((sum, order) => {
          const startTime = new Date(order.actualStartTime!).getTime();
          const endTime = new Date(order.actualCompletionTime!).getTime();
          return sum + (endTime - startTime) / (1000 * 60); // minutes
        }, 0) / completedOrders.length
      : 0;

    // Calculate orders per hour
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const ordersLastHour = orders.filter(order => 
      new Date(order.createdAt) >= oneHourAgo
    ).length;

    return {
      totalOrders,
      pendingOrders: counts.pending,
      confirmedOrders: counts.confirmed,
      preparingOrders: counts.preparing,
      deliveredOrders: counts.delivered,
      averagePreparationTime: Math.round(averagePreparationTime),
      ordersPerHour: ordersLastHour
    };
  }

  // Restaurant Services
  static getRestaurantSummaries(orders: KitchenOrder[]): RestaurantSummary[] {
    const restaurantMap = new Map<number, RestaurantSummary>();

    orders.forEach(order => {
      const existing = restaurantMap.get(order.restaurantId);
      const orderTotal = order.total;
      const orderTime = new Date(order.createdAt);

      if (existing) {
        existing.totalOrders += 1;
        existing.averageOrderValue = (existing.averageOrderValue * (existing.totalOrders - 1) + orderTotal) / existing.totalOrders;
        
        if (order.status === OrderStatus.PENDING) {
          existing.pendingOrders += 1;
        }
        
        if (!existing.lastOrderTime || orderTime > existing.lastOrderTime) {
          existing.lastOrderTime = orderTime;
        }
      } else {
        restaurantMap.set(order.restaurantId, {
          id: order.restaurantId,
          name: order.customerInfo.name, // Assuming this contains restaurant name
          totalOrders: 1,
          pendingOrders: order.status === OrderStatus.PENDING ? 1 : 0,
          averageOrderValue: orderTotal,
          lastOrderTime: orderTime
        });
      }
    });

    return Array.from(restaurantMap.values())
      .sort((a, b) => b.totalOrders - a.totalOrders);
  }

  // Component Data Services
  static getKitchenHeaderData(stats: KitchenStats) {
    return {
      title: "🍳 Dashboard de Cocina Global",
      subtitle: "Gestión de pedidos de todos los restaurantes",
      stats,
      showNotification: stats.pendingOrders > 0,
      notificationCount: stats.pendingOrders
    };
  }

  static getFilterSectionData(restaurants: RestaurantSummary[]) {
    return {
      restaurantOptions: [
        { value: 'all', label: 'Todos los restaurantes' },
        ...restaurants.map(restaurant => ({
          value: restaurant.name,
          label: restaurant.name
        }))
      ],
      statusOptions: [
        { value: 'all', label: 'Todos los estados' },
        { value: OrderStatus.PENDING, label: 'Pendiente' },
        { value: OrderStatus.CONFIRMED, label: 'Confirmado' },
        { value: OrderStatus.PREPARING, label: 'Preparando' },
        { value: OrderStatus.DELIVERED, label: 'Entregado' }
      ]
    };
  }

  static getStatusCardsData(counts: OrderCounts) {
    return [
      {
        count: counts.pending,
        label: 'Pendientes',
        color: 'yellow',
        icon: 'clock'
      },
      {
        count: counts.confirmed,
        label: 'Confirmados', 
        color: 'blue',
        icon: 'check-circle'
      },
      {
        count: counts.preparing,
        label: 'Preparando',
        color: 'orange', 
        icon: 'refresh'
      },
      {
        count: counts.delivered,
        label: 'Entregados',
        color: 'green',
        icon: 'check-circle'
      }
    ];
  }

  static getRestaurantQuickLinksData(restaurants: RestaurantSummary[]) {
    return {
      title: "Acceso rápido por restaurante",
      restaurants: restaurants.map(restaurant => ({
        ...restaurant,
        href: `/restaurantes/${restaurant.id}/kitchen`,
        hasNotification: restaurant.pendingOrders > 0
      }))
    };
  }

  // Order Management Services
  static updateOrderStatus(
    orders: KitchenOrder[], 
    orderId: string, 
    newStatus: OrderStatus
  ): KitchenOrder[] {
    const updatedOrders = orders.map(order => {
      if (order.id.toString() === orderId.toString()) {
        const updatedOrder = { ...order, status: newStatus };
        
        // Add timestamps based on status
        if (newStatus === OrderStatus.PREPARING && !order.actualStartTime) {
          updatedOrder.actualStartTime = new Date();
        }
        
        if (newStatus === OrderStatus.DELIVERED && !order.actualCompletionTime) {
          updatedOrder.actualCompletionTime = new Date();
        }
        
        return updatedOrder;
      }
      return order;
    });

    this.saveOrdersToStorage(updatedOrders);
    return updatedOrders;
  }
}
