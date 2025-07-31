export interface RoomType {
  name: string;
  price: number;
  capacity: number;
  description: string;
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  category: string;
  location: string;
  address: string;
  pricePerNight: number;
  phone: string;
  email: string;
  website: string;
  checkIn: string;
  checkOut: string;
  featured: boolean;
  amenities: string[];
  roomTypes: RoomType[];
  policies: string[];
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Hotel San Rafael",
    description: "Lujo y elegancia en el corazón de San Rafael. Hotel 5 estrellas con spa, piscina climatizada y vistas panorámicas a la cordillera.",
    longDescription: "El Grand Hotel San Rafael representa la excelencia en hospitalidad de lujo en Mendoza. Ubicado estratégicamente en el centro de San Rafael, este magnífico hotel de 5 estrellas ofrece una experiencia única que combina elegancia, confort y servicios de clase mundial. Con vistas panorámicas a la imponente Cordillera de los Andes, cada habitación ha sido diseñada con los más altos estándares de calidad y sofisticación.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviews: 487,
    category: "5 Estrellas",
    location: "Centro de San Rafael",
    address: "Av. San Martín 1234, San Rafael, Mendoza",
    pricePerNight: 180,
    phone: "+54 260 442-1000",
    email: "reservas@grandsanrafael.com",
    website: "www.grandsanrafael.com",
    checkIn: "15:00",
    checkOut: "11:00",
    featured: true,
    amenities: ["Spa", "Piscina", "Gym", "WiFi", "Restaurant", "Parking", "Room Service", "Bar", "Concierge", "Lavandería"],
    roomTypes: [
      { name: "Suite Presidential", price: 350, capacity: 4, description: "La suite más exclusiva con terraza privada y jacuzzi" },
      { name: "Habitación Deluxe", price: 220, capacity: 2, description: "Habitación superior con vista a la cordillera" },
      { name: "Habitación Standard", price: 180, capacity: 2, description: "Habitación cómoda con todas las comodidades" }
    ],
    policies: [
      "Check-in a partir de las 15:00",
      "Check-out hasta las 11:00",
      "Cancelación gratuita hasta 24 horas antes",
      "No se permiten mascotas",
      "WiFi gratuito en todo el hotel"
    ]
  },
  {
    id: 2,
    name: "Hotel Boutique Valle Dorado",
    description: "Experiencia boutique única con diseño contemporáneo y atención personalizada. Perfecto para escapadas románticas.",
    longDescription: "Hotel Boutique Valle Dorado es un refugio de elegancia y tranquilidad en el corazón del Valle de Uco. Con un diseño contemporáneo que respeta la arquitectura local, cada espacio ha sido cuidadosamente diseñado para ofrecer una experiencia íntima y exclusiva. Ideal para parejas que buscan una escapada romántica rodeados de viñedos y montañas.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    reviews: 256,
    category: "Boutique",
    location: "Valle de Uco",
    address: "Ruta Provincial 89 Km 15, Valle de Uco, Mendoza",
    pricePerNight: 120,
    phone: "+54 260 442-2000",
    email: "info@valledorado.com",
    website: "www.hotelvalledorado.com",
    checkIn: "14:00",
    checkOut: "12:00",
    featured: true,
    amenities: ["WiFi", "Restaurant", "Bar", "Jardín", "Terraza", "Parking", "Spa", "Piscina", "Wine Tasting"],
    roomTypes: [
      { name: "Suite Romántica", price: 180, capacity: 2, description: "Suite con jacuzzi privado y vista a los viñedos" },
      { name: "Habitación Superior", price: 140, capacity: 2, description: "Habitación amplia con terraza privada" },
      { name: "Habitación Estándar", price: 120, capacity: 2, description: "Habitación confortable con vista al jardín" }
    ],
    policies: [
      "Check-in a partir de las 14:00",
      "Check-out hasta las 12:00",
      "Cancelación gratuita hasta 48 horas antes",
      "Se admiten mascotas pequeñas con cargo adicional",
      "Desayuno incluido"
    ]
  },
  {
    id: 3,
    name: "Hostería Andina",
    description: "Alojamiento tradicional con encanto patagónico. Ambiente familiar y cálido con desayuno casero incluido.",
    longDescription: "La Hostería Andina ofrece una experiencia auténtica de hospitalidad patagónica en el centro histórico de San Rafael. Con más de 30 años de tradición familiar, este acogedor establecimiento combina la calidez del hogar con servicios hoteleros de calidad. Cada mañana despiértate con el aroma del pan casero y disfruta de un desayuno preparado con productos locales.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.5,
    reviews: 189,
    category: "3 Estrellas",
    location: "Centro Histórico",
    address: "Calle Belgrano 567, Centro, San Rafael, Mendoza",
    pricePerNight: 65,
    phone: "+54 260 442-3000",
    email: "contacto@hosteriaandina.com",
    website: "www.hosteriaandina.com.ar",
    checkIn: "14:00",
    checkOut: "10:00",
    featured: false,
    amenities: ["WiFi", "Desayuno", "Calefacción", "TV", "Parking", "Jardín", "Sala de estar", "Biblioteca"],
    roomTypes: [
      { name: "Habitación Familiar", price: 85, capacity: 4, description: "Habitación espaciosa ideal para familias" },
      { name: "Habitación Doble", price: 65, capacity: 2, description: "Habitación cómoda con cama matrimonial" },
      { name: "Habitación Individual", price: 45, capacity: 1, description: "Habitación acogedora para viajeros solos" }
    ],
    policies: [
      "Check-in a partir de las 14:00",
      "Check-out hasta las 10:00",
      "Cancelación gratuita hasta 24 horas antes",
      "Se admiten mascotas",
      "Desayuno casero incluido"
    ]
  },
  {
    id: 4,
    name: "Eco Lodge Naturaleza",
    description: "Hospedaje ecológico rodeado de naturaleza. Energía solar, construcción sustentable y actividades al aire libre.",
    longDescription: "Eco Lodge Naturaleza es un pionero en turismo sustentable en San Rafael. Ubicado en una reserva natural privada, este lodge utiliza 100% energía renovable y materiales de construcción ecológicos. Ofrece una experiencia única de conexión con la naturaleza, con senderos privados, avistamiento de fauna nativa y actividades de educación ambiental.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    reviews: 342,
    category: "Eco Lodge",
    location: "Reserva Natural",
    address: "Reserva Natural Los Reyunos, San Rafael, Mendoza",
    pricePerNight: 90,
    phone: "+54 260 442-4000",
    email: "reservas@ecolodgenaturaleza.com",
    website: "www.ecolodgenaturaleza.com.ar",
    checkIn: "15:00",
    checkOut: "11:00",
    featured: false,
    amenities: ["Eco-Friendly", "Trekking", "WiFi", "Restaurant", "Fogón", "Observatorio", "Huerta Orgánica", "Yoga"],
    roomTypes: [
      { name: "Cabaña Familiar", price: 120, capacity: 6, description: "Cabaña ecológica con vista al lago" },
      { name: "Habitación Eco", price: 90, capacity: 2, description: "Habitación sustentable con materiales naturales" },
      { name: "Domo Glamping", price: 110, capacity: 2, description: "Experiencia única bajo las estrellas" }
    ],
    policies: [
      "Check-in a partir de las 15:00",
      "Check-out hasta las 11:00",
      "Política de cero residuos",
      "Se admiten mascotas responsables",
      "Actividades ecológicas incluidas"
    ]
  },
  {
    id: 5,
    name: "Apart Hotel Las Brisas",
    description: "Apartamentos completamente equipados ideales para estadías prolongadas. Cocina completa y servicios hoteleros.",
    longDescription: "Apart Hotel Las Brisas combina la comodidad de un hogar con los servicios de un hotel. Ubicado en una zona residencial tranquila, ofrece apartamentos totalmente equipados ideales para familias, viajeros de negocios o estadías prolongadas. Cada unidad cuenta con cocina completa, living-comedor y todas las comodidades necesarias para una estancia confortable.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.4,
    reviews: 167,
    category: "Apart Hotel",
    location: "Zona Residencial",
    address: "Av. Las Heras 890, San Rafael, Mendoza",
    pricePerNight: 75,
    phone: "+54 260 442-5000",
    email: "reservas@apartlasbrisas.com",
    website: "www.aparthotellasbrisas.com.ar",
    checkIn: "15:00",
    checkOut: "10:00",
    featured: false,
    amenities: ["Cocina", "WiFi", "Lavandería", "Piscina", "Parking", "Limpieza", "Parrilla", "Solarium"],
    roomTypes: [
      { name: "Apartamento 2 Amb", price: 95, capacity: 4, description: "Apartamento con dormitorio separado y living-comedor" },
      { name: "Apartamento 1 Amb", price: 75, capacity: 2, description: "Monoambiente con kitchenette y balcón" },
      { name: "Estudio", price: 60, capacity: 2, description: "Espacio compacto con todas las comodidades" }
    ],
    policies: [
      "Check-in a partir de las 15:00",
      "Check-out hasta las 10:00",
      "Descuentos por estadías prolongadas",
      "Se admiten mascotas",
      "Limpieza semanal incluida"
    ]
  },
  {
    id: 6,
    name: "Posada del Río",
    description: "Encantadora posada a orillas del río con vistas espectaculares. Ambiente rústico y actividades acuáticas.",
    longDescription: "Posada del Río es un refugio encantador ubicado directamente sobre las márgenes del río Atuel. Con una arquitectura rústica que se integra perfectamente al paisaje natural, ofrece vistas espectaculares y acceso directo a actividades acuáticas. Es el lugar perfecto para quienes buscan tranquilidad, naturaleza y aventura en un mismo lugar.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.3,
    reviews: 203,
    category: "Posada",
    location: "Ribera del Río",
    address: "Ruta 173 Km 8, Ribera del Río Atuel, San Rafael",
    pricePerNight: 55,
    phone: "+54 260 442-6000",
    email: "info@posadadelrio.com.ar",
    website: "www.posadadelrioatuel.com",
    checkIn: "14:00",
    checkOut: "11:00",
    featured: false,
    amenities: ["Vista al Río", "Kayak", "Pesca", "WiFi", "Asado", "Parking", "Fogón", "Muelle Privado"],
    roomTypes: [
      { name: "Habitación Vista Río", price: 75, capacity: 2, description: "Habitación con balcón y vista directa al río" },
      { name: "Habitación Estándar", price: 55, capacity: 2, description: "Habitación cómoda con vista al jardín" },
      { name: "Cabaña", price: 95, capacity: 4, description: "Cabaña independiente a metros del río" }
    ],
    policies: [
      "Check-in a partir de las 14:00",
      "Check-out hasta las 11:00",
      "Uso de kayaks incluido",
      "Se admiten mascotas",
      "Actividades acuáticas disponibles"
    ]
  }
];
