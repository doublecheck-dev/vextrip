interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemsListProps {
  cartItems: CartItem[];
  totalPrice: number;
}

export default function CartItemsList({ cartItems, totalPrice }: CartItemsListProps) {
  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Productos ({cartItems.length})</h3>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-800">{item.name}</h4>
            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-orange-600">${item.price * item.quantity}</p>
            <p className="text-xs text-gray-500">${item.price} c/u</p>
          </div>
        </div>
      ))}

      <div className="border-t pt-4">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total:</span>
          <span className="text-orange-600">${totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
