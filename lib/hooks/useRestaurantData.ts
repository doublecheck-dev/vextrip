import { useState, useEffect } from 'react';
import { Restaurant } from '../database/models';
import { DataService } from '../services/data-service';

export function useRestaurantData(restaurantId: number) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const restaurantData = DataService.getRestaurantById(restaurantId);
        
        if (!restaurantData) {
          setError('Restaurante no encontrado');
          return;
        }
        
        setRestaurant(restaurantData);
      } catch (err) {
        setError('Error al cargar los datos del restaurante');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  // Component data getters
  const getHeroSectionProps = () => {
    if (!restaurant) return null;
    return DataService.getHeroSectionData(restaurant.id);
  };

  const getFloatingNavigationProps = (backHref: string, backText: string) => {
    return DataService.getFloatingNavigationData(backHref, backText);
  };

  const getFloatingRatingBadgeProps = () => {
    if (!restaurant) return null;
    return DataService.getFloatingRatingBadgeData(restaurant);
  };

  const getHeroInfoProps = () => {
    if (!restaurant) return null;
    return DataService.getHeroInfoData(restaurant);
  };

  const getHeroActionsProps = (currentUser: any) => {
    if (!restaurant) return null;
    return DataService.getHeroActionsData(restaurant, currentUser);
  };

  const getPageMetadata = (pageType: string) => {
    if (!restaurant) return null;
    return DataService.getPageMetadata(restaurant, pageType);
  };

  const getRestaurantGalleryProps = () => {
    if (!restaurant) return null;
    return DataService.getRestaurantGalleryData(restaurant);
  };

  const getDescriptionSectionProps = () => {
    if (!restaurant) return null;
    return DataService.getDescriptionSectionData(restaurant);
  };

  const getFeatureListProps = (type: 'cuisine' | 'amenities') => {
    if (!restaurant) return null;
    return DataService.getFeatureListData(restaurant, type);
  };

  const getPoliciesSectionProps = () => {
    return DataService.getPoliciesSectionData();
  };

  const getReservationCardProps = () => {
    if (!restaurant) return null;
    return DataService.getReservationCardData(restaurant);
  };

  const getContactInfoProps = () => {
    if (!restaurant) return null;
    return DataService.getContactInfoData(restaurant);
  };

  const getWhatsAppProps = () => {
    if (!restaurant) return null;
    return DataService.getWhatsAppData(restaurant);
  };

  const getAmenityIconType = (amenity: string) => {
    return DataService.getAmenityIconType(amenity);
  };

  const getSpecialtyIconType = () => {
    return DataService.getSpecialtyIconType();
  };

  return {
    restaurant,
    loading,
    error,
    getHeroSectionProps,
    getFloatingNavigationProps,
    getFloatingRatingBadgeProps,
    getHeroInfoProps,
    getHeroActionsProps,
    getPageMetadata,
    getRestaurantGalleryProps,
    getDescriptionSectionProps,
    getFeatureListProps,
    getPoliciesSectionProps,
    getReservationCardProps,
    getContactInfoProps,
    getWhatsAppProps,
    getAmenityIconType,
    getSpecialtyIconType
  };
}
