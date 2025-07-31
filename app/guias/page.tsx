'use client';
import Image from "next/image";
import { Star, MapPin, Clock, Users, Languages, Award, ExternalLink, Phone, Mail, Calendar } from "lucide-react";
import WhatsAppQR from "@/components/WhatsAppQR";

const guias = [
  {
    id: 1,
    name: "Carlos Mendoza",
    title: "Guía de Montaña Certificado",
    description: "Especialista en trekking y montañismo con más de 15 años de experiencia. Conoce cada sendero de la cordillera como la palma de su mano.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 287,
    specialties: ["Montañismo", "Trekking", "Escalada", "Supervivencia"],
    languages: ["Español", "Inglés", "Francés"],
    location: "San Rafael Centro",
    experience: "15 años",
    certifications: ["AAGM", "EPGAMT", "Primeros Auxilios"],
    phone: "+54 260 442-7001",
    email: "carlos@guiasmendoza.com",
    hourlyRate: 45,
    featured: true,
    availability: "Todo el año",
    groupSize: "1-8 personas"
  },
  {
    id: 2,
    name: "Ana Rodríguez",
    title: "Guía Gastronómica",
    description: "Sommelier y chef especializada en gastronomía regional. Creadora de los mejores tours gastronómicos de la región vitivinícola.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 342,
    specialties: ["Gastronomía", "Vinos", "Tours de Bodegas", "Maridajes"],
    languages: ["Español", "Inglés", "Italiano"],
    location: "Valle de Uco",
    experience: "8 años",
    certifications: ["Sommelier Certificada", "Chef Profesional"],
    phone: "+54 260 442-7002",
    email: "ana@tourgastronomico.com",
    hourlyRate: 55,
    featured: true,
    availability: "Marzo - Noviembre",
    groupSize: "2-15 personas"
  },
  {
    id: 3,
    name: "Miguel Santos",
    title: "Guía de Aventura",
    description: "Instructor de rafting y deportes extremos. Especialista en actividades acuáticas del río Atuel y deportes de montaña.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 198,
    specialties: ["Rafting", "Kayak", "Deportes Extremos", "Seguridad Acuática"],
    languages: ["Español", "Inglés"],
    location: "Cañón del Atuel",
    experience: "12 años",
    certifications: ["Instructor IRF", "Rescate Acuático", "Primeros Auxilios"],
    phone: "+54 260 442-7003",
    email: "miguel@aventuraatuel.com",
    hourlyRate: 40,
    featured: false,
    availability: "Octubre - Abril",
    groupSize: "4-12 personas"
  },
  {
    id: 4,
    name: "Laura Vega",
    title: "Guía Cultural e Histórica",
    description: "Historiadora y arqueóloga especializada en cultura local. Experta en patrimonio histórico y tradiciones de San Rafael.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 156,
    specialties: ["Historia", "Cultura", "Arqueología", "Patrimonio"],
    languages: ["Español", "Inglés", "Portugués"],
    location: "Centro Histórico",
    experience: "10 años",
    certifications: ["Licenciada en Historia", "Guía Oficial"],
    phone: "+54 260 442-7004",
    email: "laura@culturasr.com",
    hourlyRate: 35,
    featured: false,
    availability: "Todo el año",
    groupSize: "1-20 personas"
  },
  {
    id: 5,
    name: "Roberto Silva",
    title: "Guía de Naturaleza",
    description: "Biólogo especializado en flora y fauna regional. Ideal para avistaje de aves y tours fotográficos de naturaleza.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 223,
    specialties: ["Fauna", "Flora", "Fotografía", "Conservación"],
    languages: ["Español", "Inglés"],
    location: "Reserva Natural",
    experience: "7 años",
    certifications: ["Biólogo", "Guía de Naturaleza", "Fotografía Científica"],
    phone: "+54 260 442-7005",
    email: "roberto@naturaguide.com",
    hourlyRate: 42,
    featured: false,
    availability: "Todo el año",
    groupSize: "2-10 personas"
  },
  {
    id: 6,
    name: "Patricia Luna",
    title: "Guía Familiar",
    description: "Especialista en turismo familiar y actividades para niños. Creadora de aventuras seguras y educativas para toda la familia.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 189,
    specialties: ["Turismo Familiar", "Educación", "Niños", "Recreación"],
    languages: ["Español", "Inglés"],
    location: "San Rafael Centro",
    experience: "6 años",
    certifications: ["Guía Turística", "Educación Ambiental", "Primeros Auxilios"],
    phone: "+54 260 442-7006",
    email: "patricia@familiatur.com",
    hourlyRate: 38,
    featured: false,
    availability: "Todo el año",
    groupSize: "2-12 personas"
  }
];

const getSpecialtyColor = (specialty: string) => {
  const colors = {
    'Montañismo': 'bg-gray-100 text-gray-700',
    'Gastronomía': 'bg-orange-100 text-orange-700',
    'Rafting': 'bg-blue-100 text-blue-700',
    'Historia': 'bg-amber-100 text-amber-700',
    'Fauna': 'bg-green-100 text-green-700',
    'Turismo Familiar': 'bg-pink-100 text-pink-700'
  };
  return colors[specialty] || 'bg-purple-100 text-purple-700';
};

export default function GuiasPage() {
  const featuredGuides = guias.filter(guide => guide.featured);
  const regularGuides = guias.filter(guide => !guide.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Guías Turísticos
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Conecta con guías expertos locales para descubrir San Rafael de la mano de profesionales
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <span className="bg-white/20 px-4 py-2 rounded-full">🏔️ Montaña</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🍷 Gastronomía</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🚣 Aventura</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">👨‍👩‍👧‍👦 Familia</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Guides */}
        {featuredGuides.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              🌟 Guías Destacados
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredGuides.map((guia) => (
                <div key={guia.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-violet-200">
                  <div className="p-6">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={guia.image}
                          alt={guia.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800">{guia.name}</h3>
                            <p className="text-violet-600 font-semibold">{guia.title}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <span className="font-semibold text-gray-700">{guia.rating}</span>
                              <span className="text-gray-500">({guia.reviews})</span>
                            </div>
                            <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                              ⭐ Destacado
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{guia.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-violet-500" />
                        <span className="text-sm">{guia.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Award className="w-4 h-4 text-violet-500" />
                        <span className="text-sm">{guia.experience} experiencia</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4 text-violet-500" />
                        <span className="text-sm">{guia.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-violet-500" />
                        <span className="text-sm">{guia.availability}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm font-semibold text-gray-700 mb-2 block">Especialidades:</span>
                      <div className="flex flex-wrap gap-2">
                        {guia.specialties.map((specialty, idx) => (
                          <span key={idx} className={`px-2 py-1 rounded-full text-xs ${getSpecialtyColor(specialty)}`}>
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm font-semibold text-gray-700 mb-2 block">Idiomas:</span>
                      <div className="flex flex-wrap gap-2">
                        {guia.languages.map((language, idx) => (
                          <span key={idx} className="bg-violet-100 text-violet-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <Languages className="w-3 h-3" />
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <div className="text-left">
                          <span className="text-2xl font-bold text-violet-600">${guia.hourlyRate}</span>
                          <span className="text-gray-600 text-sm">/hora</span>
                        </div>
                        <div className="flex gap-2">
                          <a href={`tel:${guia.phone}`} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-sm">
                            <Phone className="w-4 h-4" />
                            Llamar
                          </a>
                          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-violet-600 hover:to-purple-600 transition-colors duration-300">
                            Contactar <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Guides */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Todos los Guías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularGuides.map((guia) => (
              <div key={guia.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={guia.image}
                        alt={guia.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">{guia.name}</h3>
                      <p className="text-violet-600 font-semibold text-sm">{guia.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-700 text-sm">{guia.rating}</span>
                        <span className="text-gray-500 text-sm">({guia.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">{guia.description}</p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-3 h-3 text-violet-500" />
                      <span className="text-xs">{guia.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-3 h-3 text-violet-500" />
                      <span className="text-xs">{guia.experience} experiencia</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-3 h-3 text-violet-500" />
                      <span className="text-xs">{guia.groupSize}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {guia.specialties.slice(0, 2).map((specialty, idx) => (
                        <span key={idx} className={`px-2 py-1 rounded-full text-xs ${getSpecialtyColor(specialty)}`}>
                          {specialty}
                        </span>
                      ))}
                      {guia.specialties.length > 2 && (
                        <span className="text-violet-500 text-xs">+{guia.specialties.length - 2} más</span>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold text-violet-600">${guia.hourlyRate}</span>
                        <span className="text-gray-600 text-xs">/hora</span>
                      </div>
                      <button className="flex items-center gap-1 bg-violet-500 text-white px-3 py-1 rounded-lg hover:bg-violet-600 transition-colors duration-300 text-sm">
                        Contactar <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Eres guía turístico?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Únete a nuestra plataforma y conecta con viajeros de todo el mundo
          </p>
          <button className="bg-white text-violet-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
            Registrarse como Guía
          </button>
        </section>
      </div>

      {/* WhatsApp QR Component */}
      <WhatsAppQR 
        phoneNumber="+57 312 685-3970"
        message="Hola! Me interesa contratar los servicios de un guía turístico en San Rafael. ¿Podrían brindarme información sobre los guías disponibles y sus especialidades?"
        businessName="Guías TourEx"
      />
    </div>
  );
}
