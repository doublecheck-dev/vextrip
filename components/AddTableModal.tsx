'use client';
import { useState } from 'react';
import { X, Users, MapPin, Save, QrCode } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  capacity: number;
  location: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  restaurantId: number;
  createdBy: {
    userId: number;
    userName: string;
    userEmail: string;
  };
  timestamp: string;
}

interface AddTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: number;
  restaurantName: string;
  onTableAdded: (table: Table) => void;
}

export default function AddTableModal({ 
  isOpen, 
  onClose, 
  restaurantId, 
  restaurantName, 
  onTableAdded 
}: AddTableModalProps) {
  const [tableData, setTableData] = useState({
    name: '',
    capacity: 2,
    location: '',
    status: 'available' as const
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showQRPreview, setShowQRPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setTableData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const saveTableToStorage = (table: Table) => {
    try {
      const existingTables = JSON.parse(localStorage.getItem('vextrip_tables') || '[]');
      existingTables.push(table);
      localStorage.setItem('vextrip_tables', JSON.stringify(existingTables));
      console.log('🪑 Table saved to localStorage:', table);
    } catch (error) {
      console.error('Error saving table:', error);
    }
  };

  const generateTableQRCode = (tableId: string, tableName: string) => {
    // Generate URL for table-specific order tracking
    const baseUrl = window.location.origin;
    const tableUrl = `${baseUrl}/restaurantes/${restaurantId}/mesa/${tableId}`;
    return tableUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tableData.name.trim()) {
      setSubmitMessage('❌ El nombre de la mesa es obligatorio');
      return;
    }

    if (tableData.capacity < 1) {
      setSubmitMessage('❌ La capacidad debe ser mayor a 0');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const currentUser = JSON.parse(localStorage.getItem('vextrip_user') || '{}');
      // Generate table ID with consistent format for filtering
      const tableId = `mesa-${restaurantId}-${Date.now()}`;
      
      const newTable: Table = {
        id: tableId,
        name: tableData.name,
        capacity: tableData.capacity,
        location: tableData.location || 'Salón principal',
        status: tableData.status,
        restaurantId,
        createdBy: {
          userId: currentUser.id || 0,
          userName: currentUser.name || 'Usuario',
          userEmail: currentUser.email || 'usuario@vextrip.com'
        },
        timestamp: new Date().toISOString()
      };

      // Generate QR code URL
      const qrCodeUrl = generateTableQRCode(tableId, tableData.name);
      (newTable as any).qrCodeUrl = qrCodeUrl;

      saveTableToStorage(newTable);
      
      // Update localStorage with new table for immediate availability
      const existingTables = JSON.parse(localStorage.getItem('vextrip_tables') || '[]');
      const updatedTables = [...existingTables];
      localStorage.setItem('vextrip_tables', JSON.stringify(updatedTables));
      
      onTableAdded(newTable);

      setSubmitMessage('✅ Mesa agregada exitosamente con código QR');
      setShowQRPreview(true);
      
      setTimeout(() => {
        onClose();
        setTableData({
          name: '',
          capacity: 2,
          location: '',
          status: 'available'
        });
        setSubmitMessage('');
        setShowQRPreview(false);
      }, 3000);

    } catch (error) {
      console.error('Error adding table:', error);
      setSubmitMessage('❌ Error al agregar la mesa');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Agregar Mesa</h2>
              <p className="opacity-90">{restaurantName}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* QR Code Info Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <QrCode className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">Código QR Automático</h4>
            </div>
            <p className="text-blue-700 text-sm">
              Se generará automáticamente un código QR único para esta mesa que permitirá a los clientes:
            </p>
            <ul className="text-blue-600 text-sm mt-2 space-y-1">
              <li>• Ver solo los pedidos de su mesa</li>
              <li>• Acceder al menú directamente</li>
              <li>• Seguir el estado de sus pedidos en tiempo real</li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la mesa *
            </label>
            <input
              type="text"
              name="name"
              value={tableData.name}
              onChange={handleInputChange}
              placeholder="Mesa 1, Mesa VIP, Terraza A..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacidad (personas) *
            </label>
            <input
              type="number"
              name="capacity"
              value={tableData.capacity}
              onChange={handleInputChange}
              min="1"
              max="20"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              name="location"
              value={tableData.location}
              onChange={handleInputChange}
              placeholder="Salón principal, Terraza, Área VIP..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado inicial
            </label>
            <select
              name="status"
              value={tableData.status}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="available">Disponible</option>
              <option value="maintenance">Mantenimiento</option>
              <option value="reserved">Reservada</option>
            </select>
          </div>

          {submitMessage && (
            <div className={`p-3 rounded-lg text-sm ${
              submitMessage.includes('✅') 
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {submitMessage}
            </div>
          )}

          {showQRPreview && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800">QR Generado</h4>
              </div>
              <p className="text-green-700 text-sm mb-3">
                Mesa creada exitosamente. El código QR estará disponible en la gestión de mesas.
              </p>
              <div className="bg-white p-3 rounded border text-center">
                <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                <p className="text-xs text-gray-600">Código QR para {tableData.name}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? 'Agregando...' : 'Agregar Mesa'}
          </button>
        </form>
      </div>
    </div>
  );
}
