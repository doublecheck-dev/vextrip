import { createClient, SupabaseClient } from '@supabase/supabase-js';
// Use Supabase-generated DB types if available. If you generated a `Database` type with the Supabase CLI,
// you can uncomment the import below and the three export type aliases to use the exact row types.
// import { Database } from '../types/supabase';
// export type Restaurant = Database['public']['Tables']['restaurants']['Row'];
// export type MenuItem = Database['public']['Tables']['menu_items']['Row'];
// export type MenuCategory = Database['public']['Tables']['menus']['Row'];

// Fallback minimal interfaces for projects without generated types
export interface Restaurant {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  gallery?: string[] | string;
  cuisine?: string[] | string;
  category?: string;
  rating?: number;
  reviews?: number;
  location?: { address?: string; neighborhood?: string; city?: string };
  contact?: { phone?: string; whatsapp?: string; email?: string; website?: string };
  operatingHours?: Record<string, any>;
  priceRange?: string;
  amenities?: string[] | string;
  reservationRequired?: boolean;
  [key: string]: any;
}

export interface MenuItem {
  id: number;
  menu_id?: number;
  category_id?: number;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  vegetarian?: boolean;
  [key: string]: any;
}

export interface MenuCategory {
  id: number;
  restaurant_id?: number;
  name: string;
  description?: string;
  [key: string]: any;
}

// Replace in-memory DB access with Supabase client queries
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn('Supabase environment variables are not set. DataService will return empty results.');
}

export class DataService {
  // Restaurant Services (now async using Supabase)
  static async getRestaurants(): Promise<Restaurant[]> {
    if (!supabase) return [];
    const { data, error } = await supabase.from('restaurants').select('*');
    if (error) {
      console.error('Supabase getRestaurants error', error);
      return [];
    }
    return (data || []) as Restaurant[];
  }

  static async getRestaurantById(id: number): Promise<Restaurant | undefined> {
    if (!supabase) return undefined;
    const { data, error } = await supabase.from('restaurants').select('*').eq('id', id).limit(1).maybeSingle();
    if (error) {
      console.error('Supabase getRestaurantById error', error);
      return undefined;
    }
    return data as Restaurant | undefined;
  }

  static async getRestaurantBySlug(slug: string): Promise<Restaurant | undefined> {
    if (!supabase) return undefined;
    const { data, error } = await supabase.from('restaurants').select('*').eq('slug', slug).limit(1).maybeSingle();
    if (error) {
      console.error('Supabase getRestaurantBySlug error', error);
      return undefined;
    }
    return data as Restaurant | undefined;
  }

  // Menu Services (async)
  static async getMenuCategories(restaurantId?: number): Promise<MenuCategory[]> {
    if (!supabase) return [];
    const query = supabase.from('menus').select('*');
    if (typeof restaurantId === 'number') query.eq('restaurant_id', restaurantId);
    const { data, error } = await query;
    if (error) {
      console.error('Supabase getMenuCategories error', error);
      return [];
    }
    return (data || []) as MenuCategory[];
  }

  static async getMenusByRestaurant(restaurantId: number): Promise<MenuCategory[]> {
    // convenience wrapper
    return this.getMenuCategories(restaurantId);
  }

  static async getMenuItemsByRestaurant(restaurantId: number): Promise<MenuItem[]> {
    if (!supabase) return [];
    const { data: menus, error: menusErr } = await supabase.from('menus').select('id').eq('restaurant_id', restaurantId);
    if (menusErr) {
      console.error('Supabase getMenuItemsByRestaurant (menus) error', menusErr);
      return [];
    }
    const menuIds = (menus || []).map((m: any) => m.id).filter(Boolean);
    if (menuIds.length === 0) return [];

    const { data: items, error: itemsErr } = await supabase
      .from('menu_items')
      .select('*')
      .in('menu_id', menuIds);
    if (itemsErr) {
      console.error('Supabase getMenuItemsByRestaurant (items) error', itemsErr);
      return [];
    }
    return (items || []) as MenuItem[];
  }

  static async getMenuItemsByCategory(restaurantId: number | undefined, categoryId?: string): Promise<MenuItem[]> {
    // categoryId corresponds to menus.id (uuid) in this schema.
    if (!supabase) return [];
    if (!categoryId) return [];

    // Optionally verify the menu belongs to the restaurant (if restaurantId provided)
    if (typeof restaurantId === 'number') {
      const { data: menuCheck, error: menuCheckErr } = await supabase
        .from('menus')
        .select('id')
        .eq('id', categoryId)
        .eq('restaurant_id', restaurantId)
        .limit(1)
        .maybeSingle();
      if (menuCheckErr) {
        console.error('Supabase getMenuItemsByCategory (menu check) error', menuCheckErr);
        return [];
      }
      if (!menuCheck) return []; // menu doesn't belong to restaurant
    }

    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('menu_id', categoryId);
    if (error) {
      console.error('Supabase getMenuItemsByCategory error', error);
      return [];
    }
    return (data || []) as MenuItem[];
  }

    // The remaining methods produce UI props from a Restaurant object.
    // They are kept synchronous and accept a Restaurant instance (not id).
    static getHeroSectionData(restaurant: Restaurant) {
      if (!restaurant) return null;
      const cuisineArr = Array.isArray(restaurant.cuisine)
        ? restaurant.cuisine
        : (typeof (restaurant.cuisine as any) === 'string' ? (restaurant.cuisine as any).split(',').map((s:any)=>s.trim()) : []);
      const locationNeighbourhood = restaurant.location?.neighborhood ?? restaurant.location?.city ?? '';
      return {
        title: restaurant.name,
        subtitle: restaurant.description,
        description: `${(cuisineArr).join(' • ')} | ${locationNeighbourhood}`,
        rating: restaurant.rating,
        category: restaurant.category,
        backgroundImage: restaurant.image,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          image: restaurant.image,
          rating: restaurant.rating,
          reviews: restaurant.reviews,
          location: `${restaurant.location?.address ?? ''}${locationNeighbourhood ? ', ' + locationNeighbourhood : ''}`,
          openHours: this.formatOperatingHours(restaurant.operatingHours ?? {}),
          reservationRequired: restaurant.reservationRequired
        }
      };
    }
  
    static getFloatingNavigationData(backHref: string, backText: string) {
      return {
        backHref,
        backText,
        hideOnScroll: true,
        scrollThreshold: 0.1
      };
    }
  
    static getFloatingRatingBadgeData(restaurant: Restaurant) {
      return {
        rating: restaurant.rating,
        reviews: restaurant.reviews,
        position: "top-right" as const
      };
    }
  
    static getHeroInfoData(restaurant: Restaurant) {
      return {
        location: `${restaurant.location?.address ?? ''}${restaurant.location?.neighborhood ? ', ' + restaurant.location.neighborhood : ''}`,
        openHours: this.formatOperatingHours(restaurant.operatingHours ?? {}),
        phone: restaurant.contact?.phone,
        priceRange: restaurant.priceRange,
        cuisine: Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(' • ') : (restaurant.cuisine || ''),
        amenities: restaurant.amenities
      };
    }
  
    static formatOperatingHours(operatingHours: Record<string, any> | null | undefined): string {
      if (!operatingHours || Object.keys(operatingHours).length === 0) return '';
      try {
        // Convert an object like { monday: '9:00-17:00', tuesday: '9:00-17:00' } into a readable string.
        const parts = Object.entries(operatingHours).map(([day, val]) => {
          if (val == null) return '';
          if (typeof val === 'string') return `${day}: ${val}`;
          if (Array.isArray(val)) return `${day}: ${val.join(', ')}`;
          if (typeof val === 'object') {
            const ranges = Object.values(val).filter(Boolean).join(', ');
            return `${day}: ${ranges}`;
          }
          return `${day}: ${String(val)}`;
        }).filter(Boolean);
        return parts.join(' • ');
      } catch (e) {
        return '';
      }
    }

    // New helper methods
    static getRestaurantGalleryData(restaurant: Restaurant) {
      if (!restaurant) return { gallery: [], restaurantName: '' };
      const gallery = Array.isArray(restaurant.gallery) ? restaurant.gallery : (restaurant.gallery ? [restaurant.gallery as any] : []);
      return {
        gallery,
        restaurantName: restaurant.name || ''
      };
    }

    static getDescriptionSectionData(restaurant: Restaurant) {
      if (!restaurant) return null;
      return {
        title: "Sobre el restaurante",
        description: restaurant.description ?? '',
        longDescription: restaurant.description ?? '',
        bgColor: "bg-white",
        iconColor: "text-orange-500",
        titleColor: "text-gray-800",
        textColor: "text-gray-600"
      };
    }

    static getFeatureListData(restaurant: Restaurant, type: 'cuisine' | 'amenities') {
      if (!restaurant) return null;
      if (type === 'cuisine') {
        const items = Array.isArray(restaurant.cuisine) ? restaurant.cuisine : (restaurant.cuisine ? (restaurant.cuisine as unknown as string).split(',').map(s => s.trim()) : []);
        return {
          items,
          title: "Especialidades",
          bgGradient: "from-orange-50 to-red-50",
          borderColor: "border-orange-100",
          iconBgColor: "bg-orange-500"
        };
      } else {
        const items = Array.isArray(restaurant.amenities) ? restaurant.amenities : (restaurant.amenities ? [restaurant.amenities as any] : []);
        return {
          items,
          title: "Servicios y Comodidades",
          bgGradient: "from-green-50 to-blue-50",
          borderColor: "border-green-100",
          iconBgColor: "bg-green-500"
        };
      }
    }

    static getPoliciesSectionData() {
      return {
        policies: [
          'Reserva requerida con 24 horas de anticipación',
          'Cancelaciones gratuitas hasta 2 horas antes',
          'No se permiten mascotas excepto animales de servicio'
        ],
        title: "Políticas del Restaurante",
        bgColor: "bg-white",
        bulletColor: "bg-orange-500",
        textColor: "text-gray-700",
        itemBgColor: "bg-gray-50"
      };
    }

    static getReservationCardData(restaurant: Restaurant) {
      if (!restaurant) return null;
      return {
        priceRange: restaurant.priceRange ?? '',
        reservationRequired: restaurant.reservationRequired ?? false
      };
    }

    static getContactInfoData(restaurant: Restaurant) {
      if (!restaurant) return null;
      return {
        phone: restaurant.contact?.phone ?? '',
        email: restaurant.contact?.email ?? '',
        address: `${restaurant.location?.address ?? ''}${restaurant.location?.neighborhood ? ', ' + restaurant.location.neighborhood : ''}`.trim(),
        openHours: this.formatOperatingHours(restaurant.operatingHours ?? {}),
        website: restaurant.contact?.website ?? ''
      };
    }

    static getWhatsAppData(restaurant: Restaurant) {
      if (!restaurant) return null;
      const phoneNumber = restaurant.contact?.whatsapp || restaurant.contact?.phone || '';
      const businessName = restaurant.name ? `${restaurant.name} - vextrip` : 'vextrip';
      return {
        phoneNumber,
        message: `Hola! Me interesa hacer una reserva en ${restaurant.name ?? 'el restaurante'}. ¿Podrían brindarme información sobre disponibilidad y el menú?`,
        businessName
      };
    }

    static getAmenityIconType(amenity: string): string {
      switch ((amenity || '').toLowerCase()) {
        case 'wifi': return 'wifi';
        case 'estacionamiento': return 'car';
        case 'terraza': return 'tree';
        case 'tarjetas de crédito': return 'credit-card';
        case 'seguridad': return 'shield';
        default: return 'utensils';
      }
    }

    static getSpecialtyIconType(): string {
      return 'chef-hat';
    }

    static getPageMetadata(restaurant: Restaurant, pageType: string) {
      if (!restaurant) return null;
      const baseTitle = restaurant.name ?? 'Restaurante';
      const baseDescription = restaurant.description ?? '';
      const cuisineArray = Array.isArray(restaurant.cuisine) ? restaurant.cuisine : (restaurant.cuisine ? (restaurant.cuisine as unknown as string).split(',').map(s => s.trim()) : []);
      const neighborhood = restaurant.location?.neighborhood ?? restaurant.location?.city ?? '';
      switch (pageType) {
        case 'restaurant':
          return {
            title: `${baseTitle} - Restaurante en ${neighborhood || 'la ciudad'}`,
            description: `${baseDescription}. ${cuisineArray.join(', ')}. Reservas: ${restaurant.contact?.phone ?? ''}`.trim(),
            keywords: [...cuisineArray.filter(Boolean), restaurant.category, neighborhood].filter(Boolean),
            image: restaurant.image
          };
        case 'menu':
          return {
            title: `Menú - ${baseTitle}`,
            description: `Descubre el delicioso menú de ${baseTitle}. ${cuisineArray.join(', ')}.`.trim(),
            keywords: [...cuisineArray.filter(Boolean), 'menú', 'carta', neighborhood].filter(Boolean),
            image: restaurant.image
          };
        case 'kitchen':
          return {
            title: `Dashboard Cocina - ${baseTitle}`,
            description: `Panel de control para la cocina de ${baseTitle}`,
            keywords: ['dashboard', 'cocina', 'pedidos', 'gestión'],
            image: restaurant.image
          };
        default:
          return {
            title: baseTitle,
            description: baseDescription,
            keywords: cuisineArray.filter(Boolean),
            image: restaurant.image
          };
      }
    }
  }