import { ChefHat } from 'lucide-react';

interface OrderActionsProps {
  orderId: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  isFocused: boolean;
  onDismissFocus: () => void;
}

export default function OrderActions({ orderId, status, isFocused, onDismissFocus }: OrderActionsProps) {
  if (!isFocused || status !== 'confirmed') return null;

  return (
    <div className="mt-4 flex gap-2">
      <button 
        onClick={onDismissFocus}
        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-semibold"
      >
        <ChefHat className="w-4 h-4" />
        Iniciar Preparación
      </button>
      <button 
        onClick={onDismissFocus}
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
      >
        Marcar como Visto
      </button>
    </div>
  );
}
