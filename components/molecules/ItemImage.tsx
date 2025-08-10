import Image from "next/image";
import { Trash2 } from "lucide-react";
import RatingBadge from '../atoms/RatingBadge';
import Badge from '../atoms/Badge';

interface ItemImageProps {
  src: string;
  alt: string;
  rating: number;
  isUserSubmitted: boolean;
  showDeleteButton: boolean;
  onDelete?: () => void;
}

export default function ItemImage({
  src,
  alt,
  rating,
  isUserSubmitted,
  showDeleteButton,
  onDelete
}: ItemImageProps) {
  return (
    <div className="relative h-48">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      
      <div className="absolute top-2 right-2">
        <RatingBadge rating={rating} />
      </div>

      {isUserSubmitted && (
        <div className="absolute top-2 left-2">
          <Badge variant="success">
            👨‍🍳 Comunidad
          </Badge>
        </div>
      )}

      {showDeleteButton && onDelete && (
        <button
          onClick={onDelete}
          className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          title="Eliminar plato"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
