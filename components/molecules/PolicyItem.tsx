import PolicyBullet from '../atoms/PolicyBullet';

interface PolicyItemProps {
  text: string;
  bgColor?: string;
  bulletColor?: string;
  textColor?: string;
}

export default function PolicyItem({ 
  text, 
  bgColor = 'bg-gray-50',
  bulletColor = 'bg-orange-500',
  textColor = 'text-gray-700'
}: PolicyItemProps) {
  return (
    <div className={`flex items-start gap-4 p-4 ${bgColor} rounded-xl`}>
      <PolicyBullet bgColor={bulletColor} />
      <span className={`${textColor} leading-relaxed`}>{text}</span>
    </div>
  );
}
