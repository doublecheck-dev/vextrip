interface ContentTextProps {
  primaryText: string;
  secondaryText?: string;
  textColor?: string;
  primarySize?: 'sm' | 'md' | 'lg';
  secondarySize?: 'sm' | 'md' | 'lg';
  spacing?: string;
}

export default function ContentText({ 
  primaryText, 
  secondaryText,
  textColor = 'text-gray-600',
  primarySize = 'lg',
  secondarySize = 'md',
  spacing = 'mb-6'
}: ContentTextProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="prose prose-gray max-w-none">
      <p className={`${textColor} leading-relaxed ${sizeClasses[primarySize]} ${spacing}`}>
        {primaryText}
      </p>
      {secondaryText && (
        <p className={`${textColor} leading-relaxed ${sizeClasses[secondarySize]}`}>
          {secondaryText}
        </p>
      )}
    </div>
  );
}
