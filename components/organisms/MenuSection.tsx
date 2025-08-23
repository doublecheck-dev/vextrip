import { Users } from "lucide-react";
import RestaurantMenu from '../RestaurantMenu';
import IconBadge from '../atoms/IconBadge';

interface MenuSectionProps {
  restaurantId: number;
  restaurantName: string;
  tableId: string;
  tableName: string;
  title?: string;
  subtitle?: string;
  bgColor?: string;
  borderColor?: string;
}

export default function MenuSection({ 
  restaurantId, 
  restaurantName, 
  tableId, 
  tableName,
  title = "Menú del Restaurante",
  subtitle,
  bgColor = "bg-white",
  borderColor = "border-gray-200"
}: MenuSectionProps) {
  const defaultSubtitle = `Haz tu pedido directamente desde ${tableName}`;

  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm border ${borderColor}`}>
      <div className="flex items-center gap-3 mb-6">
        <IconBadge 
          icon={<Users className="w-6 h-6 text-orange-600" />}
          bgColor="bg-orange-100"
          size="lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600">{subtitle || defaultSubtitle}</p>
        </div>
      </div>
      
      <RestaurantMenu
        goToMenuPage={false}
        restaurantId={restaurantId}
        restaurantName={restaurantName}
        tableId={tableId}
        tableName={tableName}
      />
    </div>
  );
}
