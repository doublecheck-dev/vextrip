interface OrderTypeSelectorProps {
  orderType: 'delivery' | 'dine-in';
  onOrderTypeChange: (type: 'delivery' | 'dine-in') => void;
}

export default function OrderTypeSelector({ orderType, onOrderTypeChange }: OrderTypeSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Tipo de pedido</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onOrderTypeChange('dine-in')}
          className={`p-4 rounded-lg border-2 transition-colors ${
            orderType === 'dine-in'
              ? 'border-orange-500 bg-orange-50 text-orange-700'
              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">🍽️</div>
            <div>
              <h4 className="font-semibold">En el restaurante</h4>
              <p className="text-sm opacity-75">Reservar mesa (Recomendado)</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onOrderTypeChange('delivery')}
          className={`p-4 rounded-lg border-2 transition-colors ${
            orderType === 'delivery'
              ? 'border-orange-500 bg-orange-50 text-orange-700'
              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚚</div>
            <div>
              <h4 className="font-semibold">Delivery</h4>
              <p className="text-sm opacity-75">Entrega a domicilio</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
