import SectionHeader from '../atoms/SectionHeader';
import ContentText from '../molecules/ContentText';

interface DescriptionSectionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  longDescription?: string;
  bgColor?: string;
  iconColor?: string;
  titleColor?: string;
  textColor?: string;
}

export default function DescriptionSection({ 
  title,
  icon,
  description,
  longDescription,
  bgColor = 'bg-white',
  iconColor = 'text-orange-500',
  titleColor = 'text-gray-800',
  textColor = 'text-gray-600'
}: DescriptionSectionProps) {
  return (
    <section className={`${bgColor} rounded-2xl p-8 shadow-sm border border-gray-100`}>
      <SectionHeader 
        title={title}
        icon={icon}
        iconColor={iconColor}
        titleColor={titleColor}
      />
      
      <ContentText
        primaryText={description}
        secondaryText={longDescription}
        textColor={textColor}
        primarySize="lg"
        secondarySize="md"
      />
    </section>
  );
}
