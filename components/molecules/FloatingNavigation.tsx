import { useState, useEffect } from 'react';
import BackButton from '../atoms/BackButton';

interface FloatingNavigationProps {
  backHref: string;
  backText: string;
  children?: React.ReactNode;
  hideOnScroll?: boolean;
  scrollThreshold?: number;
  className?: string;
}

export default function FloatingNavigation({ 
  backHref, 
  backText, 
  children,
  hideOnScroll = false,
  scrollThreshold = 20,
  className = ""
}: FloatingNavigationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldHide = scrollY > scrollThreshold;
      setIsVisible(!shouldHide);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnScroll, scrollThreshold]);

  return (
    <div className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/20 to-transparent transition-opacity duration-300 ${
      hideOnScroll && !isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
    } ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <BackButton href={backHref}>
            {backText}
          </BackButton>
          {children}
        </div>
      </div>
    </div>
  );
}
