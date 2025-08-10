import { Clock, CheckCircle, ChefHat } from 'lucide-react';

interface StatusIconProps {
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusIcon({ status, size = 'md' }: StatusIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconClass = sizeClasses[size];

  switch (status) {
    case 'pending':
      return <Clock className={`${iconClass} text-yellow-600`} />;
    case 'confirmed':
      return <CheckCircle className={`${iconClass} text-blue-600`} />;
    case 'preparing':
      return <ChefHat className={`${iconClass} text-orange-600`} />;
    case 'delivered':
      return <CheckCircle className={`${iconClass} text-green-600`} />;
    default:
      return <Clock className={`${iconClass} text-gray-600`} />;
  }
}
