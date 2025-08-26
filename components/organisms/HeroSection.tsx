import BackgroundPattern from '../molecules/BackgroundPattern';
import FloatingNavigation from '../molecules/FloatingNavigation';
import ScrollIndicator from '../atoms/ScrollIndicator';
import BackgroundImage from '../atoms/BackgroundImage';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  rating: number;
  category: string;
  backHref: string;
  backText: string;
  backgroundIcons?: string[];
  backgroundImage?: string;
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
  backgroundImage,
  showScrollIndicator = true,
  showBadge = true,
  gradientColors = "from-orange-500 to-red-500"
}: HeroSectionProps) {
  return (
    <div className="relative text-white py-32 md:py-40 lg:py-48 min-h-screen md:min-h-[80vh] overflow-hidden">
      
      {/* Background Layer */}
      {backgroundImage ? (
        <BackgroundImage
          src={backgroundImage}
          alt={title}
          overlay="black"
          overlayOpacity={40}
          priority={true}
          className="absolute inset-0"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${gradientColors} opacity-60`} />
        </BackgroundImage>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientColors}`} />
      )}
      
      <BackgroundPattern icons={backgroundIcons} />
      
      <FloatingNavigation 
        backHref={backHref}
        backText={backText}
        hideOnScroll={true}
        scrollThreshold={0.1}
        className="fixed top-8 left-6 right-auto max-w-none w-auto z-50"
      />


      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 text-center">
          <div className="space-y-8 md:space-y-12">
            {/* Category Badge */}
            {showBadge && (
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium border border-white/30">
                {category}
              </div>
            )}
            
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
              {title}
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light opacity-90 max-w-4xl mx-auto">
              {subtitle}
            </h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl lg:text-2xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
            
            {/* Decorative Line */}
            <div className="flex justify-center">
              <div className="w-32 md:w-48 h-1 bg-white/60 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
}
