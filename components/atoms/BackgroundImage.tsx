import Image from "next/image";
import { useState } from "react";

interface BackgroundImageProps {
  src: string;
  alt: string;
  overlay?: string;
  overlayOpacity?: number;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function BackgroundImage({
  src,
  alt,
  overlay = "black",
  overlayOpacity = 50,
  priority = false,
  className = "",
  children
}: BackgroundImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log('BackgroundImage attempting to load:', src); // Debug log

  return (
    <div className={`${className}`}>
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          onError={(e) => {
            console.error('Image failed to load:', src, e);
            setImageError(true);
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', src);
            setImageLoaded(true);
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <p className="text-white text-sm">Image failed to load</p>
        </div>
      )}
      
      {overlay && (imageLoaded || imageError) && (
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: overlay === 'black' 
              ? `rgba(0,0,0,${overlayOpacity / 100})` 
              : `rgba(255,255,255,${overlayOpacity / 100})` 
          }}
        />
      )}
      {children}
    </div>
  );
}
