interface StatCardProps {
  icon: string;
  count: number;
  label: string;
  bgColor: string;
  textColor: string;
}

export default function StatCard({ icon, count, label, bgColor, textColor }: StatCardProps) {
  return (
    <div className={`${bgColor} border rounded-lg p-3`}>
      <p className={`${textColor} text-sm`}>
        {icon} <strong>{count}</strong> {label}
      </p>
    </div>
  );
}
