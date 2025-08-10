import Link from "next/link";

interface ErrorStateProps {
  title: string;
  linkHref: string;
  linkText: string;
  className?: string;
}

export default function ErrorState({ 
  title, 
  linkHref, 
  linkText, 
  className = "" 
}: ErrorStateProps) {
  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
        <Link href={linkHref} className="text-green-600 hover:text-green-700">
          {linkText}
        </Link>
      </div>
    </div>
  );
}
