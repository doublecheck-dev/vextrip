import { Plus } from "lucide-react";
import QuantityButton from '../atoms/QuantityButton';

interface QuantityControlsProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantityControls({ 
  quantity, 
  onIncrease, 
  onDecrease 
}: QuantityControlsProps) {
  if (quantity === 0) {
    return (
      <button
        onClick={onIncrease}
        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Agregar
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <QuantityButton type="decrease" onClick={onDecrease} />
      <span className="font-medium w-8 text-center">{quantity}</span>
      <QuantityButton type="increase" onClick={onIncrease} />
    </div>
  );
}
