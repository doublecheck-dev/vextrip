import BackButton from '../atoms/BackButton';

interface FloatingNavigationProps {
  backHref: string;
  backText: string;
  children?: React.ReactNode;
}

export default function FloatingNavigation({ 
  backHref, 
  backText, 
  children 
}: FloatingNavigationProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/20 to-transparent">
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
