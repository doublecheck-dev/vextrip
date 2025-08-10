import RestaurantBadge from '../atoms/RestaurantBadge';

interface HeroContentProps {
  title: string;
  subtitle: string;
  description: string;
  rating: number;
  category: string;
  showBadge?: boolean;
}

export default function HeroContent({ 
  title, 
  subtitle, 
  description, 
  rating, 
  category,
  showBadge = true 
}: HeroContentProps) {
  return (
    <div className="relative pt-16 text-center">
      <div className="max-w-5xl mx-auto px-4">
        {showBadge && (
          <RestaurantBadge rating={rating} category={category} />
        )}

        <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl leading-tight">
          {title}
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-90">
          {subtitle}
        </h2>
        <p className="text-xl md:text-2xl opacity-80 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
