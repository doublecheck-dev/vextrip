'use client';
import Link from "next/link";
import { ArrowLeft, Utensils, Clock, Star } from "lucide-react";
import { restaurants } from "@/lib/restaurants-data";
import RestaurantMenu from "@/components/RestaurantMenu";
import WhatsAppQR from "@/components/WhatsAppQR";
import OrderStatusDashboard from "@/components/OrderStatusDashboard";

export default function RestaurantMenuPage({ params }: { params: { id: string } }) {
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
      {/* Merged Header + Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-20 md:py-24 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl">🍽️</div>
          <div className="absolute top-40 right-20 text-4xl">🥘</div>
          <div className="absolute bottom-20 left-1/4 text-5xl">🍜</div>
          <div className="absolute bottom-40 right-1/3 text-3xl">🍕</div>
        </div>

        {/* Floating Navigation */}
        <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/20 to-transparent">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link
                href={`/restaurantes/${restaurant.id}`}
                className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 hover:bg-black/40"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Volver al restaurante</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Header Content */}
        <div className="relative pt-16 text-center">
          <div className="max-w-5xl mx-auto px-4">
            {/* Restaurant Info Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <span className="text-sm font-semibold">{restaurant.rating} • {restaurant.category}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl leading-tight">
              Menú
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-90">
              {restaurant.name}
            </h2>
            <p className="text-xl md:text-2xl opacity-80 mb-8 max-w-2xl mx-auto">
              Descubre nuestros deliciosos platos y bebidas especialmente seleccionados
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Order Status Dashboard */}
        <OrderStatusDashboard 
          restaurantId={restaurant.id}
          restaurantName={restaurant.name}
        />
        
        <RestaurantMenu goToMenuPage={false}
          restaurantId={restaurant.id} 
          restaurantName={restaurant.name}
        />
      </div>

      {/* WhatsApp QR Component */}
      <WhatsAppQR 
        phoneNumber="+57 312 685-3970"
        message={`Hola! Me interesa consultar sobre el menú de ${restaurant.name}. ¿Podrían brindarme más información?`}
        businessName={`Menú ${restaurant.name} - TourEx`}
      />
    </div>
  );
}
