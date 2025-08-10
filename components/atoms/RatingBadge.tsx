import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function RatingBadge({ rating, size = 'sm' }: RatingBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-1 ${sizeClasses[size]}`}>
      <Star className={`${iconSizes[size]} text-yellow-400 fill-current`} />
      <span className="font-medium">{rating}</span>
    </div>
  );
}
