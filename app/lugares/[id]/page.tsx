'use client';
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, ArrowLeft, Calendar, Users, Phone, Mail, ExternalLink, Camera, Mountain, TreePine, DollarSign } from "lucide-react";
import { lugares } from "@/lib/lugares-data";
import WhatsAppQR from "@/components/WhatsAppQR";

const getActivityIcon = (activity: string) => {
  switch (activity.toLowerCase()) {
    case 'trekking':
    case 'senderismo':
    case 'montañismo': return <Mountain className="w-4 h-4" />;
    case 'fotografía': return <Camera className="w-4 h-4" />;
    case 'observación de flora':
    case 'observación de aves': return <TreePine className="w-4 h-4" />;
    default: return <MapPin className="w-4 h-4" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'fácil': return 'bg-green-500';
    case 'moderado': return 'bg-yellow-500';
    case 'difícil': return 'bg-red-500';
    case 'variado': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
};

export default function LugarDetailPage({ params }: { params: { id: string } }) {
  const lugar = lugares.find(l => l.id === parseInt(params.id));

  if (!lugar) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Lugar no encontrado</h1>
          <Link href="/lugares" className="text-green-600 hover:text-green-700">
            Volver a lugares
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
          <Link href="/lugares" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver a lugares
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={lugar.image}
          alt={lugar.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
          <div className="max-w-7xl mx-auto text-white">
            <div className="flex items-center gap-4 mb-2">
              <span className={`${getDifficultyColor(lugar.difficulty)} px-3 py-1 rounded-full text-sm font-bold text-white`}>
                {lugar.difficulty}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{lugar.rating}</span>
                <span className="text-gray-300">({lugar.reviews} reseñas)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{lugar.name}</h1>
            <div className="flex items-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{lugar.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{lugar.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {lugar.gallery.slice(1, 4).map((image, idx) => (
            <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={`${lugar.name} - Imagen ${idx + 2}`}
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
              <p className="text-gray-600 leading-relaxed mb-4">{lugar.description}</p>
              <p className="text-gray-600 leading-relaxed">{lugar.longDescription}</p>
            </section>

            {/* Activities */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Actividades disponibles</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {lugar.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg">
                    {getActivityIcon(activity)}
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Requisitos</h2>
              <ul className="space-y-2">
                {lugar.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Recommendations */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recomendaciones</h2>
              <ul className="space-y-2">
                {lugar.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{rec}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Services */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Servicios disponibles</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {lugar.services.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Visit Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-sky-200">
              <div className="text-center mb-6">
                <span className="text-2xl font-bold text-sky-600">{lugar.entrance}</span>
                <span className="text-gray-600 block text-sm">Entrada</span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de visita</label>
                  <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <input type="date" className="flex-1 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visitantes</label>
                  <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                    <Users className="w-4 h-4 text-gray-400" />
                    <select className="flex-1 outline-none">
                      <option>1 persona</option>
                      <option>2 personas</option>
                      <option>3-5 personas</option>
                      <option>Grupo (6+)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-600 transition-colors">
                Planificar visita
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Información práctica</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dificultad:</span>
                  <span className="font-medium">{lugar.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duración:</span>
                  <span className="font-medium">{lugar.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mejor época:</span>
                  <span className="font-medium">{lugar.bestTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horarios:</span>
                  <span className="font-medium">{lugar.openingHours}</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-sky-500" />
                  <span className="text-gray-700">{lugar.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-500" />
                  <span className="text-gray-700">{lugar.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-sky-500" />
                  <span className="text-gray-700">{lugar.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-sky-500" />
                  <a href={`https://${lugar.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-sky-600">
                    {lugar.website}
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
        message={`Hola! Me interesa obtener más información sobre ${lugar.name}. ¿Podrían brindarme detalles sobre cómo visitarlo y qué actividades se pueden realizar?`}
        businessName={`${lugar.name} - vextrip`}
      />
    </div>
  );
}
