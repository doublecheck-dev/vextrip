import { Utensils, ChefHat } from "lucide-react";
import Link from "next/link";

interface HeroActionsProps {
  restaurantId: number;
  reservationRequired: boolean;
  currentUser: any;
  onScrollToReservation: () => void;
}

export default function HeroActions({ 
  restaurantId, 
  reservationRequired, 
  currentUser, 
  onScrollToReservation 
}: HeroActionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 relative z-50">
      <Link href={`/restaurantes/${restaurantId}/menu`} passHref>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-purple-400/30 shadow-purple-500/25">
          <Utensils className="w-5 h-5" />
          Ver Menú Completo
        </button>
      </Link>
      
      <button 
        onClick={onScrollToReservation}
        className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold border border-white/30 shadow-2xl transform hover:scale-105 transition-all duration-300"
      >
        {reservationRequired ? '🍽️ Reservar Mesa' : '📞 Consultar Disponibilidad'}
      </button>
      
      {currentUser && (
        <Link href={`/restaurantes/${restaurantId}/kitchen`} passHref>
          <button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20">
            <ChefHat className="w-5 h-5" />
            <span className="hidden sm:inline">Dashboard Cocina</span>
            <span className="sm:hidden">Cocina</span>
          </button>
        </Link>
      )}
    </div>
  );
}
