import CabinTag from '../atoms/CabinTag';

interface FlightInfoProps {
  flightNumber: number;
  totalFlights: number;
  departure: string;
  arrival: string;
  open: boolean;
  selectedCabin?: string;
  selectedPrice?: number;
  generalInfo?: string;
  onChangeFlightClick: () => void;
}

export default function FlightInfo({
  flightNumber,
  totalFlights,
  departure,
  arrival,
  open,
  selectedCabin,
  selectedPrice,
  generalInfo,
  onChangeFlightClick
}: FlightInfoProps) {
  return (
    <div className="flex justify-between items-start">
      {/* Left Column */}
      <div className="flex flex-col gap-1">
        <div className="text-sm text-gray-600">
          Flight {flightNumber} of {totalFlights}
        </div>
        <div className="text-lg font-semibold">
          {departure} → {arrival}
        </div>
        {open && selectedCabin ? (
          <CabinTag text={selectedCabin} />
        ) : (
          <div className="text-sm text-gray-500">
            {generalInfo || 'General flight information'}
          </div>
        )}
      </div>

      {/* Right Column - only when closed */}
      {!open && (
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-lg font-bold">
              ${selectedPrice || 0} per passenger
            </div>
          </div>
          <button
            onClick={onChangeFlightClick}
            className="text-blue-500 text-sm hover:underline"
          >
            Change flight
          </button>
        </div>
      )}
    </div>
  );
}
