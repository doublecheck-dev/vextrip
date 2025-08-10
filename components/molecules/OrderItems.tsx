import { ChevronDown, ChevronUp } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderItemsProps {
  items: OrderItem[];
  isExpanded: boolean;
  onToggleExpansion: () => void;
  totalPrice: number;
  userComments?: string;
  tableNumber?: string;
  tableFilter?: string;
  notes?: string;
}

export default function OrderItems({
  items,
  isExpanded,
  onToggleExpansion,
  totalPrice,
  userComments,
  tableNumber,
  tableFilter,
  notes
}: OrderItemsProps) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">
          Productos ({totalQuantity})
        </p>
        <button
          onClick={onToggleExpansion}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          {isExpanded ? (
            <>
              <span>Ocultar</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Ver detalles</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {isExpanded ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-12 h-12 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=100&q=80';
                }}
              />
              <div className="flex-1">
                <h5 className="font-medium text-gray-800">{item.name}</h5>
                <p className="text-sm text-gray-600">
                  ${item.price} × {item.quantity} = ${item.price * item.quantity}
                </p>
              </div>
              <div className="text-right">
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {item.quantity}
                </span>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-center font-semibold">
              <span>Total del pedido:</span>
              <span className="text-lg">${totalPrice}</span>
            </div>
          </div>

          {(notes && (userComments || tableFilter)) && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              {userComments && (
                <p className="text-sm text-blue-800 mb-2">
                  <strong>💬 Comentarios del cliente:</strong> {userComments}
                </p>
              )}
              {tableFilter && notes.includes('Duración estimada') && (
                <p className="text-xs text-blue-600 mt-1">
                  ⏱️ {notes.match(/Duración estimada: (\d+) minutos/)?.[0]}
                </p>
              )}
              {tableNumber && (
                <p className="text-xs text-blue-600 mt-1">
                  🍽️ Mesa: #{tableNumber}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm space-y-1">
          {items.slice(0, 2).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="opacity-75">{item.quantity}x {item.name}</span>
              <span className="font-medium">${item.price * item.quantity}</span>
            </div>
          ))}
          {items.length > 2 && (
            <p className="opacity-50 text-center">
              +{items.length - 2} productos más...
            </p>
          )}
        </div>
      )}
    </div>
  );
}
