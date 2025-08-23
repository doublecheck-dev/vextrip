interface CabinFeatureProps {
  icon: React.ReactNode;
  description: string;
}

export default function CabinFeature({ icon, description }: CabinFeatureProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600">{icon}</span>
      <span className="text-sm text-gray-700">{description}</span>
    </div>
  );
}
