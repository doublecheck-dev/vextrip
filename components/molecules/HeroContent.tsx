import HeroInfo from './HeroInfo';
import HeroActions from './HeroActions';

interface HeroContentProps {
  restaurant: {
    id: number;
    name: string;
    location: string;
    openHours: string;
    reservationRequired: boolean;
  };
  currentUser: any;
  onScrollToReservation: () => void;
}

export default function HeroContent({ 
  restaurant, 
  currentUser, 
  onScrollToReservation 
}: HeroContentProps) {
  return (
    <div className="space-y-12 text-white text-center">
      {/* Restaurant name with neon effect */}
      <div className="space-y-6">
        <div className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm border border-purple-400/30 text-sm font-bold tracking-wider uppercase shadow-lg shadow-purple-500/25">
          Experiencia Gastronómica
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none bg-gradient-to-b from-white via-white to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
          {restaurant?.name}
        </h1>
        <div className="flex justify-center">
          <div className="w-32 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full shadow-lg shadow-purple-500/50"></div>
        </div>
      </div>

      {/* Info card with neon border */}
      <div className="inline-block backdrop-blur-7xl bg-white/5 rounded-3xl p-8 border border-purple-400/30 shadow-2xl shadow-purple-900/25 hover:shadow-purple-500/40 transition-all duration-500">
        <HeroInfo 
          location={restaurant?.location}
          openHours={restaurant?.openHours}
        />
      </div>

      {/* Action buttons */}
      <div className="pt-8">
        <HeroActions
          restaurantId={restaurant?.id}
          reservationRequired={restaurant?.reservationRequired}
          currentUser={currentUser}
          onScrollToReservation={onScrollToReservation}
        />
      </div>
    </div>
  );
}
