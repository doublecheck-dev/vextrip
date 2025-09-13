import { Restaurant, MenuItem, MenuCategory, Order, Reservation } from '../database/models';
import { restaurantsDatabase, menuCategoriesDatabase, menuItemsDatabase } from '../database/restaurant-data';

export class DataService {
  // Restaurant Services
  static getRestaurants(): Restaurant[] {
    return restaurantsDatabase;
  }

  static getRestaurantById(id: number): Restaurant | undefined {
    return restaurantsDatabase.find(restaurant => restaurant.id === id);
  }

  static getRestaurantBySlug(slug: string): Restaurant | undefined {
    return restaurantsDatabase.find(restaurant => restaurant.slug === slug);
  }

  // Menu Services
  static getMenuCategories(): MenuCategory[] {
    return menuCategoriesDatabase.filter(category => category.isActive);
  }

  static getMenuItemsByRestaurant(restaurantId: number): MenuItem[] {
    return menuItemsDatabase.filter(item => item.restaurantId === restaurantId && item.isAvailable);
  }

  static getMenuItemsByCategory(restaurantId: number, categoryId: number): MenuItem[] {
    return menuItemsDatabase.filter(
      item => item.restaurantId === restaurantId && 
              item.category.id === categoryId && 
              item.isAvailable
    );
  }

  // Component Data Population Services
  static getHeroSectionData(restaurantId: number) {
    const restaurant = this.getRestaurantById(restaurantId);
    if (!restaurant) return null;

    return {
      title: restaurant.name,
      subtitle: restaurant.description,
      description: `${restaurant.cuisine.join(' • ')} | ${restaurant.location.neighborhood}`,
      rating: restaurant.rating,
      category: restaurant.category,
      backgroundImage: restaurant.image,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.image,
        rating: restaurant.rating,
        reviews: restaurant.reviews,
        location: `${restaurant.location.address}, ${restaurant.location.neighborhood}`,
        openHours: this.formatOperatingHours(restaurant.operatingHours),
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
      location: `${restaurant.location.address}, ${restaurant.location.neighborhood}`,
      openHours: this.formatOperatingHours(restaurant.operatingHours),
      phone: restaurant.contact.phone,
      priceRange: restaurant.priceRange,
      cuisine: restaurant.cuisine.join(' • '),
      amenities: restaurant.amenities
    };
  }

  static getHeroActionsData(restaurant: Restaurant, currentUser: any) {
    return {
      restaurantId: restaurant.id,
      reservationRequired: restaurant.reservationRequired,
      currentUser,
      menuHref: `/restaurantes/${restaurant.id}/menu`,
      kitchenHref: `/restaurantes/${restaurant.id}/kitchen`,
      phone: restaurant.contact.phone,
      whatsapp: restaurant.contact.whatsapp
    };
  }

  // Component Helper Services
  static getAmenityIconType(amenity: string): string {
    switch (amenity.toLowerCase()) {
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

  static getRestaurantGalleryData(restaurant: Restaurant) {
    return {
      gallery: restaurant.gallery,
      restaurantName: restaurant.name
    };
  }

  static getDescriptionSectionData(restaurant: Restaurant) {
    return {
      title: "Sobre el restaurante",
      description: restaurant.description,
      longDescription: restaurant.description,
      bgColor: "bg-white",
      iconColor: "text-orange-500",
      titleColor: "text-gray-800",
      textColor: "text-gray-600"
    };
  }

  static getFeatureListData(restaurant: Restaurant, type: 'cuisine' | 'amenities') {
    if (type === 'cuisine') {
      return {
        items: restaurant.cuisine,
        title: "Especialidades",
        bgGradient: "from-orange-50 to-red-50",
        borderColor: "border-orange-100",
        iconBgColor: "bg-orange-500"
      };
    } else {
      return {
        items: restaurant.amenities,
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
    return {
      priceRange: restaurant.priceRange,
      reservationRequired: restaurant.reservationRequired
    };
  }

  static getContactInfoData(restaurant: Restaurant) {
    return {
      phone: restaurant.contact.phone,
      email: restaurant.contact.email,
      address: `${restaurant.location.address}, ${restaurant.location.neighborhood}`,
      openHours: this.formatOperatingHours(restaurant.operatingHours),
      website: restaurant.contact.website
    };
  }

  static getWhatsAppData(restaurant: Restaurant) {
    return {
      phoneNumber: restaurant.contact.whatsapp || restaurant.contact.phone,
      message: `Hola! Me interesa hacer una reserva en ${restaurant.name}. ¿Podrían brindarme información sobre disponibilidad y el menú?`,
      businessName: `${restaurant.name} - vextrip`
    };
  }

  // Utility Methods
  private static formatOperatingHours(hours: any): string {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const dayKey = today === 'sunday' ? 'sunday' :
                  today === 'monday' ? 'monday' :
                  today === 'tuesday' ? 'tuesday' :
                  today === 'wednesday' ? 'wednesday' :
                  today === 'thursday' ? 'thursday' :
                  today === 'friday' ? 'friday' :
                  today === 'saturday' ? 'saturday' : 'monday';
    
    const todayHours = hours[dayKey] || hours.monday;
    
    if (!todayHours || !todayHours.isOpen) {
      return 'Cerrado hoy';
    }
    
    return `${todayHours.openTime} - ${todayHours.closeTime}`;
  }

  static getPageMetadata(restaurant: Restaurant, pageType: string) {
    const baseTitle = restaurant.name;
    const baseDescription = restaurant.description;
    
    switch (pageType) {
      case 'restaurant':
        return {
          title: `${baseTitle} - Restaurante en ${restaurant.location.neighborhood}`,
          description: `${baseDescription}. ${restaurant.cuisine.join(', ')}. Reservas: ${restaurant.contact.phone}`,
          keywords: [...restaurant.cuisine, restaurant.category, restaurant.location.neighborhood, 'restaurante'],
          image: restaurant.image
        };
      case 'menu':
        return {
          title: `Menú - ${baseTitle}`,
          description: `Descubre el delicioso menú de ${baseTitle}. ${restaurant.cuisine.join(', ')}.`,
          keywords: [...restaurant.cuisine, 'menú', 'carta', restaurant.location.neighborhood],
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
          keywords: restaurant.cuisine,
          image: restaurant.image
        };
    }
  }
}
