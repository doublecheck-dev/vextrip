'use client';
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, UtensilsCrossed, Phone, Clock, ArrowLeft, Calendar, Users, Bed, Mail, ExternalLink } from "lucide-react";
import { hotels } from "@/lib/hotels-data";
import WhatsAppQR from "@/components/WhatsAppQR";

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case 'wifi': return <Wifi className="w-4 h-4" />;
    case 'parking': return <Car className="w-4 h-4" />;
    case 'restaurant': return <UtensilsCrossed className="w-4 h-4" />;
    case 'gym': return <Dumbbell className="w-4 h-4" />;
    case 'spa': return <Coffee className="w-4 h-4" />;
    default: return <Coffee className="w-4 h-4" />;
  }
};

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const hotel = hotels.find(h => h.id === parseInt(params.id));

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Hotel no encontrado</h1>
          <Link href="/hoteles" className="text-green-600 hover:text-green-700">
            Volver a hoteles
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
          <Link href="/hoteles" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver a hoteles
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
          <div className="max-w-7xl mx-auto text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-bold">
                {hotel.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{hotel.rating}</span>
                <span className="text-gray-300">({hotel.reviews} reseñas)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{hotel.name}</h1>
            <div className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5" />
              <span>{hotel.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {hotel.gallery.slice(1, 4).map((image, idx) => (
            <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={`${hotel.name} - Imagen ${idx + 2}`}
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre el hotel</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{hotel.description}</p>
              <p className="text-gray-600 leading-relaxed">{hotel.longDescription}</p>
            </section>

            {/* Amenities */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Servicios e instalaciones</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    {getAmenityIcon(amenity)}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Room Types */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tipos de habitación</h2>
              <div className="space-y-4">
                {hotel.roomTypes.map((room, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{room.name}</h3>
                      <span className="text-green-600 font-bold">${room.price}/noche</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Hasta {room.capacity} personas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>Cama king/queen</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Policies */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Políticas del hotel</h2>
              <ul className="space-y-2">
                {hotel.policies.map((policy, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{policy}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-green-200">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-green-600">${hotel.pricePerNight}</span>
                <span className="text-gray-600">/noche</span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <input type="date" className="flex-1 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <input type="date" className="flex-1 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Huéspedes</label>
                  <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                    <Users className="w-4 h-4 text-gray-400" />
                    <select className="flex-1 outline-none">
                      <option>1 huésped</option>
                      <option>2 huéspedes</option>
                      <option>3 huéspedes</option>
                      <option>4 huéspedes</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors">
                Reservar ahora
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Información de contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{hotel.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{hotel.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{hotel.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">Check-in: {hotel.checkIn} | Check-out: {hotel.checkOut}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-green-500" />
                  <a href={`https://${hotel.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-600">
                    {hotel.website}
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
        message={`Hola! Me interesa hacer una reserva en ${hotel.name}. ¿Podrían brindarme información sobre disponibilidad y tarifas?`}
        businessName={`${hotel.name} - vextrip`}
      />
    </div>
  );
}
