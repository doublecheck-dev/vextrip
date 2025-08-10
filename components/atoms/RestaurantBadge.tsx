import { Star } from "lucide-react";

interface RestaurantBadgeProps {
  rating: number;
  category: string;
}

export default function RestaurantBadge({ rating, category }: RestaurantBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
      <Star className="w-4 h-4 text-yellow-300 fill-current" />
      <span className="text-sm font-semibold">{rating} • {category}</span>
    </div>
  );
}
