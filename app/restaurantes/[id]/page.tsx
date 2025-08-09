'use client';
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Phone, Clock, ArrowLeft, Calendar, Users, Mail, ExternalLink, Utensils, CreditCard, ChefHat, Shield, Wifi, Car, TreePine } from "lucide-react";
import { restaurants } from "@/lib/restaurants-data";
import WhatsAppQR from "@/components/WhatsAppQR";
import RestaurantMenu from "@/components/RestaurantMenu";
import { useState, useEffect } from 'react';

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case 'wifi': return <Wifi className="w-4 h-4 text-green-600" />;
    case 'estacionamiento': return <Car className="w-4 h-4 text-green-600" />;
    case 'terraza': return <TreePine className="w-4 h-4 text-green-600" />;
    case 'tarjetas de crédito': return <CreditCard className="w-4 h-4 text-green-600" />;
    case 'seguridad': return <Shield className="w-4 h-4 text-green-600" />;
    default: return <Utensils className="w-4 h-4 text-green-600" />;
  }
};

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const restaurant = restaurants.find(r => r.id === parseInt(params.id));

  useEffect(() => {
    const userData = localStorage.getItem('tourex_user');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const scrollToReservation = () => {
    const reservationSection = document.getElementById('reservation-form');
    if (reservationSection) {
      reservationSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Restaurante no encontrado</h1>
          <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar el restaurante que buscas.</p>
          <Link
            href="/gastronomia"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a restaurantes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Merged Header + Hero Section */}
      <div className="relative h-screen md:h-[500px] overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

        {/* Enhanced Header - Floating */}
        <div className="top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/20 to-transparent">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link
                href="/restaurantes"
                className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 hover:bg-black/40"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Volver a restaurantes</span>
              </Link>

            </div>
          </div>
        </div>

        {/* Floating Rating Badge */}
        <div className="absolute top-24 right-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-2xl border border-white/50">
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <div>
              <span className="font-bold text-gray-800 text-lg">{restaurant.rating}</span>
              <span className="text-gray-600 text-sm ml-1">({restaurant.reviews} reseñas)</span>
            </div>
          </div>
        </div>

        {/* Enhanced Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-8 pb-16">
            <div className="max-w-7xl mx-auto text-white">

              {/* Restaurant Name */}
              <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl leading-tight">
                {restaurant.name}
              </h1>

              {/* Location & Hours */}
              <div className="flex flex-wrap items-center gap-8 text-lg mb-8">
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{restaurant.location}</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{restaurant.openHours}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/restaurantes/${restaurant.id}/menu`}
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl border-2 border-white/20 flex items-center gap-2"
                >
                  <Utensils className="w-5 h-5" />
                  Ver Menú Completo
                </Link>
                <button 
                  onClick={scrollToReservation}
                  className="bg-orange-500/90 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-xl border border-orange-400/30"
                >
                  {restaurant.reservationRequired ? '🍽️ Reservar Mesa' : '📞 Consultar Disponibilidad'}
                </button>
                {/* Kitchen Dashboard Link - Only for logged users */}
                {currentUser && (
                  <Link
                    href={`/restaurantes/${restaurant.id}/kitchen`}
                    className="flex items-center gap-2 bg-orange-500/90 backdrop-blur-md text-white px-4 py-3 rounded-xl hover:bg-orange-600 transition-colors border border-orange-400/30 shadow-lg"
                  >
                    <ChefHat className="w-5 h-5" />
                    <span className="font-semibold hidden sm:inline">Dashboard Cocina</span>
                    <span className="font-semibold sm:hidden">Cocina</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Galería</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {restaurant.gallery.slice(1, 7).map((image, idx) => (
            <div key={idx} className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src={image}
                alt={`${restaurant.name} - Imagen ${idx + 2}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Description */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Utensils className="w-8 h-8 text-orange-500" />
                Sobre el restaurante
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg mb-6">{restaurant.description}</p>
                <p className="text-gray-600 leading-relaxed">{restaurant.longDescription}</p>
              </div>
            </section>

            {/* Enhanced Specialties */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <ChefHat className="w-8 h-8 text-orange-500" />
                Especialidades
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.specialties.map((specialty, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <ChefHat className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-medium">{specialty}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Menu Section */}
            <RestaurantMenu
              goToMenuPage={true}
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
            />

            {/* Enhanced Amenities */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Servicios y Comodidades</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-gray-800 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Enhanced Policies */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Políticas del Restaurante</h2>
              <div className="space-y-4">
                {restaurant.policies.map((policy, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{policy}</span>
                  </div>
                ))}
              </div>
            </section>


          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Reservation Card */}
            <div id="reservation-form" className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 shadow-lg text-white">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold mb-2">{restaurant.priceRange}</div>
                <div className="text-orange-100">Rango de precios promedio</div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-orange-100 mb-2">Fecha de reserva</label>
                  <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Calendar className="w-5 h-5 text-orange-100" />
                    <input
                      type="date"
                      className="flex-1 bg-transparent text-white placeholder-orange-200 outline-none"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-orange-100 mb-2">Hora preferida</label>
                  <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Clock className="w-5 h-5 text-orange-100" />
                    <select className="flex-1 bg-transparent text-white outline-none">
                      <option className="text-gray-800">19:00</option>
                      <option className="text-gray-800">19:30</option>
                      <option className="text-gray-800">20:00</option>
                      <option className="text-gray-800">20:30</option>
                      <option className="text-gray-800">21:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-orange-100 mb-2">Número de comensales</label>
                  <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Users className="w-5 h-5 text-orange-100" />
                    <select className="flex-1 bg-transparent text-white outline-none">
                      <option className="text-gray-800">2 personas</option>
                      <option className="text-gray-800">3 personas</option>
                      <option className="text-gray-800">4 personas</option>
                      <option className="text-gray-800">5+ personas</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white text-orange-600 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg">
                {restaurant.reservationRequired ? '🍽️ Reservar Mesa' : '📞 Consultar Disponibilidad'}
              </button>
            </div>

            {/* Enhanced Contact Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Información de Contacto</h3>
              <div className="space-y-5">
                <a href={`tel:${restaurant.phone}`} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{restaurant.phone}</div>
                    <div className="text-sm text-gray-500">Llamar ahora</div>
                  </div>
                </a>

                <a href={`mailto:${restaurant.email}`} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{restaurant.email}</div>
                    <div className="text-sm text-gray-500">Enviar email</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{restaurant.address}</div>
                    <div className="text-sm text-gray-500">Dirección</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{restaurant.openHours}</div>
                    <div className="text-sm text-gray-500">Horario de atención</div>
                  </div>
                </div>

                <a
                  href={`https://${restaurant.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <ExternalLink className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{restaurant.website}</div>
                    <div className="text-sm text-gray-500">Visitar sitio web</div>
                  </div>
                </a>
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
