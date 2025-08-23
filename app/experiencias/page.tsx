'use client';
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, Users, Calendar, ExternalLink, DollarSign, Trophy } from "lucide-react";
import { experiences } from "@/lib/experiences-data";
import WhatsAppQR from "@/components/WhatsAppQR";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'fácil': return 'bg-green-100 text-green-700';
    case 'moderado': return 'bg-yellow-100 text-yellow-700';
    case 'difícil': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'aventura': return 'bg-red-100 text-red-700';
    case 'gastronomía': return 'bg-orange-100 text-orange-700';
    case 'montañismo': return 'bg-gray-100 text-gray-700';
    case 'aéreo': return 'bg-blue-100 text-blue-700';
    case 'naturaleza': return 'bg-green-100 text-green-700';
    case 'cultural': return 'bg-purple-100 text-purple-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function ExperienciasPage() {
  const featuredExperiences = experiences.filter(exp => exp.featured);
  const regularExperiences = experiences.filter(exp => !exp.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-700 text-white py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Experiencias Únicas
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Vive aventuras inolvidables y descubre San Rafael de manera extraordinaria
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <span className="bg-white/20 px-4 py-2 rounded-full">🚣 Aventura</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🍷 Gastronomía</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🎈 Aéreo</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🌿 Naturaleza</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Experiences */}
        {featuredExperiences.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              🌟 Experiencias Destacadas
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredExperiences.map((experiencia) => (
                <div key={experiencia.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-200">
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={experiencia.image}
                      alt={experiencia.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ⭐ Destacado
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <span className="text-purple-600 font-bold">${experiencia.price}</span>
                      <span className="text-gray-600 text-sm">/persona</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-gray-800">{experiencia.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-700">{experiencia.rating}</span>
                        <span className="text-gray-500">({experiencia.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{experiencia.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">{experiencia.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">{experiencia.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">{experiencia.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">{experiencia.season}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm font-semibold text-gray-700 mb-2 block">Incluye:</span>
                      <div className="flex flex-wrap gap-2">
                        {experiencia.includes.map((item, idx) => (
                          <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(experiencia.category)}`}>
                          {experiencia.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(experiencia.difficulty)}`}>
                          {experiencia.difficulty}
                        </span>
                      </div>
                      <Link
                        href={`/experiencias/${experiencia.id}`}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-fuchsia-600 transition-colors duration-300"
                      >
                        Ver detalles <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Experiences */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Todas las Experiencias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularExperiences.map((experiencia) => (
              <div key={experiencia.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48">
                  <Image
                    src={experiencia.image}
                    alt={experiencia.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-purple-600 font-bold text-sm">${experiencia.price}</span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{experiencia.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-700 text-sm">{experiencia.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">{experiencia.description}</p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-3 h-3 text-purple-500" />
                      <span className="text-xs">{experiencia.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-3 h-3 text-purple-500" />
                      <span className="text-xs">{experiencia.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-3 h-3 text-purple-500" />
                      <span className="text-xs">{experiencia.groupSize}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {experiencia.includes.slice(0, 2).map((item, idx) => (
                        <span key={idx} className="bg-purple-50 text-purple-600 px-2 py-1 rounded-full text-xs">
                          {item}
                        </span>
                      ))}
                      {experiencia.includes.length > 2 && (
                        <span className="text-purple-500 text-xs">+{experiencia.includes.length - 2} más</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(experiencia.category)}`}>
                        {experiencia.category}
                      </span>
                    </div>
                    <Link
                      href={`/experiencias/${experiencia.id}`}
                      className="flex items-center gap-1 bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition-colors duration-300 text-sm"
                    >
                      Ver detalles <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Ofreces experiencias turísticas?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Comparte tus actividades y conecta con viajeros aventureros
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
            Registrar Experiencia
          </button>
        </section>

        {/* WhatsApp QR Component */}
        <WhatsAppQR 
          phoneNumber="+57 312 685-3970"
          message="Hola! Me interesa conocer más sobre las experiencias turísticas disponibles en San Rafael. ¿Podrían brindarme información sobre los tours y actividades?"
          businessName="Experiencias vextrip"
        />
      </div>
    </div>
  );
}
