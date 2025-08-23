import { Star } from "lucide-react";

interface FloatingRatingBadgeProps {
  rating: number;
  reviews: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export default function FloatingRatingBadge({ 
  rating, 
  reviews,
  position = 'top-right' 
}: FloatingRatingBadgeProps) {
  const positionClasses = {
    'top-right': 'top-24 right-6',
    'top-left': 'top-24 left-6',
    'bottom-right': 'bottom-24 right-6',
    'bottom-left': 'bottom-24 left-6'
  };

  return (
    <div className={`absolute ${positionClasses[position]} bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-2xl border border-white/50`}>
      <div className="flex items-center gap-3">
        <Star className="w-6 h-6 text-yellow-500 fill-current" />
        <div>
          <span className="font-bold text-gray-800 text-lg">{rating}</span>
          <span className="text-gray-600 text-sm ml-1">({reviews} reseñas)</span>
        </div>
      </div>
    </div>
  );
}
