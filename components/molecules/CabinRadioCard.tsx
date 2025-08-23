import CabinFeature from '../atoms/CabinFeature';

interface CabinOption {
  id: string;
  name: string;
  price: number;
  image: string;
  features: {
    icon: React.ReactNode;
    description: string;
  }[];
}

interface CabinRadioCardProps {
  cabin: CabinOption;
  isSelected: boolean;
  onSelect: () => void;
}

export default function CabinRadioCard({ 
  cabin, 
  isSelected, 
  onSelect 
}: CabinRadioCardProps) {
  return (
    <div
      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      {/* First row: Radio button and image */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="radio"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 text-blue-600"
          readOnly
        />
        <img
          src={cabin.image}
          alt={cabin.name}
          className="w-20 h-12 object-cover rounded"
        />
        <div className="flex-1">
          <div className="font-semibold">{cabin.name}</div>
          <div className="text-lg font-bold text-blue-600">${cabin.price}</div>
        </div>
      </div>

      {/* Second row: Features with 5px gap */}
      <div className="flex flex-col" style={{ gap: '5px' }}>
        {cabin.features.map((feature, index) => (
          <CabinFeature
            key={index}
            icon={feature.icon}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
