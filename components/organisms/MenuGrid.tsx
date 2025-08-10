import MenuItemCard from '../molecules/MenuItemCard';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

interface MenuGridProps {
  items: MenuItem[];
  cart: { [key: string]: number };
  userSubmittedItems: MenuItem[];
  showManagementView: boolean;
  currentUser: any;
  goToMenuPage?: boolean;
  restaurantId: number;
  onAddToCart: (itemId: number) => void;
  onRemoveFromCart: (itemId: number) => void;
  onDeleteMenuItem: (itemId: number) => void;
}

export default function MenuGrid({
  items,
  cart,
  userSubmittedItems,
  showManagementView,
  currentUser,
  goToMenuPage,
  restaurantId,
  onAddToCart,
  onRemoveFromCart,
  onDeleteMenuItem
}: MenuGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          cartQuantity={cart[item.id] || 0}
          isUserSubmitted={userSubmittedItems.some(userItem => userItem.id === item.id)}
          showManagementView={showManagementView && !!currentUser}
          goToMenuPage={goToMenuPage}
          restaurantId={restaurantId}
          onAddToCart={() => onAddToCart(item.id)}
          onRemoveFromCart={() => onRemoveFromCart(item.id)}
          onDeleteItem={userSubmittedItems.some(userItem => userItem.id === item.id) 
            ? () => onDeleteMenuItem(item.id) 
            : undefined}
        />
      ))}
    </div>
  );
}
