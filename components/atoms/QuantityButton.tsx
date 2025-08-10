import { Plus, Minus } from "lucide-react";

interface QuantityButtonProps {
  type: 'increase' | 'decrease';
  onClick: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export default function QuantityButton({ 
  type, 
  onClick, 
  disabled = false, 
  size = 'md' 
}: QuantityButtonProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4'
  };

  const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center transition-colors`;
  
  const variantClasses = type === 'increase' 
    ? 'bg-orange-500 text-white hover:bg-orange-600' 
    : 'bg-gray-200 hover:bg-gray-300';

  const Icon = type === 'increase' ? Plus : Minus;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} disabled:opacity-50`}
    >
      <Icon className={iconSizes[size]} />
    </button>
  );
}
