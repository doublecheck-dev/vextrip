import IconBadge from '../atoms/IconBadge';

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href?: string;
  bgColor?: string;
  onClick?: () => void;
}

export default function ContactItem({
  icon,
  title,
  subtitle,
  href,
  bgColor,
  onClick
}: ContactItemProps) {
  const content = (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
      <IconBadge 
        icon={icon} 
        bgColor={bgColor}
        size="lg"
      />
      <div>
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  return content;
}
