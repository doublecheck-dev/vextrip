interface PolicyBulletProps {
  bgColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PolicyBullet({ 
  bgColor = 'bg-orange-500', 
  size = 'md' 
}: PolicyBulletProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  return (
    <div className={`${bgColor} rounded-full flex items-center justify-center mt-1 ${sizeClasses[size]}`}>
      <div className={`bg-white rounded-full ${dotSizes[size]}`} />
    </div>
  );
}
