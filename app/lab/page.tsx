'use client';
import { useState } from 'react';
import { Wifi, Coffee, Monitor, Utensils, Bed, Users } from 'lucide-react';
import FlightInfo from '@/components/molecules/FlightInfo';
import CabinsRadioCardsContent from '@/components/organisms/CabinsRadioCardsContent';

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

interface CabinsRadioCardsProps {
  open: boolean;
  flightNumber: number;
  totalFlights: number;
  departure: string;
  arrival: string;
  selectedCabinId?: string;
  onCabinSelect: (cabinId: string) => void;
  onChangeFlightClick: () => void;
  onActionButtonClick: () => void;
  isLastFlight?: boolean;
}

function CabinsRadioCards({
  open,
  flightNumber,
  totalFlights,
  departure,
  arrival,
  selectedCabinId,
  onCabinSelect,
  onChangeFlightClick,
  onActionButtonClick,
  isLastFlight = false
}: CabinsRadioCardsProps) {
  // Mock data
  const cabinOptions: CabinOption[] = [
    {
      id: 'economy',
      name: 'Economy',
      price: 299,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=100&fit=crop',
      features: [
        { icon: <Users className="w-4 h-4" />, description: '3-3-3 seating' },
        { icon: <Monitor className="w-4 h-4" />, description: 'Personal entertainment' },
        { icon: <Utensils className="w-4 h-4" />, description: 'Meal included' }
      ]
    },
    {
      id: 'premium',
      name: 'Premium Economy',
      price: 599,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=100&fit=crop',
      features: [
        { icon: <Users className="w-4 h-4" />, description: '2-4-2 seating' },
        { icon: <Wifi className="w-4 h-4" />, description: 'Free WiFi' },
        { icon: <Coffee className="w-4 h-4" />, description: 'Premium dining' },
        { icon: <Monitor className="w-4 h-4" />, description: 'Larger screen' }
      ]
    },
    {
      id: 'business',
      name: 'Business Class',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1583222412976-5d2e6d5dd81e?w=200&h=100&fit=crop',
      features: [
        { icon: <Bed className="w-4 h-4" />, description: 'Lie-flat seats' },
        { icon: <Wifi className="w-4 h-4" />, description: 'Free WiFi' },
        { icon: <Utensils className="w-4 h-4" />, description: 'Gourmet meals' },
        { icon: <Coffee className="w-4 h-4" />, description: 'Premium lounge access' }
      ]
    }
  ];

  const selectedCabin = cabinOptions.find(cabin => cabin.id === selectedCabinId);

  const flightDetails = {
    flightCode: 'AA1234',
    departure,
    arrival,
    duration: '4h 15m',
    departureTime: '10:30 AM',
    arrivalTime: '2:45 PM'
  };

  return (
    <div className="flex flex-col gap-2">
      {/* First row: FlightInfo */}
      <FlightInfo
        flightNumber={flightNumber}
        totalFlights={totalFlights}
        departure={departure}
        arrival={arrival}
        open={open}
        selectedCabin={selectedCabin?.name}
        selectedPrice={selectedCabin?.price}
        generalInfo="Flight AA1234 • 4h 15m duration"
        onChangeFlightClick={onChangeFlightClick}
      />

      {/* Second row: CabinsRadioCardsContent (only when open) */}
      {open && (
        <CabinsRadioCardsContent
          flightDetails={flightDetails}
          cabinOptions={cabinOptions}
          selectedCabinId={selectedCabinId}
          onCabinSelect={onCabinSelect}
          onActionButtonClick={onActionButtonClick}
          isLastFlight={isLastFlight}
        />
      )}
    </div>
  );
}

// Example usage
export default function LabPage() {
  const [open, setOpen] = useState(true);
  const [selectedCabinId, setSelectedCabinId] = useState<string>();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Flight Cabin Selection</h1>
      
      <div className="space-y-6">
        <CabinsRadioCards
          open={open}
          flightNumber={1}
          totalFlights={2}
          departure="NYC"
          arrival="LAX"
          selectedCabinId={selectedCabinId}
          onCabinSelect={setSelectedCabinId}
          onChangeFlightClick={() => console.log('Change flight clicked')}
          onActionButtonClick={() => console.log('Action button clicked')}
          isLastFlight={false}
        />

        <button
          onClick={() => setOpen(!open)}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Toggle {open ? 'Close' : 'Open'}
        </button>
      </div>
    </div>
  );
}
