export interface Lugar {
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
  difficulty: string;
  duration: string;
  featured: boolean;
  activities: string[];
  bestTime: string;
  openingHours: string;
  phone: string;
  email: string;
  website: string;
  entrance: string;
  requirements: string[];
  recommendations: string[];
  services: string[];
}

export const lugares: Lugar[] = [
  {
    id: 1,
    name: "Cañón del Atuel",
    description: "Majestuoso cañón con formaciones rocosas únicas talladas por el río Atuel a lo largo de miles de años. Ideal para rafting y senderismo.",
    longDescription: "El Cañón del Atuel es una de las maravillas naturales más impresionantes de Mendoza. Formado por millones de años de erosión del río Atuel, este espectacular cañón presenta formaciones rocosas únicas de colores rojizos y formas caprichosas que han sido esculpidas por la naturaleza. Es un destino ideal para los amantes de la aventura y la naturaleza.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviews: 523,
    category: "Naturaleza",
    location: "Valle Grande",
    address: "Ruta Provincial 173, Valle Grande, San Rafael",
    difficulty: "Moderado",
    duration: "Día completo",
    featured: true,
    activities: ["Rafting", "Senderismo", "Fotografía", "Observación de Flora"],
    bestTime: "Marzo - Noviembre",
    openingHours: "8:00 AM - 6:00 PM",
    phone: "+54 260 442-9000",
    email: "info@canondelatuel.com",
    website: "www.canondelatuel.com.ar",
    entrance: "Gratuito",
    requirements: [
      "Calzado cómodo antideslizante",
      "Protección solar",
      "Agua abundante",
      "Ropa cómoda para actividades al aire libre"
    ],
    recommendations: [
      "Visitar temprano en la mañana",
      "Llevar cámara fotográfica",
      "Contratar guía local para mejor experiencia",
      "Verificar condiciones climáticas"
    ],
    services: ["Guías especializados", "Alquiler de equipos", "Área de picnic", "Estacionamiento"]
  },
  {
    id: 2,
    name: "Dique Los Reyunos",
    description: "Embalse artificial perfecto para deportes acuáticos y relajación. Aguas cristalinas rodeadas de montañas y excelente para pesca.",
    longDescription: "El Dique Los Reyunos es un paraíso para los amantes de los deportes acuáticos y la pesca. Este embalse artificial ofrece aguas cristalinas perfectas para natación, kayak, windsurf y pesca deportiva. Rodeado de imponentes montañas, el lugar brinda un entorno natural espectacular ideal para la relajación y las actividades familiares.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    reviews: 387,
    category: "Agua",
    location: "Los Reyunos",
    address: "Los Reyunos, San Rafael, Mendoza",
    difficulty: "Fácil",
    duration: "Medio día",
    featured: true,
    activities: ["Natación", "Pesca", "Kayak", "Windsurf"],
    bestTime: "Octubre - Abril",
    openingHours: "Todo el día",
    phone: "+54 260 442-9100",
    email: "turismo@losreyunos.com",
    website: "www.diquelosreyunos.com.ar",
    entrance: "Entrada libre",
    requirements: [
      "Traje de baño",
      "Protección solar",
      "Elementos de seguridad acuática",
      "Permiso de pesca (si aplica)"
    ],
    recommendations: [
      "Mejor época: temporada de calor",
      "Llevar equipos de pesca propios",
      "Verificar condiciones del viento para deportes acuáticos",
      "Respetar zonas de conservación"
    ],
    services: ["Alquiler de kayaks", "Proveeduría", "Zona de camping", "Muelles"]
  },
  {
    id: 3,
    name: "Volcán Diamante",
    description: "Imponente volcán inactivo que ofrece una de las vistas más espectaculares de la región. Trekking desafiante para montañistas experimentados.",
    longDescription: "El Volcán Diamante es uno de los desafíos más emocionantes para los montañistas experimentados en la región. Este volcán inactivo de 4,052 metros de altura ofrece una experiencia de trekking única con vistas panorámicas incomparables de la Cordillera de los Andes. La ascensión requiere preparación física y técnica, pero recompensa con paisajes de ensueño.",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551524164-6cf1ac37d8ce?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviews: 234,
    category: "Montaña",
    location: "Cordillera",
    address: "Acceso por Ruta 40, San Rafael, Mendoza",
    difficulty: "Difícil",
    duration: "2-3 días",
    featured: false,
    activities: ["Montañismo", "Trekking", "Camping", "Fotografía"],
    bestTime: "Diciembre - Marzo",
    openingHours: "Consultar guía",
    phone: "+54 260 442-9200",
    email: "expediciones@volcandiamante.com",
    website: "www.volcandiamante.com.ar",
    entrance: "Permiso especial requerido",
    requirements: [
      "Experiencia en montañismo",
      "Equipo técnico completo",
      "Excelente condición física",
      "Guía especializado obligatorio",
      "Seguro de montaña"
    ],
    recommendations: [
      "Contratar guía certificado",
      "Planificar con 2-3 meses de anticipación",
      "Entrenamiento físico previo",
      "Chequeo médico recomendado"
    ],
    services: ["Guías especializados", "Alquiler de equipo técnico", "Transporte 4x4", "Emergencias"]
  },
  {
    id: 4,
    name: "Termas de Cocodrilo",
    description: "Aguas termales naturales con propiedades medicinales. Lugar perfecto para relajarse después de un día de aventuras.",
    longDescription: "Las Termas de Cocodrilo son un oasis de relajación y bienestar en medio de la naturaleza. Estas aguas termales naturales, ricas en minerales, ofrecen propiedades terapéuticas y medicinales ideales para aliviar el estrés y las tensiones musculares. El entorno natural virgen hace de este lugar un refugio perfecto para reconectar con la naturaleza.",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.5,
    reviews: 189,
    category: "Termas",
    location: "Laguna del Diamante",
    address: "Laguna del Diamante, San Rafael, Mendoza",
    difficulty: "Fácil",
    duration: "Medio día",
    featured: false,
    activities: ["Relajación", "Terapia", "Fotografía", "Picnic"],
    bestTime: "Todo el año",
    openingHours: "9:00 AM - 5:00 PM",
    phone: "+54 260 442-9300",
    email: "info@termascocodrilo.com",
    website: "www.termascocodrilo.com.ar",
    entrance: "$500 por persona",
    requirements: [
      "Traje de baño",
      "Toalla",
      "Ojotas antideslizantes",
      "Hidratación constante"
    ],
    recommendations: [
      "Sesiones de 15-20 minutos máximo",
      "Hidratarse frecuentemente",
      "Consultar médico si tiene condiciones especiales",
      "Respetar horarios de funcionamiento"
    ],
    services: ["Vestuarios", "Duchas", "Área de descanso", "Servicio de toallas"]
  }
];
