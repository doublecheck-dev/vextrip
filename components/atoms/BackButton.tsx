import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function BackButton({ href, children, className = "" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 text-white hover:text-gray-200 transition-colors bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 hover:bg-black/40 ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-semibold">{children}</span>
    </Link>
  );
}
