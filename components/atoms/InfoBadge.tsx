interface InfoBadgeProps {
  icon: React.ReactNode;
  text: string;
  bgColor?: string;
  textColor?: string;
}

export default function InfoBadge({ 
  icon, 
  text, 
  bgColor = 'bg-black/30 backdrop-blur-sm',
  textColor = 'text-white' 
}: InfoBadgeProps) {
  return (
    <div className={`flex items-center gap-3 ${bgColor} px-4 py-2 rounded-lg`}>
      {icon}
      <span className={`font-medium ${textColor}`}>{text}</span>
    </div>
  );
}
