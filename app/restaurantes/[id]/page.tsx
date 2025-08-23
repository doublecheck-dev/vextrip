'use client';
import Link from "next/link";
import { ChefHat, Shield, Wifi, Car, TreePine, CreditCard, Utensils } from "lucide-react";
import { restaurants } from "@/lib/restaurants-data";
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
import { useState, useEffect } from 'react';

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case 'wifi': return <Wifi className="w-4 h-4 text-white" />;
    case 'estacionamiento': return <Car className="w-4 h-4 text-white" />;
    case 'terraza': return <TreePine className="w-4 h-4 text-white" />;
    case 'tarjetas de crédito': return <CreditCard className="w-4 h-4 text-white" />;
    case 'seguridad': return <Shield className="w-4 h-4 text-white" />;
    default: return <Utensils className="w-4 h-4 text-white" />;
  }
};

const getSpecialtyIcon = () => <ChefHat className="w-5 h-5 text-white" />;

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const restaurant = restaurants.find(r => r.id === parseInt(params.id));

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

  if (!restaurant) {
    return (
      <ErrorState
        title="Restaurante no encontrado"
        linkHref="/gastronomia"
        linkText="Volver a restaurantes"
        className="bg-gradient-to-br from-gray-50 to-gray-100"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantHero
        restaurant={restaurant}
        currentUser={currentUser}
        onScrollToReservation={scrollToReservation}
      />

      <RestaurantGallery
        gallery={restaurant.gallery}
        restaurantName={restaurant.name}
      />

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <DescriptionSection
              title="Sobre el restaurante"
              icon={<Utensils />}
              description={restaurant.description}
              longDescription={restaurant.longDescription}
              bgColor="bg-white"
              iconColor="text-orange-500"
              titleColor="text-gray-800"
              textColor="text-gray-600"
            />

            {/* Specialties */}
            <FeatureList
              items={restaurant.specialties}
              getIcon={getSpecialtyIcon}
              title="Especialidades"
              titleIcon={<ChefHat className="w-8 h-8 text-white" />}
              bgGradient="from-orange-50 to-red-50"
              borderColor="border-orange-100"
              iconBgColor="bg-orange-500"
            />

            {/* Menu Section */}
            <RestaurantMenu
              goToMenuPage={true}
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
            />

            {/* Amenities */}
            <FeatureList
              items={restaurant.amenities}
              getIcon={getAmenityIcon}
              title="Servicios y Comodidades"
              titleIcon={<Utensils className="w-8 h-8 text-white" />}
              bgGradient="from-green-50 to-blue-50"
              borderColor="border-green-100"
              iconBgColor="bg-green-500"
            />

            {/* Policies */}
            <PoliciesSection
              policies={restaurant.policies}
              title="Políticas del Restaurante"
              bgColor="bg-white"
              bulletColor="bg-orange-500"
              textColor="text-gray-700"
              itemBgColor="bg-gray-50"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ReservationCard
              priceRange={restaurant.priceRange}
              reservationRequired={restaurant.reservationRequired}
            />

            <ContactInfo
              phone={restaurant.phone}
              email={restaurant.email}
              address={restaurant.address}
              openHours={restaurant.openHours}
              website={restaurant.website}
            />
          </div>
        </div>
      </div>

      <WhatsAppQR
        phoneNumber="+57 312 685-3970"
        message={`Hola! Me interesa hacer una reserva en ${restaurant.name}. ¿Podrían brindarme información sobre disponibilidad y el menú?`}
        businessName={`${restaurant.name} - vextrip`}
      />
    </div>
  );
}