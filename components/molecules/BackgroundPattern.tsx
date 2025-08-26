interface BackgroundPatternProps {
  icons?: string[];
  opacity?: number;
}

export default function BackgroundPattern({ 
  icons = ['🍽️', '🥘', '🍜', '🍕'], 
  opacity = 10 
}: BackgroundPatternProps) {
  const positions = [
    'top-40 left-10 text-6xl',
    'top-40 right-20 text-4xl',
    'bottom-20 left-1/4 text-5xl',
    'bottom-40 right-1/3 text-3xl'
  ];

  return (
    <div className={`absolute inset-0 opacity-${opacity}`}>
      {icons.map((icon, index) => (
        <div 
          key={index}
          className={`absolute ${positions[index % positions.length]}`}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}
