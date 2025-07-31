export interface Restaurant {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  category: string;
  cuisine: string;
  location: string;
  address: string;
  priceRange: string;
  phone: string;
  email: string;
  website: string;
  openHours: string;
  featured: boolean;
  amenities: string[];
  specialties: string[];
  reservationRequired: boolean;
  policies: string[];
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Hotel Magia Natural",
    description: "Descubre la magia de la naturaleza en cada rincón. Cocina gourmet con ingredientes locales y vista panorámica de las montañas.",
    longDescription: "Hotel Magia Natural es un destino gastronómico único donde la cocina gourmet se fusiona con los sabores auténticos de la región. Ubicado en el corazón de San Rafael, nuestros chefs utilizan ingredientes frescos y locales para crear experiencias culinarias memorables con vista panorámica a las majestuosas montañas.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviews: 342,
    category: "Gourmet",
    cuisine: "Gourmet Internacional",
    location: "Centro de San Rafael",
    address: "Av. San Martín 123, Centro, San Rafael, Mendoza",
    priceRange: "$$$",
    phone: "+57 312 685-3970",
    email: "reservas@magianatural.com",
    website: "www.hotelmagianatural.com",
    openHours: "8:00 AM - 11:00 PM",
    featured: true,
    amenities: ["Terraza con Vista", "WiFi", "Aire Acondicionado", "Estacionamiento", "Bar"],
    specialties: ["Cordero Patagónico", "Trucha Andina", "Postres Artesanales"],
    reservationRequired: true,
    policies: [
      "Reservas recomendadas",
      "Dress code: Smart casual",
      "Cancelación gratuita hasta 2 horas antes",
      "Menú especial para vegetarianos disponible"
    ]
  },
  {
    id: 2,
    name: "Bistro del Valle",
    description: "Cocina internacional y menú gourmet con una perfecta fusión de sabores argentinos e internacionales.",
    longDescription: "Bistro del Valle ofrece una experiencia gastronómica única donde la cocina internacional se encuentra con los sabores tradicionales argentinos. Nuestro menú gourmet presenta una fusión perfecta de técnicas culinarias modernas con ingredientes locales de primera calidad.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    reviews: 228,
    category: "Bistro",
    cuisine: "Fusión Internacional",
    location: "Valle de Uco",
    address: "Ruta Provincial 89 Km 10, Valle de Uco, Mendoza",
    priceRange: "$$",
    phone: "+54 260 442-5678",
    email: "info@bistrodelvalle.com",
    website: "www.bistrodelvalle.com.ar",
    openHours: "12:00 PM - 10:00 PM",
    featured: false,
    amenities: ["WiFi", "Terraza", "Música en Vivo", "Estacionamiento"],
    specialties: ["Risotto de Quinoa", "Salmón Grillado", "Tiramisu Casero"],
    reservationRequired: false,
    policies: [
      "No se requiere reserva",
      "Happy hour de 17:00 a 19:00",
      "Aceptamos todas las tarjetas",
      "Música en vivo los viernes"
    ]
  },
  {
    id: 3,
    name: "Sabores Andinos",
    description: "Platos típicos y gastronomía local que celebra las tradiciones culinarias de la región andina.",
    longDescription: "Sabores Andinos es un homenaje a las tradiciones culinarias de la región. Nuestro restaurante celebra la rica herencia gastronómica andina con platos típicos preparados según recetas ancestrales, utilizando ingredientes autóctonos y técnicas de cocción tradicionales.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    reviews: 189,
    category: "Regional",
    cuisine: "Cocina Regional",
    location: "Centro Histórico",
    address: "Calle Belgrano 456, Centro Histórico, San Rafael",
    priceRange: "$$",
    phone: "+54 260 442-9012",
    email: "contacto@saboresandinos.com",
    website: "www.saboresandinos.com.ar",
    openHours: "11:00 AM - 9:00 PM",
    featured: false,
    amenities: ["Patio Interior", "WiFi", "Menú Infantil", "Folklore en Vivo"],
    specialties: ["Locro Tradicional", "Empanadas Mendocinas", "Dulce de Leche Casero"],
    reservationRequired: false,
    policies: [
      "Ambiente familiar",
      "Espectáculo de folklore los sábados",
      "Descuento para grupos grandes",
      "Menú especial para celíacos"
    ]
  },
  {
    id: 4,
    name: "Parrilla Los Andes",
    description: "La mejor parrilla de San Rafael con carnes premium y técnicas tradicionales de asado argentino.",
    longDescription: "Parrilla Los Andes es el templo del asado argentino en San Rafael. Con más de 20 años de experiencia, nuestros parrilleros dominan las técnicas tradicionales para lograr carnes premium perfectamente cocidas. Cada corte es seleccionado cuidadosamente para garantizar la máxima calidad y sabor.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviews: 456,
    category: "Parrilla",
    cuisine: "Parrilla Argentina",
    location: "Av. Principal",
    address: "Av. Mitre 789, San Rafael, Mendoza",
    priceRange: "$$$",
    phone: "+54 260 442-3456",
    email: "reservas@parrillalosandes.com",
    website: "www.parrillalosandes.com.ar",
    openHours: "7:00 PM - 12:00 AM",
    featured: true,
    amenities: ["Parrilla a la Vista", "Bodega", "Terraza", "Estacionamiento", "WiFi"],
    specialties: ["Bife de Chorizo", "Cordero a la Cruz", "Morcilla Criolla"],
    reservationRequired: true,
    policies: [
      "Reservas obligatorias fines de semana",
      "Carnes de primera calidad garantizada",
      "Maridaje con vinos locales disponible",
      "Ambiente para toda la familia"
    ]
  }
];
