import { Users, MapPin } from "lucide-react";
import InfoBadge from '../atoms/InfoBadge';

interface TableInfoProps {
  capacity: number;
  location: string;
}

export default function TableInfo({ capacity, location }: TableInfoProps) {
  return (
    <div className="flex items-center justify-center gap-6 text-lg">
      <InfoBadge 
        icon={<Users className="w-5 h-5" />}
        text={`Capacidad: ${capacity} personas`}
      />
      <InfoBadge 
        icon={<MapPin className="w-5 h-5" />}
        text={location}
      />
    </div>
  );
}
