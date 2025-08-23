import React from 'react';

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  iconColor?: string;
  titleColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SectionHeader({ 
  title, 
  icon, 
  iconColor = 'text-orange-500',
  titleColor = 'text-gray-800',
  size = 'lg'
}: SectionHeaderProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8'
  };

  return (
    <h2 className={`${sizeClasses[size]} font-bold ${titleColor} mb-6 flex items-center gap-3`}>
      <span className={`${iconColor} ${iconSizes[size]}`}>
        {icon}
      </span>
      {title}
    </h2>
  );
}
