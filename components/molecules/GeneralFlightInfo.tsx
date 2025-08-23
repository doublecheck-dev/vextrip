import { Plane, Clock } from 'lucide-react';

interface GeneralFlightInfoProps {
  flightCode: string;
  departure: string;
  arrival: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
}

export default function GeneralFlightInfo({
  flightCode,
  departure,
  arrival,
  duration,
  departureTime,
  arrivalTime
}: GeneralFlightInfoProps) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Plane className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium">Flight {flightCode}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock className="w-4 h-4" />
        <span>
          {departure} {departureTime} → {arrival} {arrivalTime} • Duration: {duration}
        </span>
      </div>
    </div>
  );
}
