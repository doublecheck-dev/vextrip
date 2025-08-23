interface CabinTagProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

export default function CabinTag({ 
  text, 
  bgColor = 'bg-blue-500', 
  textColor = 'text-white' 
}: CabinTagProps) {
  return (
    <span className={`${bgColor} ${textColor} px-2 py-1 rounded text-xs font-medium`}>
      {text}
    </span>
  );
}
