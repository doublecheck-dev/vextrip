import { Utensils, ChefHat } from "lucide-react";
import HeroButton from '../atoms/HeroButton';

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
    <div className="flex flex-wrap gap-4">
      <HeroButton
        href={`/restaurantes/${restaurantId}/menu`}
        variant="primary"
        icon={<Utensils className="w-5 h-5" />}
      >
        Ver Menú Completo
      </HeroButton>
      
      <HeroButton
        onClick={onScrollToReservation}
        variant="secondary"
      >
        {reservationRequired ? '🍽️ Reservar Mesa' : '📞 Consultar Disponibilidad'}
      </HeroButton>
      
      {currentUser && (
        <HeroButton
          href={`/restaurantes/${restaurantId}/kitchen`}
          variant="accent"
          size="md"
          icon={<ChefHat className="w-5 h-5" />}
        >
          <span className="hidden sm:inline">Dashboard Cocina</span>
          <span className="sm:hidden">Cocina</span>
        </HeroButton>
      )}
    </div>
  );
}
