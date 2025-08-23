import { Users } from "lucide-react";
import TableInfo from '../molecules/TableInfo';

interface TableHeaderProps {
  tableName: string;
  restaurantName: string;
  capacity: number;
  location: string;
  bgGradient?: string;
}

export default function TableHeader({ 
  tableName, 
  restaurantName, 
  capacity, 
  location,
  bgGradient = "from-blue-500 to-purple-500"
}: TableHeaderProps) {
  return (
    <div className={`bg-gradient-to-r ${bgGradient} text-white py-8`}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-8 h-8" />
          <h1 className="text-4xl font-bold">{tableName}</h1>
        </div>
        <p className="text-xl opacity-90 mb-2">{restaurantName}</p>
        <TableInfo capacity={capacity} location={location} />
      </div>
    </div>
  );
}
