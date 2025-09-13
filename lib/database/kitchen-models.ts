import { Order, OrderStatus, Restaurant } from './models';

export interface KitchenOrder extends Order {
  tableId?: string;
  preparationNotes?: string;
  kitchenPriority: KitchenPriority;
  estimatedCompletionTime?: Date;
  actualStartTime?: Date;
  actualCompletionTime?: Date;
  assignedChef?: string;
  specialInstructions?: string[];
}

export interface KitchenStats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  preparingOrders: number;
  deliveredOrders: number;
  averagePreparationTime: number;
  ordersPerHour: number;
}

export interface OrderCounts {
  pending: number;
  confirmed: number;
  preparing: number;
  delivered: number;
}

export interface KitchenFilters {
  restaurantId?: number;
  status?: OrderStatus;
  searchTerm?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface RestaurantSummary {
  id: number;
  name: string;
  totalOrders: number;
  pendingOrders: number;
  averageOrderValue: number;
  lastOrderTime?: Date;
}

export enum KitchenPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface KitchenDashboardData {
  orders: KitchenOrder[];
  restaurants: RestaurantSummary[];
  stats: KitchenStats;
  filters: KitchenFilters;
}
