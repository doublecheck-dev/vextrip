import { Eye, ChefHat, Table, Plus, ShoppingCart } from "lucide-react";
import ActionButton from '../atoms/ActionButton';

interface MenuHeaderProps {
  currentUser: any;
  showManagementView: boolean;
  cartItemsCount: number;
  cartTotal: number;
  onToggleManagementView: () => void;
  onOpenAddItemModal: () => void;
  onOpenAddTableModal: () => void;
  onOpenAddCategoryModal: () => void;
  onOpenCartModal: () => void;
}

export default function MenuHeader({
  currentUser,
  showManagementView,
  cartItemsCount,
  cartTotal,
  onToggleManagementView,
  onOpenAddItemModal,
  onOpenAddTableModal,
  onOpenAddCategoryModal,
  onOpenCartModal
}: MenuHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Nuestro Menú</h2>
      <div className="flex items-center gap-3">
        {currentUser && (
          <>
            <ActionButton
              onClick={onToggleManagementView}
              icon={<Eye className="w-4 h-4" />}
              variant={showManagementView ? 'danger' : 'secondary'}
              title="Ver modo administración"
            >
              {showManagementView ? 'Ocultar Admin' : 'Ver Admin'}
            </ActionButton>

            <ActionButton
              onClick={onOpenAddItemModal}
              icon={<ChefHat className="w-4 h-4" />}
              variant="success"
              title="Agregar nuevo plato al menú"
            >
              Agregar Menú
            </ActionButton>
            
            <ActionButton
              onClick={onOpenAddTableModal}
              icon={<Table className="w-4 h-4" />}
              variant="warning"
              title="Agregar mesa"
            >
              Agregar Mesa
            </ActionButton>

            <ActionButton
              onClick={onOpenAddCategoryModal}
              icon={<Plus className="w-4 h-4" />}
              variant="secondary"
              className="bg-purple-500 text-white hover:bg-purple-600"
              title="Agregar categoría"
            >
              Agregar Categoría
            </ActionButton>
          </>
        )}

        {cartItemsCount > 0 && (
          <ActionButton
            onClick={onOpenCartModal}
            icon={<ShoppingCart className="w-4 h-4" />}
            variant="primary"
          >
            {cartItemsCount} items - ${cartTotal}
          </ActionButton>
        )}
      </div>
    </div>
  );
}
