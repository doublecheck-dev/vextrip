interface IconBadgeProps {
  icon: React.ReactNode;
  bgColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function IconBadge({ 
  icon, 
  bgColor = 'bg-orange-500', 
  size = 'md' 
}: IconBadgeProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${bgColor} rounded-full flex items-center justify-center ${sizeClasses[size]}`}>
      {icon}
    </div>
  );
}
