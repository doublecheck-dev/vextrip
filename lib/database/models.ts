export interface Restaurant {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  location: Location;
  contact: Contact;
  operatingHours: OperatingHours;
  reservationRequired: boolean;
  priceRange: PriceRange;
  amenities: string[];
  cuisine: string[];
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhood: string;
}

export interface Contact {
  phone: string;
  email: string;
  whatsapp?: string;
  website?: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface OperatingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
  holidays?: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
  breakTime?: {
    start: string;
    end: string;
  };
}

export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: MenuCategory;
  allergens: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  preparationTime: number;
  calories?: number;
  isAvailable: boolean;
  ingredients: string[];
  tags: string[];
}

export interface MenuCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  lastLogin?: Date;
}

export interface UserPreferences {
  favoriteRestaurants: number[];
  dietaryRestrictions: string[];
  preferredCuisine: string[];
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  orderUpdates: boolean;
  promotions: boolean;
}

export interface Order {
  id: number;
  restaurantId: number;
  userId?: number;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  status: OrderStatus;
  type: OrderType;
  total: number;
  subtotal: number;
  tax: number;
  tip?: number;
  deliveryFee?: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  estimatedTime: number;
  actualTime?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  menuItemId: number;
  quantity: number;
  price: number;
  customizations?: string[];
  notes?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  instructions?: string;
}

export interface Reservation {
  id: number;
  restaurantId: number;
  customerInfo: CustomerInfo;
  date: Date;
  time: string;
  partySize: number;
  status: ReservationStatus;
  specialRequests?: string;
  tablePreference?: string;
  occasion?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Enums
export enum UserRole {
  CUSTOMER = 'customer',
  STAFF = 'staff',
  MANAGER = 'manager',
  ADMIN = 'admin'
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum OrderType {
  DINE_IN = 'dine_in',
  TAKEOUT = 'takeout',
  DELIVERY = 'delivery'
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  DIGITAL_WALLET = 'digital_wallet',
  BANK_TRANSFER = 'bank_transfer'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SEATED = 'seated',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

export enum PriceRange {
  BUDGET = '$',
  MODERATE = '$$',
  EXPENSIVE = '$$$',
  LUXURY = '$$$$'
}
