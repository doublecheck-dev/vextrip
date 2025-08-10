import ItemImage from "./ItemImage";
import ItemInfo from "./ItemInfo";
import ItemActions from "./ItemActions";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

interface MenuItemCardProps {
  item: MenuItem;
  cartQuantity: number;
  isUserSubmitted: boolean;
  showManagementView: boolean;
  goToMenuPage?: boolean;
  restaurantId: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onDeleteItem?: () => void;
}

export default function MenuItemCard({
  item,
  cartQuantity,
  isUserSubmitted,
  showManagementView,
  goToMenuPage,
  restaurantId,
  onAddToCart,
  onRemoveFromCart,
  onDeleteItem
}: MenuItemCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <ItemImage
        src={item.image}
        alt={item.name}
        rating={item.rating}
        isUserSubmitted={isUserSubmitted}
        showDeleteButton={showManagementView && isUserSubmitted}
        onDelete={onDeleteItem}
      />

      <div className="p-4">
        <ItemInfo
          name={item.name}
          description={item.description}
          price={item.price}
          reviews={item.reviews}
        />

        <div className="flex justify-between items-center mt-3">
          <div /> {/* Spacer for layout */}
          <ItemActions
            goToMenuPage={goToMenuPage}
            restaurantId={restaurantId}
            cartQuantity={cartQuantity}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
          />
        </div>
      </div>
    </div>
  );
}
