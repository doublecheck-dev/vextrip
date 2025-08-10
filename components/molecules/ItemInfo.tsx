interface ItemInfoProps {
  name: string;
  description: string;
  price: number;
  reviews: number;
}

export default function ItemInfo({ name, description, price, reviews }: ItemInfoProps) {
  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
      <div>
        <span className="text-xl font-bold text-orange-600">${price}</span>
        <div className="text-xs text-gray-500">
          {reviews} reseñas
        </div>
      </div>
    </div>
  );
}
