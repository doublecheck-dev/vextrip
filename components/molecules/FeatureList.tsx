import IconBadge from '../atoms/IconBadge';

interface FeatureListProps {
  items: string[];
  getIcon: (item: string) => React.ReactNode;
  title: string;
  titleIcon: React.ReactNode;
  bgGradient?: string;
  borderColor?: string;
  iconBgColor?: string;
}

export default function FeatureList({
  items,
  getIcon,
  title,
  titleIcon,
  bgGradient = 'from-orange-50 to-red-50',
  borderColor = 'border-orange-100',
  iconBgColor = 'bg-orange-500'
}: FeatureListProps) {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <IconBadge icon={titleIcon} bgColor={iconBgColor} size="lg" />
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className={`flex items-center gap-4 p-4 bg-gradient-to-r ${bgGradient} rounded-xl border ${borderColor} hover:shadow-md transition-shadow`}
          >
            <IconBadge icon={getIcon(item)} bgColor={iconBgColor} />
            <span className="text-gray-800 font-medium">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
