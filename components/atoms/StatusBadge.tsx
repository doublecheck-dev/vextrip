interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, children, size = 'md' }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'confirmed': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'preparing': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'delivered': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1'
  };

  return (
    <span className={`${getStatusColor(status)} ${sizeClasses[size]} rounded-full border`}>
      {children}
    </span>
  );
}
