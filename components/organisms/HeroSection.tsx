import BackgroundPattern from '../molecules/BackgroundPattern';
import FloatingNavigation from '../molecules/FloatingNavigation';
import HeroContent from '../molecules/HeroContent';
import ScrollIndicator from '../atoms/ScrollIndicator';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  rating: number;
  category: string;
  backHref: string;
  backText: string;
  backgroundIcons?: string[];
  showScrollIndicator?: boolean;
  showBadge?: boolean;
  gradientColors?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  rating,
  category,
  backHref,
  backText,
  backgroundIcons,
  showScrollIndicator = true,
  showBadge = true,
  gradientColors = "from-orange-500 to-red-500"
}: HeroSectionProps) {
  return (
    <div className={`relative bg-gradient-to-r ${gradientColors} text-white py-20 md:py-24 overflow-hidden`}>
      <BackgroundPattern icons={backgroundIcons} />
      
      <FloatingNavigation 
        backHref={backHref}
        backText={backText}
      />

      <HeroContent
        title={title}
        subtitle={subtitle}
        description={description}
        rating={rating}
        category={category}
        showBadge={showBadge}
      />

      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
}
