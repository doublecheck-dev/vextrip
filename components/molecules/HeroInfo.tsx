import { MapPin, Clock } from "lucide-react";
import InfoBadge from '../atoms/InfoBadge';

interface HeroInfoProps {
  location: string;
  openHours: string;
}

export default function HeroInfo({ location, openHours }: HeroInfoProps) {
  return (
    <div className="flex flex-wrap items-center gap-8 text-lg mb-8">
      <InfoBadge 
        icon={<MapPin className="w-5 h-5" />}
        text={location}
      />
      <InfoBadge 
        icon={<Clock className="w-5 h-5" />}
        text={openHours}
      />
    </div>
  );
}
