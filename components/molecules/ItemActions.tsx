import Link from "next/link";
import QuantityControls from './QuantityControls';

interface ItemActionsProps {
  goToMenuPage?: boolean;
  restaurantId: number;
  cartQuantity: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

export default function ItemActions({
  goToMenuPage,
  restaurantId,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart
}: ItemActionsProps) {
  if (goToMenuPage) {
    return (
      <Link 
        href={`/restaurantes/${restaurantId}/menu`}
        className="text-sm text-orange-500 hover:underline"
      >
        Ver Menú Completo
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <QuantityControls
        quantity={cartQuantity}
        onIncrease={onAddToCart}
        onDecrease={onRemoveFromCart}
      />
    </div>
  );
}
