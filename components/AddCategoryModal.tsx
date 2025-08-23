'use client';
import { useState } from 'react';
import { X, Tag, Save, Palette } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  restaurantId: number;
  createdBy: {
    userId: number;
    userName: string;
    userEmail: string;
  };
  timestamp: string;
}

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: number;
  restaurantName: string;
  onCategoryAdded: (category: Category) => void;
}

export default function AddCategoryModal({ 
  isOpen, 
  onClose, 
  restaurantId, 
  restaurantName, 
  onCategoryAdded 
}: AddCategoryModalProps) {
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    icon: '🍽️',
    color: '#f97316'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const predefinedIcons = ['🍽️', '🥗', '🍖', '🍕', '🍜', '🥘', '🍰', '🍷', '🥤', '☕', '🍔', '🌮'];
  const predefinedColors = [
    '#f97316', '#ef4444', '#10b981', '#3b82f6', 
    '#8b5cf6', '#f59e0b', '#06b6d4', '#84cc16',
    '#f43f5e', '#6366f1', '#14b8a6', '#a855f7'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveCategoryToStorage = (category: Category) => {
    try {
      const existingCategories = JSON.parse(localStorage.getItem('vextrip_categories') || '[]');
      existingCategories.push(category);
      localStorage.setItem('vextrip_categories', JSON.stringify(existingCategories));
      console.log('🏷️ Category saved to localStorage:', category);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryData.name.trim()) {
      setSubmitMessage('❌ El nombre de la categoría es obligatorio');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const currentUser = JSON.parse(localStorage.getItem('vextrip_user') || '{}');
      
      const newCategory: Category = {
        id: `category_${restaurantId}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: categoryData.name,
        description: categoryData.description,
        icon: categoryData.icon,
        color: categoryData.color,
        restaurantId,
        createdBy: {
          userId: currentUser.id || 0,
          userName: currentUser.name || 'Usuario',
          userEmail: currentUser.email || 'usuario@vextrip.com'
        },
        timestamp: new Date().toISOString()
      };

      saveCategoryToStorage(newCategory);
      onCategoryAdded(newCategory);

      setSubmitMessage('✅ Categoría agregada exitosamente');
      
      setTimeout(() => {
        onClose();
        setCategoryData({
          name: '',
          description: '',
          icon: '🍽️',
          color: '#f97316'
        });
        setSubmitMessage('');
      }, 1500);

    } catch (error) {
      console.error('Error adding category:', error);
      setSubmitMessage('❌ Error al agregar la categoría');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Tag className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Agregar Categoría</h2>
              <p className="opacity-90">{restaurantName}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la categoría *
            </label>
            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={handleInputChange}
              placeholder="Entradas especiales, Parrilla premium..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={categoryData.description}
              onChange={handleInputChange}
              placeholder="Describe qué tipo de platos incluye esta categoría..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icono
            </label>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {predefinedIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setCategoryData(prev => ({ ...prev, icon }))}
                  className={`p-3 text-2xl rounded-lg border-2 transition-colors ${
                    categoryData.icon === icon
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <input
              type="text"
              name="icon"
              value={categoryData.icon}
              onChange={handleInputChange}
              placeholder="O escribe un emoji personalizado"
              className="w-full p-2 border border-gray-300 rounded-lg text-center"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setCategoryData(prev => ({ ...prev, color }))}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    categoryData.color === color
                      ? 'border-gray-800 scale-110'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <input
              type="color"
              name="color"
              value={categoryData.color}
              onChange={handleInputChange}
              className="w-full h-12 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Vista previa:</h4>
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium"
              style={{ backgroundColor: categoryData.color }}
            >
              <span>{categoryData.icon}</span>
              <span>{categoryData.name || 'Nombre de categoría'}</span>
            </div>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? 'Agregando...' : 'Agregar Categoría'}
          </button>
        </form>
      </div>
    </div>
  );
}
