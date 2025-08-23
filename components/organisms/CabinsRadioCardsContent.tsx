import GeneralFlightInfo from '../molecules/GeneralFlightInfo';
import CabinRadioCard from '../molecules/CabinRadioCard';

interface CabinOption {
  id: string;
  name: string;
  price: number;
  image: string;
  features: {
    icon: React.ReactNode;
    description: string;
  }[];
}

interface FlightDetails {
  flightCode: string;
  departure: string;
  arrival: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
}

interface CabinsRadioCardsContentProps {
  flightDetails: FlightDetails;
  cabinOptions: CabinOption[];
  selectedCabinId?: string;
  onCabinSelect: (cabinId: string) => void;
  onActionButtonClick: () => void;
  isLastFlight?: boolean;
}

export default function CabinsRadioCardsContent({
  flightDetails,
  cabinOptions,
  selectedCabinId,
  onCabinSelect,
  onActionButtonClick,
  isLastFlight = false
}: CabinsRadioCardsContentProps) {
  const getActionButtonText = () => {
    if (!selectedCabinId) return 'Skip flight';
    if (isLastFlight) return 'Confirm';
    return 'Next flight';
  };

  return (
    <div className="flex flex-col gap-2">
      {/* First row: General flight info */}
      <GeneralFlightInfo {...flightDetails} />

      {/* Second row: Cabin radio cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cabinOptions.map((cabin) => (
          <CabinRadioCard
            key={cabin.id}
            cabin={cabin}
            isSelected={selectedCabinId === cabin.id}
            onSelect={() => onCabinSelect(cabin.id)}
          />
        ))}
      </div>

      {/* Third row: Action button */}
      <button
        onClick={onActionButtonClick}
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
      >
        {getActionButtonText()}
      </button>
    </div>
  );
}
