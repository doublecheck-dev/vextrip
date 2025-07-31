'use client';
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Phone, Clock, ArrowLeft, Calendar, Users, Mail, ExternalLink, Utensils, CreditCard } from "lucide-react";
import { restaurants } from "@/lib/restaurants-data";
import WhatsAppQR from "@/components/WhatsAppQR";

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const restaurant = restaurants.find(r => r.id === parseInt(params.id));

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Restaurante no encontrado</h1>
          <Link href="/gastronomia" className="text-green-600 hover:text-green-700">
            Volver a restaurantes
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
          <Link href="/gastronomia" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver a restaurantes
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
          <div className="max-w-7xl mx-auto text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-500 px-3 py-1 rounded-full text-sm font-bold">
                {restaurant.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{restaurant.rating}</span>
                <span className="text-gray-300">({restaurant.reviews} reseñas)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{restaurant.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5" />
                <span>{restaurant.cuisine}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {restaurant.gallery.slice(1, 4).map((image, idx) => (
            <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={`${restaurant.name} - Imagen ${idx + 2}`}
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre el restaurante</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{restaurant.description}</p>
              <p className="text-gray-600 leading-relaxed">{restaurant.longDescription}</p>
            </section>

            {/* Specialties */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Especialidades</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restaurant.specialties.map((specialty, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Utensils className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700">{specialty}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Servicios</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restaurant.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CreditCard className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Policies */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Políticas</h2>
              <ul className="space-y-2">
                {restaurant.policies.map((policy, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{policy}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reservation Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-orange-200">
              <div className="text-center mb-6">
                <span className="text-2xl font-bold text-orange-600">{restaurant.priceRange}</span>
                <span className="text-gray-600 block text-sm">Rango de precios</span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                  <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <select className="flex-1 outline-none">
                      <option>19:00</option>
                      <option>19:30</option>
                      <option>20:00</option>
                      <option>20:30</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comensales</label>
                  <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                    <Users className="w-4 h-4 text-gray-400" />
                    <select className="flex-1 outline-none">
                      <option>2 personas</option>
                      <option>3 personas</option>
                      <option>4 personas</option>
                      <option>5+ personas</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-colors">
                {restaurant.reservationRequired ? 'Reservar mesa' : 'Consultar disponibilidad'}
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Información</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-700">{restaurant.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-700">{restaurant.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-700">{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-700">{restaurant.openHours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-orange-500" />
                  <a href={`https://${restaurant.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-600">
                    {restaurant.website}
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
        message={`Hola! Me interesa hacer una reserva en ${restaurant.name}. ¿Podrían brindarme información sobre disponibilidad y el menú?`}
        businessName={`${restaurant.name} - TourEx`}
      />
    </div>
  );
}
