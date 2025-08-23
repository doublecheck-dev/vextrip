import Image from "next/image";
import FloatingNavigation from '../molecules/FloatingNavigation';
import ScrollIndicator from '../atoms/ScrollIndicator';
import FloatingRatingBadge from '../molecules/FloatingRatingBadge';
import HeroContent from '../molecules/HeroContent';

interface RestaurantHeroProps {
  restaurant: {
    id: number;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    location: string;
    openHours: string;
    reservationRequired: boolean;
  };
  currentUser: any;
  onScrollToReservation: () => void;
}

export default function RestaurantHero({ 
  restaurant, 
  currentUser, 
  onScrollToReservation 
}: RestaurantHeroProps) {
  return (
    <div className="relative h-screen md:h-[500px] overflow-hidden">
      <Image
        src={restaurant.image}
        alt={restaurant.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      <FloatingNavigation 
        backHref="/restaurantes"
        backText="Volver a restaurantes"
      />

      <FloatingRatingBadge
        rating={restaurant.rating}
        reviews={restaurant.reviews}
        position="top-right"
      />

      <HeroContent
        restaurant={restaurant}
        currentUser={currentUser}
        onScrollToReservation={onScrollToReservation}
      />

      <ScrollIndicator />
    </div>
  );
}
         