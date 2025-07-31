'use client';
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, Camera, Mountain, TreePine, ExternalLink, Phone, Calendar } from "lucide-react";
import { lugares } from "@/lib/lugares-data";

const getActivityIcon = (activity: string) => {
  switch (activity.toLowerCase()) {
    case 'trekking':
    case 'senderismo': return <Mountain className="w-4 h-4" />;
    case 'fotografía': return <Camera className="w-4 h-4" />;
    case 'bosque':
    case 'observación de flora': return <TreePine className="w-4 h-4" />;
    default: return <MapPin className="w-4 h-4" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'fácil': return 'bg-green-100 text-green-700';
    case 'moderado': return 'bg-yellow-100 text-yellow-700';
    case 'difícil': return 'bg-red-100 text-red-700';
    case 'variado': return 'bg-blue-100 text-blue-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function LugaresPage() {
  const featuredPlaces = lugares.filter(l => l.featured);
  const regularPlaces = lugares.filter(l => !l.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Lugares Turísticos
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Descubre los paisajes más impresionantes y aventuras únicas de San Rafael
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <span className="bg-white/20 px-4 py-2 rounded-full">🏔️ Montañas</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🏞️ Cañones</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">♨️ Termas</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🌲 Bosques</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Places */}
        {featuredPlaces.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              🌟 Lugares Destacados
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPlaces.map((lugar) => (
                <div key={lugar.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-sky-200">
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={lugar.image}
                      alt={lugar.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ⭐ Destacado
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(lugar.difficulty)}`}>
                        {lugar.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-gray-800">{lugar.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-700">{lugar.rating}</span>
                        <span className="text-gray-500">({lugar.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{lugar.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-sky-500" />
                        <span className="text-sm">{lugar.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-sky-500" />
                        <span className="text-sm">Duración: {lugar.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-sky-500" />
                        <span className="text-sm">Mejor época: {lugar.bestTime}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm font-semibold text-gray-700 mb-2 block">Actividades:</span>
                      <div className="flex flex-wrap gap-2">
                        {lugar.activities.map((activity, idx) => (
                          <span key={idx} className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            {getActivityIcon(activity)}
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium">
                        {lugar.category}
                      </span>
                      <Link
                        href={`/lugares/${lugar.id}`}
                        className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-sky-600 hover:to-blue-600 transition-colors duration-300"
                      >
                        Ver Más <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Places */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Todos los Lugares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularPlaces.map((lugar) => (
              <div key={lugar.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48">
                  <Image
                    src={lugar.image}
                    alt={lugar.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(lugar.difficulty)}`}>
                      {lugar.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{lugar.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-700 text-sm">{lugar.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">{lugar.description}</p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-3 h-3 text-sky-500" />
                      <span className="text-xs">{lugar.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-3 h-3 text-sky-500" />
                      <span className="text-xs">{lugar.duration}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {lugar.activities.slice(0, 2).map((activity, idx) => (
                        <span key={idx} className="bg-sky-50 text-sky-600 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          {getActivityIcon(activity)}
                          {activity}
                        </span>
                      ))}
                      {lugar.activities.length > 2 && (
                        <span className="text-sky-500 text-xs">+{lugar.activities.length - 2} más</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {lugar.category}
                    </span>
                    <Link
                      href={`/lugares/${lugar.id}`}
                      className="flex items-center gap-1 bg-sky-500 text-white px-3 py-1 rounded-lg hover:bg-sky-600 transition-colors duration-300 text-sm"
                    >
                      Ver Más <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Conoces un lugar increíble?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Comparte tu lugar favorito con otros viajeros
          </p>
          <button className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
            Sugerir Lugar
          </button>
        </section>
      </div>
    </div>
  );
}
     