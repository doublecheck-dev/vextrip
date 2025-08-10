import { Trash2 } from 'lucide-react';

interface ManagementCardProps {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  count: number;
  children: React.ReactNode;
  emptyMessage: string;
}

export default function ManagementCard({
  title,
  icon,
  bgColor,
  textColor,
  count,
  children,
  emptyMessage
}: ManagementCardProps) {
  return (
    <div className={`${bgColor} border rounded-lg p-4`}>
      <h3 className={`text-lg font-bold ${textColor} mb-3 flex items-center gap-2`}>
        {icon}
        {title} ({count})
      </h3>
      {count > 0 ? children : <p className={`${textColor} text-sm`}>{emptyMessage}</p>}
    </div>
  );
}
