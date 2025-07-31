'use client';
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, Users, ArrowLeft, Calendar, Phone, Mail, ExternalLink, DollarSign } from "lucide-react";
import { experiences } from "@/lib/experiences-data";
import WhatsAppQR from "@/components/WhatsAppQR";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'fácil': return 'bg-green-500';
    case 'moderado': return 'bg-yellow-500';
    case 'difícil': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'aventura': return 'bg-red-500';
    case 'gastronomía': return 'bg-orange-500';
    case 'montañismo': return 'bg-gray-500';
    case 'aéreo': return 'bg-blue-500';
    case 'naturaleza': return 'bg-green-500';
    case 'cultural': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const experience = experiences.find(e => e.id === parseInt(params.id));

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Experiencia no encontrada</h1>
          <Link href="/experiencias" className="text-green-600 hover:text-green-700">
            Volver a experiencias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/experiencias" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver a experiencias
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={experience.image}
          alt={experience.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
          <div className="max-w-7xl mx-auto text-white">
            <div className="flex items-center gap-4 mb-2">
              <span className={`${getCategoryColor(experience.category)} px-3 py-1 rounded-full text-sm font-bold text-white`}>
                {experience.category}
              </span>
              <span className={`${getDifficultyColor(experience.difficulty)} px-3 py-1 rounded-full text-sm font-bold text-white`}>
                {experience.difficulty}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{experience.rating}</span>
                <span className="text-gray-300">({experience.reviews} reseñas)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{experience.name}</h1>
            <div className="flex items-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{experience.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{experience.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {experience.gallery.slice(1, 4).map((image, idx) => (
            <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={`${experience.name} - Imagen ${idx + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{experience.description}</p>
              <p className="text-gray-600 leading-relaxed">{experience.longDescription}</p>
            </section>

            {/* Includes */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Qué incluye?</h2>
              <ul className="space-y-2">
                {experience.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Itinerario</h2>
              <div className="space-y-3">
                {experience.itinerary.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-purple-600 min-w-16">{item.time}</span>
                    <span className="text-gray-700">{item.activity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Requisitos</h2>
              <ul className="space-y-2">
                {experience.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Recommendations */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recomendaciones</h2>
              <ul className="space-y-2">
                {experience.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{rec}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-purple-200">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-purple-600">${experience.price}</span>
                <span className="text-gray-600">/persona</span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <input type="date" className="flex-1 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Participantes</label>
                  <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                    <Users className="w-4 h-4 text-gray-400" />
                    <select className="flex-1 outline-none">
                      <option>1 persona</option>
                      <option>2 personas</option>
                      <option>3 personas</option>
                      <option>4+ personas</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-fuchsia-600 transition-colors">
                Reservar experiencia
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Información</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duración:</span>
                  <span className="font-medium">{experience.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grupo:</span>
                  <span className="font-medium">{experience.groupSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temporada:</span>
                  <span className="font-medium">{experience.season}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horario:</span>
                  <span className="font-medium">{experience.schedule}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dificultad:</span>
                  <span className="font-medium">{experience.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-700">{experience.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-700">{experience.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-purple-500" />
                  <a href={`https://${experience.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-600">
                    {experience.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp QR Component */}
      <WhatsAppQR 
        phoneNumber="+57 312 685-3970"
        message={`Hola! Me interesa reservar la experiencia "${experience.name}". ¿Podrían brindarme más información sobre disponibilidad y precios?`}
        businessName={`${experience.name} - TourEx`}
      />
    </div>
  );
}
