import { Restaurant, MenuCategory, MenuItem, PriceRange, OrderStatus } from './models';

export const restaurantsDatabase: Restaurant[] = [
  {
    id: 1,
    name: "La Terraza Dorada",
    slug: "la-terraza-dorada",
    description: "Experiencia gastronómica única con vista panorámica de la ciudad",
    category: "Gastronomía Internacional",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&h=600&fit=crop"
    ],
    rating: 4.8,
    reviews: 324,
    location: {
      address: "Calle 85 #15-32",
      city: "Bogotá",
      state: "Cundinamarca",
      zipCode: "110221",
      coordinates: { lat: 4.6793, lng: -74.0466 },
      neighborhood: "Zona Rosa"
    },
    contact: {
      phone: "+57 312 685-3970",
      email: "reservas@laterrazadorada.com",
      whatsapp: "+57 312 685-3970",
      website: "https://laterrazadorada.com",
      socialMedia: {
        instagram: "@laterrazadorada",
        facebook: "La Terraza Dorada",
        twitter: "@laterrazadorada"
      }
    },
    operatingHours: {
      monday: { isOpen: true, openTime: "12:00", closeTime: "22:00" },
      tuesday: { isOpen: true, openTime: "12:00", closeTime: "22:00" },
      wednesday: { isOpen: true, openTime: "12:00", closeTime: "22:00" },
      thursday: { isOpen: true, openTime: "12:00", closeTime: "22:00" },
      friday: { isOpen: true, openTime: "12:00", closeTime: "23:00" },
      saturday: { isOpen: true, openTime: "11:00", closeTime: "23:00" },
      sunday: { isOpen: true, openTime: "11:00", closeTime: "21:00" }
    },
    reservationRequired: true,
    priceRange: PriceRange.EXPENSIVE,
    amenities: ["Terraza", "Vista panorámica", "Aire acondicionado", "WiFi", "Estacionamiento", "Música en vivo"],
    cuisine: ["Internacional", "Mediterránea", "Fusión"],
    capacity: 150,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: 2,
    name: "El Rincón Criollo",
    slug: "el-rincon-criollo",
    description: "Auténtica cocina colombiana con recetas tradicionales",
    category: "Cocina Tradicional",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552566650-6b23b72fcd61?w=800&h=600&fit=crop"
    ],
    rating: 4.6,
    reviews: 187,
    location: {
      address: "Carrera 11 #93-45",
      city: "Bogotá",
      state: "Cundinamarca",
      zipCode: "110221",
      coordinates: { lat: 4.6798, lng: -74.0469 },
      neighborhood: "Chapinero"
    },
    contact: {
      phone: "+57 301 456-7890",
      email: "info@elrinconcriollo.com",
      whatsapp: "+57 301 456-7890",
      socialMedia: {
        instagram: "@elrinconcriollo",
        facebook: "El Rincón Criollo"
      }
    },
    operatingHours: {
      monday: { isOpen: true, openTime: "11:00", closeTime: "21:00" },
      tuesday: { isOpen: true, openTime: "11:00", closeTime: "21:00" },
      wednesday: { isOpen: true, openTime: "11:00", closeTime: "21:00" },
      thursday: { isOpen: true, openTime: "11:00", closeTime: "21:00" },
      friday: { isOpen: true, openTime: "11:00", closeTime: "22:00" },
      saturday: { isOpen: true, openTime: "10:00", closeTime: "22:00" },
      sunday: { isOpen: true, openTime: "10:00", closeTime: "20:00" }
    },
    reservationRequired: false,
    priceRange: PriceRange.MODERATE,
    amenities: ["Comida para llevar", "Entrega a domicilio", "Terraza", "WiFi"],
    cuisine: ["Colombiana", "Criolla", "Casera"],
    capacity: 80,
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2024-01-10")
  }
];

export const menuCategoriesDatabase: MenuCategory[] = [
  { id: 1, name: "Entradas", description: "Deliciosos aperitivos para empezar", icon: "🥗", order: 1, isActive: true },
  { id: 2, name: "Platos Principales", description: "Nuestros mejores platos", icon: "🍽️", order: 2, isActive: true },
  { id: 3, name: "Postres", description: "Dulces tentaciones", icon: "🍰", order: 3, isActive: true },
  { id: 4, name: "Bebidas", description: "Refrescantes opciones", icon: "🥤", order: 4, isActive: true },
  { id: 5, name: "Vinos", description: "Selección premium", icon: "🍷", order: 5, isActive: true }
];

export const menuItemsDatabase: MenuItem[] = [
  {
    id: 1,
    restaurantId: 1,
    name: "Ceviche de Camarones",
    description: "Camarones frescos marinados en limón con cebolla morada, cilantro y ají",
    price: 28000,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    category: menuCategoriesDatabase[0],
    allergens: ["mariscos"],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isSpicy: true,
    preparationTime: 15,
    calories: 180,
    isAvailable: true,
    ingredients: ["camarones", "limón", "cebolla morada", "cilantro", "ají", "sal marina"],
    tags: ["fresco", "picante", "saludable"]
  },
  {
    id: 2,
    restaurantId: 1,
    name: "Salmón a la Parrilla",
    description: "Filete de salmón con vegetales asados y salsa de eneldo",
    price: 45000,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    category: menuCategoriesDatabase[1],
    allergens: ["pescado"],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isSpicy: false,
    preparationTime: 25,
    calories: 320,
    isAvailable: true,
    ingredients: ["salmón", "vegetales mixtos", "eneldo", "aceite de oliva", "limón"],
    tags: ["proteína", "saludable", "gourmet"]
  }
];
