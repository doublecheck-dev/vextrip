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
    <div className="absolute inset-0 flex items-end">
      <div className="w-full p-8 pb-16">
        <div className="max-w-7xl mx-auto text-white">
          <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl leading-tight">
            {restaurant?.name}
          </h1>

          <HeroInfo 
            location={restaurant?.location}
            openHours={restaurant?.openHours}
          />

          <HeroActions
            restaurantId={restaurant?.id}
            reservationRequired={restaurant?.reservationRequired}
            currentUser={currentUser}
            onScrollToReservation={onScrollToReservation}
          />
        </div>
      </div>
    </div>
  );
}
