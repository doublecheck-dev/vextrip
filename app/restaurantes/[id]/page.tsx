'use client';
import Link from "next/link";
import { ChefHat, Shield, Wifi, Car, TreePine, CreditCard, Utensils } from "lucide-react";
import Head from "next/head";
import WhatsAppQR from "@/components/WhatsAppQR";
import RestaurantMenu from "@/components/RestaurantMenu";
import ErrorState from "@/components/organisms/ErrorState";
import RestaurantHero from "@/components/organisms/RestaurantHero";
import RestaurantGallery from "@/components/organisms/RestaurantGallery";
import FeatureList from "@/components/molecules/FeatureList";
import ReservationCard from "@/components/organisms/ReservationCard";
import ContactInfo from "@/components/organisms/ContactInfo";
import PoliciesSection from "@/components/organisms/PoliciesSection";
import DescriptionSection from "@/components/organisms/DescriptionSection";
import { useRestaurantData } from "@/lib/hooks/useRestaurantData";
import { useState, useEffect } from 'react';

const getIconComponent = (iconType: string) => {
  switch (iconType) {
    case 'wifi': return <Wifi className="w-4 h-4 text-white" />;
    case 'car': return <Car className="w-4 h-4 text-white" />;
    case 'tree': return <TreePine className="w-4 h-4 text-white" />;
    case 'credit-card': return <CreditCard className="w-4 h-4 text-white" />;
    case 'shield': return <Shield className="w-4 h-4 text-white" />;
    case 'chef-hat': return <ChefHat className="w-5 h-5 text-white" />;
    default: return <Utensils className="w-4 h-4 text-white" />;
  }
};

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const restaurantId = parseInt(params.id);
  
  // Use the custom hook to get restaurant data and component props
  const {
    restaurant,
    loading,
    error,
    getHeroSectionProps,
    getRestaurantGalleryProps,
    getDescriptionSectionProps,
    getFeatureListProps,
    getPoliciesSectionProps,
    getReservationCardProps,
    getContactInfoProps,
    getWhatsAppProps,
    getAmenityIconType,
    getSpecialtyIconType,
    getPageMetadata
  } = useRestaurantData(restaurantId);

  useEffect(() => {
    const userData = localStorage.getItem('vextrip_user');
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Cargando restaurante...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !restaurant) {
    return (
      <ErrorState
        title={error || "Restaurante no encontrado"}
        linkHref="/gastronomia"
        linkText="Volver a restaurantes"
        className="bg-gradient-to-br from-gray-50 to-gray-100"
      />
    );
  }

  // Get all component props using the hook
  const heroSectionProps = getHeroSectionProps();
  const galleryProps = getRestaurantGalleryProps();
  const descriptionProps = getDescriptionSectionProps();
  const cuisineListProps = getFeatureListProps('cuisine');
  const amenitiesListProps = getFeatureListProps('amenities');
  const policiesProps = getPoliciesSectionProps();
  const reservationProps = getReservationCardProps();
  const contactProps = getContactInfoProps();
  const whatsappProps = getWhatsAppProps();
  const pageMetadata = getPageMetadata('restaurant');

  return (
    <>
      {pageMetadata && (
        <Head>
          <title>{pageMetadata.title}</title>
          <meta name="description" content={pageMetadata.description} />
          <meta name="keywords" content={pageMetadata.keywords.join(', ')} />
          <meta property="og:title" content={pageMetadata.title} />
          <meta property="og:description" content={pageMetadata.description} />
          <meta property="og:image" content={pageMetadata.image} />
          <meta property="og:type" content="restaurant" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageMetadata.title} />
          <meta name="twitter:description" content={pageMetadata.description} />
          <meta name="twitter:image" content={pageMetadata.image} />
        </Head>
      )}
      
      <div className="min-h-screen bg-gray-50">
        <RestaurantHero
          restaurant={heroSectionProps?.restaurant || {
            id: restaurant.id,
            name: restaurant.name,
            image: restaurant.image,
            rating: restaurant.rating,
            reviews: restaurant.reviews,
            location: `${restaurant.location.address}, ${restaurant.location.neighborhood}`,
            openHours: 'Consultar horarios',
            reservationRequired: restaurant.reservationRequired
          }}
          currentUser={currentUser}
          onScrollToReservation={scrollToReservation}
        />

        {galleryProps && (
          <RestaurantGallery {...galleryProps} />
        )}

        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {descriptionProps && (
                <DescriptionSection
                  {...descriptionProps}
                  icon={<Utensils />}
                />
              )}

              {/* Specialties */}
              {cuisineListProps && (
                <FeatureList
                  {...cuisineListProps}
                  getIcon={() => getIconComponent(getSpecialtyIconType())}
                  titleIcon={<ChefHat className="w-8 h-8 text-white" />}
                />
              )}

              {/* Menu Section */}
              <RestaurantMenu
                goToMenuPage={true}
                restaurantId={restaurant.id}
                restaurantName={restaurant.name}
              />

              {/* Amenities */}
              {amenitiesListProps && (
                <FeatureList
                  {...amenitiesListProps}
                  getIcon={(amenity: string) => getIconComponent(getAmenityIconType(amenity))}
                  titleIcon={<Utensils className="w-8 h-8 text-white" />}
                />
              )}

              {/* Policies */}
              {policiesProps && (
                <PoliciesSection {...policiesProps} />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {reservationProps && (
                <ReservationCard {...reservationProps} />
              )}

              {contactProps && (
                <ContactInfo {...contactProps} />
              )}
            </div>
          </div>
        </div>

        {whatsappProps && (
          <WhatsAppQR {...whatsappProps} />
        )}
      </div>
    </>
  );
}