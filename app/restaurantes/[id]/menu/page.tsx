'use client';
import { restaurants } from "@/lib/restaurants-data";
import RestaurantMenu from "@/components/RestaurantMenu";
import HeroSection from "@/components/organisms/HeroSection";
import ErrorState from "@/components/organisms/ErrorState";
import RestaurantPageLayout from "@/components/templates/RestaurantPageLayout";

export default function RestaurantMenuPage({ params }: { params: { id: string } }) {
  const restaurant = restaurants.find(r => r.id === parseInt(params.id));

  if (!restaurant) {
    return (
      <ErrorState
        title="Restaurante no encontrado"
        linkHref="/gastronomia"
        linkText="Volver a restaurantes"
      />
    );
  }

  const heroSection = (
    <HeroSection
      title="Menú"
      subtitle={restaurant.name}
      description="Descubre nuestros deliciosos platos y bebidas especialmente seleccionados"
      rating={restaurant.rating}
      category={restaurant.category}
      backHref={`/restaurantes/${restaurant.id}`}
      backText="Volver al restaurante"
      backgroundIcons={['🍽️', '🥘', '🍜', '🍕']}
      gradientColors="from-orange-400 to-red-500"
      backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&crop=center"
    />
  );

  return (
    <RestaurantPageLayout
      restaurantId={restaurant.id}
      restaurantName={restaurant.name}
      phoneNumber="+57 312 685-3970"
      heroSection={heroSection}
      showOrderDashboard={true}
      showWhatsApp={true}
    >
      <RestaurantMenu 
        goToMenuPage={false}
        restaurantId={restaurant.id} 
        restaurantName={restaurant.name}
      />
    </RestaurantPageLayout>
  );
}