import BackgroundImage from '../atoms/BackgroundImage';
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
    <div className="flex flex-col min-h-screen">
      <div className="relative flex-1 overflow-hidden">
        <BackgroundImage
          src={restaurant.image}
          alt={restaurant.name}
          overlay="black"
          overlayOpacity={30}
          priority={true}
          className="absolute inset-0 scale-110 transition-transform duration-1000 hover:scale-105"
        />

        {/* Floating navigation with responsive spacing */}
        <div className="absolute top-4 left-4 max-sm:hidden z-50 animate-fade-in-down">
          <FloatingNavigation 
            backHref="/restaurantes"
            backText="Volver a restaurantes"
            hideOnScroll={true}
            scrollThreshold={0.1}
            className="bg-black/40 backdrop-blur-2xl rounded-full border border-white/30 shadow-xl hover:bg-black/60 transition-all duration-300"
          />
        </div>

        {/* Rating badge with responsive spacing */}
        <div className="absolute top-4 right-4 max-sm:hidden z-50 animate-fade-in-down">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1 rounded-2xl shadow-2xl shadow-orange-500/25">
            <FloatingRatingBadge
              rating={restaurant.rating}
              reviews={restaurant.reviews}
              position="top-right"
            />
          </div>
        </div>

        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 via-blue-900/40 to-orange-900/60 animate-pulse pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-black/50 to-black/90 pointer-events-none" />
        
        {/* Geometric overlay pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 border border-white/50 rotate-45 animate-pulse"></div>
        </div>

        {/* Main content with slide-up animation */}
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="w-full px-8 md:px-12 lg:px-16 text-center animate-slide-up">
            <div className="max-w-5xl mx-auto space-y-8">
              <HeroContent
                restaurant={restaurant}
                currentUser={currentUser}
                onScrollToReservation={onScrollToReservation}
              />
            </div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <ScrollIndicator />
        </div>
      </div>
    </div>
  );
}
