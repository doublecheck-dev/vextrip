'use client';
import { useState, useEffect } from 'react';
import { X, Plus, Upload, ChefHat, Zap } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  restaurantId: number;
  createdBy: {
    userId: number;
    userName: string;
    userEmail: string;
  };
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: number;
  restaurantName: string;
  onItemAdded?: (item: MenuItem) => void;
}

export default function AddMenuItemModal({ 
  isOpen, 
  onClose, 
  restaurantId, 
  restaurantName,
  onItemAdded 
}: AddMenuItemModalProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'principales',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const categories = [
    { id: 'entradas', name: 'Entradas' },
    { id: 'principales', name: 'Platos Principales' },
    { id: 'postres', name: 'Postres' },
    { id: 'bebidas', name: 'Bebidas' }
  ];

  const defaultImages = [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80', // Pizza
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80', // Steak
    'https://images.unsplash.com/photo-1599909533360-4fda0b011b00?auto=format&fit=crop&w=400&q=80', // Empanadas
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80', // Soup
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80', // Dessert
    'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=400&q=80', // Wine
  ];

  // Sample data for quick fill
  const sampleMenuItems = [
    {
      name: "Asado Argentino",
      description: "Cortes premium de carne a la parrilla con chimichurri, papas andinas y ensalada criolla",
      price: "5500",
      category: "principales",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Humita en Chala",
      description: "Tradicional humita mendocina envuelta en chala de maíz, con queso fresco y especias",
      price: "2200",
      category: "entradas",
      image: "https://images.unsplash.com/photo-1599909533360-4fda0b011b00?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Alfajores de Dulce de Leche",
      description: "Deliciosos alfajores artesanales rellenos de dulce de leche y bañados en chocolate",
      price: "1500",
      category: "postres",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Mate con Hierbas",
      description: "Mate tradicional servido con hierbas aromáticas de la región y acompañado de facturas",
      price: "800",
      category: "bebidas",
      image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=400&q=80"
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('vextrip_user');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageSelect = (imageUrl: string) => {
    setFormData({
      ...formData,
      image: imageUrl
    });
  };

  const saveMenuItemToStorage = (menuItem: MenuItem) => {
    try {
      const existingItems = JSON.parse(localStorage.getItem('vextrip_menu_items') || '[]');
      existingItems.push(menuItem);
      
      // Keep only last 100 items
      if (existingItems.length > 100) {
        existingItems.splice(0, existingItems.length - 100);
      }
      
      localStorage.setItem('vextrip_menu_items', JSON.stringify(existingItems));
      console.log('🍽️ Menu item saved to localStorage:', menuItem);
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setSubmitMessage('❌ Debes iniciar sesión para agregar elementos al menú');
      return;
    }

    if (!formData.name || !formData.description || !formData.price || !formData.image) {
      setSubmitMessage('❌ Por favor completa todos los campos');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setSubmitMessage('❌ El precio debe ser un número válido mayor a 0');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const newMenuItem: MenuItem = {
        id: Date.now(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: price,
        image: formData.image,
        category: formData.category,
        rating: 4.5, // Default rating for new items
        reviews: 0,
        restaurantId,
        createdBy: {
          userId: currentUser.id,
          userName: currentUser.name,
          userEmail: currentUser.email
        },
        timestamp: new Date().toISOString(),
        status: 'approved' // Auto-approve for immediate display
      };

      saveMenuItemToStorage(newMenuItem);
      
      setSubmitMessage('✅ ¡Elemento agregado exitosamente y disponible en el menú!');
      
      if (onItemAdded) {
        onItemAdded(newMenuItem);
      }

      // Reset form and close modal after delay
      setTimeout(() => {
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'principales',
          image: ''
        });
        setSubmitMessage('');
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error submitting menu item:', error);
      setSubmitMessage('❌ Error al agregar el elemento. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillSampleData = () => {
    const randomSample = sampleMenuItems[Math.floor(Math.random() * sampleMenuItems.length)];
    setFormData({
      name: randomSample.name,
      description: randomSample.description,
      price: randomSample.price,
      category: randomSample.category,
      image: randomSample.image
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <ChefHat className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Agregar Plato al Menú</h2>
            </div>
            {/* Sample Data Button */}
            <button
              onClick={fillSampleData}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
              title="Llenar con datos de ejemplo"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Datos de Ejemplo</span>
            </button>
          </div>
          <p className="opacity-90">{restaurantName}</p>
        </div>

        <div className="p-6">
          {/* User Info */}
          {currentUser ? (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <p className="text-blue-800">
                  👨‍🍳 <strong>{currentUser.name}</strong> - Tu elemento será agregado al menú inmediatamente
                </p>
                <button
                  onClick={fillSampleData}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors flex items-center gap-1 text-sm"
                >
                  <Zap className="w-3 h-3" />
                  Ejemplo
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">⚠️ Debes iniciar sesión para agregar elementos al menú</p>
            </div>
          )}

          {/* Form */}
          {currentUser && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del plato *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Bife de chorizo a la parrilla"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe los ingredientes y preparación del plato..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  required
                />
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    step="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen del plato *
                </label>
                <p className="text-xs text-gray-500 mb-3">Selecciona una imagen de muestra:</p>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {defaultImages.map((imageUrl, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleImageSelect(imageUrl)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        formData.image === imageUrl 
                          ? 'border-orange-500 ring-2 ring-orange-200'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <img src={imageUrl} alt={`Opción ${index + 1}`} className="w-full h-full object-cover" />
                      {formData.image === imageUrl && (
                        <div className="absolute inset-0 bg-orange-500 bg-opacity-20 flex items-center justify-center">
                          <div className="bg-orange-500 text-white rounded-full p-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom URL option */}
                <div>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="O ingresa una URL de imagen personalizada"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vista previa:
                  </label>
                  <div className="relative h-40 w-full rounded-lg overflow-hidden border">
                    <img src={formData.image} alt="Vista previa" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              {/* Submit Message */}
              {submitMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  submitMessage.includes('✅') 
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={fillSampleData}
                  className="flex-1 bg-gray-500 text-white py-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Llenar Ejemplo
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !currentUser}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {isSubmitting ? 'Agregando...' : 'Agregar al Menú'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
