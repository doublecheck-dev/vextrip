export interface Experience {
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
  duration: string;
  groupSize: string;
  price: number;
  difficulty: string;
  featured: boolean;
  includes: string[];
  schedule: string;
  season: string;
  phone: string;
  email: string;
  website: string;
  requirements: string[];
  itinerary: { time: string; activity: string; }[];
  recommendations: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    name: "Rafting Extremo en el Atuel",
    description: "Adrenalina pura navegando los rápidos del río Atuel. Incluye equipo completo, guía profesional y almuerzo campestre.",
    longDescription: "Vive la experiencia más emocionante navegando por los rápidos del legendario río Atuel. Esta aventura de rafting extremo te llevará a través de paisajes espectaculares mientras enfrentas la emoción de los rápidos de clase III y IV. Nuestros guías certificados garantizan una experiencia segura y memorable.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviews: 342,
    category: "Aventura",
    location: "Cañón del Atuel",
    duration: "6 horas",
    groupSize: "4-12 personas",
    price: 85,
    difficulty: "Moderado",
    featured: true,
    includes: ["Equipo completo", "Guía certificado", "Almuerzo", "Transporte", "Seguro"],
    schedule: "9:00 AM - 3:00 PM",
    season: "Octubre - Abril",
    phone: "+54 260 442-8000",
    email: "aventura@raftingatuel.com",
    website: "www.raftingatuel.com.ar",
    requirements: [
      "Edad mínima: 14 años",
      "Saber nadar básicamente",
      "Buena condición física",
      "No estar embarazada"
    ],
    itinerary: [
      { time: "09:00", activity: "Encuentro en base y equipamiento" },
      { time: "09:30", activity: "Traslado al río y charla de seguridad" },
      { time: "10:30", activity: "Inicio de la aventura en el río" },
      { time: "13:00", activity: "Almuerzo campestre" },
      { time: "14:00", activity: "Segunda parte del rafting" },
      { time: "15:00", activity: "Regreso y celebración" }
    ],
    recommendations: [
      "Traer ropa cómoda que se pueda mojar",
      "Usar protector solar resistente al agua",
      "Llevar una muda de ropa seca",
      "Calzado que se pueda mojar y no se salga"
    ]
  },
  {
    id: 2,
    name: "Tour Gastronómico de Bodegas",
    description: "Degustación de vinos premium con maridaje de comida regional. Visita a 3 bodegas boutique con cata dirigida por sommelier.",
    longDescription: "Descubre los secretos de la vinicultura mendocina en este exclusivo tour gastronómico. Visitarás tres bodegas boutique cuidadosamente seleccionadas, donde degustarás vinos premium maridados con exquisitos platos regionales. Un sommelier experto te guiará en esta experiencia sensorial única.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviews: 278,
    category: "Gastronomía",
    location: "Valle de Uco",
    duration: "8 horas",
    groupSize: "6-20 personas",
    price: 120,
    difficulty: "Fácil",
    featured: true,
    includes: ["3 bodegas", "Degustación", "Almuerzo gourmet", "Sommelier", "Transporte"],
    schedule: "10:00 AM - 6:00 PM",
    season: "Todo el año",
    phone: "+54 260 442-8100",
    email: "tours@gastrovalley.com",
    website: "www.tourgastronomicovalley.com",
    requirements: [
      "Edad mínima: 18 años",
      "Documento de identidad",
      "No conducir después del tour"
    ],
    itinerary: [
      { time: "10:00", activity: "Recogida en hoteles" },
      { time: "10:30", activity: "Primera bodega - degustación" },
      { time: "12:00", activity: "Segunda bodega - tour de viñedos" },
      { time: "13:30", activity: "Almuerzo gourmet con maridaje" },
      { time: "15:30", activity: "Tercera bodega - cava subterránea" },
      { time: "17:00", activity: "Regreso a San Rafael" }
    ],
    recommendations: [
      "Vestimenta casual elegante",
      "Zapatos cómodos para caminar",
      "Llevar cámara fotográfica",
      "Hidratarse entre degustaciones"
    ]
  },
  {
    id: 3,
    name: "Trekking al Volcán Diamante",
    description: "Expedición de 2 días al majestuoso Volcán Diamante. Camping bajo las estrellas y vistas panorámicas únicas.",
    longDescription: "Una expedición épica al imponente Volcán Diamante, una de las cumbres más desafiantes de la región. Esta aventura de dos días incluye camping en alta montaña bajo un cielo estrellado incomparable y vistas panorámicas que te quitarán el aliento.",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551524164-6cf1ac37d8ce?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    reviews: 156,
    category: "Montañismo",
    location: "Cordillera Principal",
    duration: "2 días",
    groupSize: "4-8 personas",
    price: 250,
    difficulty: "Difícil",
    featured: false,
    includes: ["Guía montañista", "Camping", "Comidas", "Equipo técnico", "Seguro"],
    schedule: "Consultar",
    season: "Diciembre - Marzo",
    phone: "+54 260 442-8200",
    email: "expediciones@volcandiamante.com",
    website: "www.montanismoextremosanrafael.com",
    requirements: [
      "Experiencia en trekking de alta montaña",
      "Excelente condición física",
      "Equipo personal de montaña",
      "Examen médico reciente",
      "Seguro de montaña obligatorio"
    ],
    itinerary: [
      { time: "06:00", activity: "Salida hacia el volcán" },
      { time: "10:00", activity: "Inicio del trekking" },
      { time: "18:00", activity: "Llegada al campamento base" },
      { time: "05:00", activity: "Ascenso a la cumbre" },
      { time: "12:00", activity: "Descenso y regreso" }
    ],
    recommendations: [
      "Entrenamiento físico previo obligatorio",
      "Aclimatación recomendada",
      "Equipamiento técnico de calidad",
      "Hidratación constante"
    ]
  }
];
