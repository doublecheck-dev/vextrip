import PolicyItem from '../molecules/PolicyItem';

interface PoliciesSectionProps {
  policies: string[];
  title?: string;
  bgColor?: string;
  bulletColor?: string;
  textColor?: string;
  itemBgColor?: string;
}

export default function PoliciesSection({ 
  policies,
  title = 'Políticas del Restaurante',
  bgColor = 'bg-white',
  bulletColor = 'bg-orange-500',
  textColor = 'text-gray-700',
  itemBgColor = 'bg-gray-50'
}: PoliciesSectionProps) {
  return (
    <section className={`${bgColor} rounded-2xl p-8 shadow-sm border border-gray-100`}>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="space-y-4">
        {policies.map((policy, idx) => (
          <PolicyItem
            key={idx}
            text={policy}
            bgColor={itemBgColor}
            bulletColor={bulletColor}
            textColor={textColor}
          />
        ))}
      </div>
    </section>
  );
}
