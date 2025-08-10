import { Table, Plus, ChefHat, QrCode, Trash2 } from "lucide-react";
import ManagementCard from '../molecules/ManagementCard';

interface ManagementViewProps {
  userTables: any[];
  userCategories: any[];
  userSubmittedItems: any[];
  onDeleteTable: (tableId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onDeleteMenuItem: (itemId: number) => void;
  onShowTableQR: (table: any) => void;
}

export default function ManagementView({
  userTables,
  userCategories,
  userSubmittedItems,
  onDeleteTable,
  onDeleteCategory,
  onDeleteMenuItem,
  onShowTableQR
}: ManagementViewProps) {
  return (
    <div className="mb-8 space-y-6">
      {/* Tables Management */}
      <ManagementCard
        title="Gestión de Mesas"
        icon={<Table className="w-5 h-5" />}
        bgColor="bg-blue-50 border-blue-200"
        textColor="text-blue-800"
        count={userTables.length}
        emptyMessage="No hay mesas configuradas"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {userTables.map((table) => (
            <div key={table.id} className="bg-white p-3 rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-800">{table.name}</p>
                  <p className="text-sm text-gray-600">
                    {table.capacity} personas • {table.location}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    table.status === 'available' ? 'bg-green-100 text-green-800' :
                    table.status === 'occupied' ? 'bg-red-100 text-red-800' :
                    table.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {table.status}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteTable(table.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Eliminar mesa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onShowTableQR(table)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-xs hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                >
                  <QrCode className="w-3 h-3" />
                  Ver QR
                </button>
              </div>
            </div>
          ))}
        </div>
      </ManagementCard>

      {/* Categories Management */}
      <ManagementCard
        title="Gestión de Categorías"
        icon={<Plus className="w-5 h-5" />}
        bgColor="bg-purple-50 border-purple-200"
        textColor="text-purple-800"
        count={userCategories.length}
        emptyMessage="No hay categorías personalizadas"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {userCategories.map((category) => (
            <div key={category.id} className="bg-white p-3 rounded-lg border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              <button
                onClick={() => onDeleteCategory(category.id)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Eliminar categoría"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </ManagementCard>

      {/* Menu Items Management */}
      <ManagementCard
        title="Gestión de Platos de la Comunidad"
        icon={<ChefHat className="w-5 h-5" />}
        bgColor="bg-green-50 border-green-200"
        textColor="text-green-800"
        count={userSubmittedItems.length}
        emptyMessage="No hay platos de la comunidad"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {userSubmittedItems.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-lg border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">${item.price} • {item.category}</p>
                  <p className="text-xs text-gray-500">
                    Por: {item.createdBy?.userName || 'Usuario'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDeleteMenuItem(item.id)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Eliminar plato"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </ManagementCard>
    </div>
  );
}
