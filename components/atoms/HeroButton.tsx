import Link from "next/link";

interface HeroButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function HeroButton({
  href,
  onClick,
  variant = 'primary',
  size = 'lg',
  icon,
  children,
  className = ''
}: HeroButtonProps) {
  const baseClasses = "font-bold rounded-xl transition-colors shadow-xl flex items-center gap-2";
  
  const variantClasses = {
    primary: 'bg-white text-gray-900 hover:bg-gray-100 border-2 border-white/20',
    secondary: 'bg-orange-500/90 backdrop-blur-sm text-white hover:bg-orange-600 border border-orange-400/30',
    accent: 'bg-orange-500/90 backdrop-blur-md text-white hover:bg-orange-600 border border-orange-400/30 shadow-lg'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {content}
    </button>
  );
}
