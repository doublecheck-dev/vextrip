'use client';
import Image from "next/image";
import { Star, Plus, Minus, ShoppingCart, ChefHat, Table, Eye, Trash2, QrCode } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import CartModal from "./CartModal";
import AddMenuItemModal from "./AddMenuItemModal";
import AddTableModal from "./AddTableModal";
import AddCategoryModal from "./AddCategoryModal";
import TableQRModal from "./TableQRModal";

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    restaurantId?: number;
    createdBy?: {
        userId: number;
        userName: string;
        userEmail: string;
    };
    timestamp?: string;
    status?: string;
}

interface MenuCategory {
    id: string;
    name: string;
    count: number;
}

interface RestaurantMenuProps {
    restaurantId: number;
    restaurantName: string;
    goToMenuPage?: boolean; // Optional prop to control navigation
    tableId?: string;
    tableName?: string; // Optional prop for table name
}

export default function RestaurantMenu({ 
    restaurantId, 
    restaurantName, 
    goToMenuPage,
    tableId,
    tableName 
}: RestaurantMenuProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [userSubmittedItems, setUserSubmittedItems] = useState<MenuItem[]>([]);
    const [userTables, setUserTables] = useState<any[]>([]);
    const [userCategories, setUserCategories] = useState<any[]>([]);
    const [orderStatusKey, setOrderStatusKey] = useState(0); // Force re-render of status dashboard
    const [showManagementView, setShowManagementView] = useState(false);
    const [selectedTableForQR, setSelectedTableForQR] = useState<any>(null);
    const [isTableQRModalOpen, setIsTableQRModalOpen] = useState(false);

    // Mock menu data - in a real app, this would come from props or API
    const menuCategories: MenuCategory[] = [
        { id: 'all', name: 'Todos', count: 24 },
        { id: 'entradas', name: 'Entradas', count: 6 },
        { id: 'principales', name: 'Platos Principales', count: 8 },
        { id: 'postres', name: 'Postres', count: 4 },
        { id: 'bebidas', name: 'Bebidas', count: 6 }
    ];

    const menuItems: MenuItem[] = [
        {
            id: 1,
            name: "Empanadas Mendocinas",
            description: "Tradicionales empanadas rellenas de carne cortada a cuchillo, aceitunas y huevo duro",
            price: 1200,
            image: "https://images.unsplash.com/photo-1599909533360-4fda0b011b00?auto=format&fit=crop&w=400&q=80",
            category: 'entradas',
            rating: 4.5,
            reviews: 23
        },
        {
            id: 2,
            name: "Bife de Chorizo",
            description: "Jugoso bife de chorizo a la parrilla acompañado de papas españolas y ensalada mixta",
            price: 4500,
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
            category: 'principales',
            rating: 4.8,
            reviews: 41
        },
        {
            id: 3,
            name: "Locro Mendocino",
            description: "Tradicional locro con zapallo, porotos, maíz y carne, ideal para compartir",
            price: 3200,
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80",
            category: 'principales',
            rating: 4.6,
            reviews: 18
        },
        {
            id: 4,
            name: "Flan Casero",
            description: "Cremoso flan casero con dulce de leche y crema chantilly",
            price: 1800,
            image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80",
            category: 'postres',
            rating: 4.7,
            reviews: 32
        },
        {
            id: 5,
            name: "Vino Malbec Reserva",
            description: "Excelente Malbec de la región, cosecha 2020, notas frutales y especiadas",
            price: 2800,
            image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=400&q=80",
            category: 'bebidas',
            rating: 4.9,
            reviews: 15
        },
        {
            id: 6,
            name: "Provoleta a la Parrilla",
            description: "Queso provolone grillado con oregano, aceite de oliva y tostadas",
            price: 2200,
            image: "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=400&q=80",
            category: 'entradas',
            rating: 4.4,
            reviews: 27
        }
    ];

    // Load user and user-submitted items
    useEffect(() => {
        const userData = localStorage.getItem('tourex_user');
        if (userData) {
            try {
                setCurrentUser(JSON.parse(userData));
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }

        // Initialize storage with mock data if empty
        initializeMockDataInStorage();

        // Load user-submitted menu items
        loadUserSubmittedItems();
        loadUserTables();
        loadUserCategories();
    }, []);

    const initializeMockDataInStorage = () => {
        try {
            const existingItems = localStorage.getItem('tourex_menu_items');

            // If no items exist or empty array, initialize with mock data for this restaurant
            if (!existingItems || JSON.parse(existingItems).length === 0) {
                const mockMenuItems = [
                    {
                        id: 101 + restaurantId,
                        name: "Asado Argentino Premium",
                        description: "Selección de cortes premium: bife de chorizo, entraña y morcilla, acompañado de chimichurri casero",
                        price: 6500,
                        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
                        category: 'principales',
                        rating: 4.9,
                        reviews: 156,
                        restaurantId,
                        createdBy: {
                            userId: 0,
                            userName: "Chef Martín",
                            userEmail: "chef@tourex.com"
                        },
                        timestamp: new Date().toISOString(),
                        status: 'approved'
                    },
                    {
                        id: 102 + restaurantId,
                        name: "Humita en Chala",
                        description: "Tradicional humita mendocina envuelta en chala, con queso fresco de cabra y especias aromáticas",
                        price: 2800,
                        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=400&q=80",
                        category: 'entradas',
                        rating: 4.6,
                        reviews: 89,
                        restaurantId,
                        createdBy: {
                            userId: 0,
                            userName: "Chef Martín",
                            userEmail: "chef@tourex.com"
                        },
                        timestamp: new Date().toISOString(),
                        status: 'approved'
                    },
                    {
                        id: 103 + restaurantId,
                        name: "Alfajores Artesanales",
                        description: "Deliciosos alfajores caseros con dulce de leche regional y baño de chocolate semi-amargo",
                        price: 1800,
                        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
                        category: 'postres',
                        rating: 4.8,
                        reviews: 203,
                        restaurantId,
                        createdBy: {
                            userId: 0,
                            userName: "Chef Martín",
                            userEmail: "chef@tourex.com"
                        },
                        timestamp: new Date().toISOString(),
                        status: 'approved'
                    },
                    {
                        id: 104 + restaurantId,
                        name: "Torrontés Mendocino",
                        description: "Vino blanco aromático de la región, cosecha 2023, notas florales y cítricas",
                        price: 3200,
                        image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=400&q=80",
                        category: 'bebidas',
                        rating: 4.7,
                        reviews: 78,
                        restaurantId,
                        createdBy: {
                            userId: 0,
                            userName: "Chef Martín",
                            userEmail: "chef@tourex.com"
                        },
                        timestamp: new Date().toISOString(),
                        status: 'approved'
                    }
                ];

                // Save to storage
                localStorage.setItem('tourex_menu_items', JSON.stringify(mockMenuItems));
                console.log(`🍽️ Mock menu items initialized for restaurant ${restaurantId}:`, mockMenuItems.length);

                // Immediately load the new items
                setUserSubmittedItems(mockMenuItems);
            } else {
                // Check if this restaurant has any items
                const allItems = JSON.parse(existingItems);
                const restaurantItems = allItems.filter((item: any) => item.restaurantId === restaurantId);

                if (restaurantItems.length === 0) {
                    // Add mock items for this specific restaurant
                    const mockItems = [
                        {
                            id: 101 + restaurantId,
                            name: "Especialidad del Chef",
                            description: "Plato único creado especialmente para este restaurante con ingredientes locales",
                            price: 4500,
                            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80",
                            category: 'principales',
                            rating: 4.8,
                            reviews: 45,
                            restaurantId,
                            createdBy: {
                                userId: 0,
                                userName: "Chef Local",
                                userEmail: "chef@local.com"
                            },
                            timestamp: new Date().toISOString(),
                            status: 'approved'
                        }
                    ];

                    const updatedItems = [...allItems, ...mockItems];
                    localStorage.setItem('tourex_menu_items', JSON.stringify(updatedItems));
                    setUserSubmittedItems(mockItems);
                    console.log(`🍽️ Added mock items for restaurant ${restaurantId}`);
                }
            }
        } catch (error) {
            console.error('Error initializing mock data:', error);
        }
    };

    const loadUserSubmittedItems = () => {
        try {
            const allSubmittedItems = JSON.parse(localStorage.getItem('tourex_menu_items') || '[]');
            const restaurantItems = allSubmittedItems.filter(
                (item: any) => item.restaurantId === restaurantId && item.status === 'approved'
            );
            setUserSubmittedItems(restaurantItems);

            console.log(`📋 Loaded ${restaurantItems.length} items from storage for restaurant ${restaurantId}`);
            console.log('📊 Storage contains total items:', allSubmittedItems.length);
        } catch (error) {
            console.error('Error loading user-submitted items:', error);
        }
    };

    const loadUserTables = () => {
        try {
            const allTables = JSON.parse(localStorage.getItem('tourex_tables') || '[]');
            const restaurantTables = allTables.filter(
                (table: any) => table.restaurantId === restaurantId
            );
            setUserTables(restaurantTables);
            console.log(`🪑 Loaded ${restaurantTables.length} tables for restaurant ${restaurantId}`);
        } catch (error) {
            console.error('Error loading tables:', error);
        }
    };

    const loadUserCategories = () => {
        try {
            const allCategories = JSON.parse(localStorage.getItem('tourex_categories') || '[]');
            const restaurantCategories = allCategories.filter(
                (category: any) => category.restaurantId === restaurantId
            );
            setUserCategories(restaurantCategories);
            console.log(`🏷️ Loaded ${restaurantCategories.length} categories for restaurant ${restaurantId}`);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    const deleteMenuItem = (itemId: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este plato?')) {
            try {
                const allItems = JSON.parse(localStorage.getItem('tourex_menu_items') || '[]');
                const updatedItems = allItems.filter((item: any) => item.id !== itemId);
                localStorage.setItem('tourex_menu_items', JSON.stringify(updatedItems));
                loadUserSubmittedItems();
                console.log('🗑️ Menu item deleted:', itemId);
            } catch (error) {
                console.error('Error deleting menu item:', error);
            }
        }
    };

    const deleteTable = (tableId: string) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta mesa?')) {
            try {
                const allTables = JSON.parse(localStorage.getItem('tourex_tables') || '[]');
                const updatedTables = allTables.filter((table: any) => table.id !== tableId);
                localStorage.setItem('tourex_tables', JSON.stringify(updatedTables));
                loadUserTables();
                console.log('🗑️ Table deleted:', tableId);
            } catch (error) {
                console.error('Error deleting table:', error);
            }
        }
    };

    const deleteCategory = (categoryId: string) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            try {
                const allCategories = JSON.parse(localStorage.getItem('tourex_categories') || '[]');
                const updatedCategories = allCategories.filter((category: any) => category.id !== categoryId);
                localStorage.setItem('tourex_categories', JSON.stringify(updatedCategories));
                loadUserCategories();
                console.log('🗑️ Category deleted:', categoryId);
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const showTableQR = (table: any) => {
        setSelectedTableForQR(table);
        setIsTableQRModalOpen(true);
    };

    // Combine default menu items with user-submitted items
    const allMenuItems = [...menuItems, ...userSubmittedItems];

    // Update category counts dynamically based on all items
    const updateCategoryCounts = () => {
        // Combine default categories with user categories
        const allCategories = [
            ...menuCategories,
            ...userCategories.map(cat => ({
                id: cat.id,
                name: cat.name,
                count: allMenuItems.filter(item => item.category === cat.id).length
            }))
        ];

        const counts = {
            all: allMenuItems.length,
            entradas: allMenuItems.filter(item => item.category === 'entradas').length,
            principales: allMenuItems.filter(item => item.category === 'principales').length,
            postres: allMenuItems.filter(item => item.category === 'postres').length,
            bebidas: allMenuItems.filter(item => item.category === 'bebidas').length
        };

        return [
            { id: 'all', name: 'Todos', count: counts.all },
            { id: 'entradas', name: 'Entradas', count: counts.entradas },
            { id: 'principales', name: 'Platos Principales', count: counts.principales },
            { id: 'postres', name: 'Postres', count: counts.postres },
            { id: 'bebidas', name: 'Bebidas', count: counts.bebidas },
            ...userCategories.map(cat => ({
                id: cat.id,
                name: cat.name,
                count: allMenuItems.filter(item => item.category === cat.id).length
            }))
        ];
    };

    const filteredItems = selectedCategory === 'all'
        ? allMenuItems
        : allMenuItems.filter(item => item.category === selectedCategory);

    const addToCart = (itemId: number) => {
        setCart(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const removeFromCart = (itemId: number) => {
        setCart(prev => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
        }));
    };

    const clearCart = () => {
        setCart({});
    };

    const openCartModal = () => {
        setIsCartModalOpen(true);
    };

    const closeCartModal = () => {
        setIsCartModalOpen(false);
    };

    const openAddItemModal = () => {
        setIsAddItemModalOpen(true);
    };

    const closeAddItemModal = () => {
        setIsAddItemModalOpen(false);
    };

    const handleItemAdded = (newItem: MenuItem) => {
        // Refresh user-submitted items and show success message
        loadUserSubmittedItems();
        console.log('🍽️ New menu item added successfully:', newItem.name);
    };

    const addQuickMenuItem = () => {
        if (!currentUser) return;

        // Open the AddMenuItemModal instead of directly adding an item
        setIsAddItemModalOpen(true);
    };

    const getTotalItems = () => {
        return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    };

    const getTotalPrice = () => {
        return Object.entries(cart).reduce((total, [itemId, quantity]) => {
            const item = allMenuItems.find(item => item.id === parseInt(itemId));
            return total + (item ? item.price * quantity : 0);
        }, 0);
    };

    const handleOrderCreated = () => {
        // Force refresh of order status dashboard
        setOrderStatusKey(prev => prev + 1);
        console.log('📋 Order created, refreshing status dashboard');
    };

    const handleTableAdded = (table: any) => {
        loadUserTables();
        console.log('🪑 New table added:', table.name);
    };

    const handleCategoryAdded = (category: any) => {
        loadUserCategories();
        console.log('🏷️ New category added:', category.name);
    };

    // Use dynamic category counts
    const dynamicMenuCategories = updateCategoryCounts();

    return (
        <>
            <section className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Nuestro Menú</h2>
                    <div className="flex items-center gap-3">
                        {/* Management buttons for logged users */}
                        {currentUser && (
                            <>
                                <button
                                    onClick={() => setShowManagementView(!showManagementView)}
                                    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                                        showManagementView 
                                            ? 'bg-gray-500 text-white hover:bg-gray-600' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    title="Ver modo administración"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                        {showManagementView ? 'Ocultar Admin' : 'Ver Admin'}
                                    </span>
                                </button>

                                <button
                                    onClick={() => setIsAddItemModalOpen(true)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition-colors"
                                    title="Agregar nuevo plato al menú"
                                >
                                    <ChefHat className="w-4 h-4" />
                                    <span className="hidden sm:inline">Agregar Menú</span>
                                </button>
                                
                                <button
                                    onClick={() => setIsAddTableModalOpen(true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors"
                                    title="Agregar mesa"
                                >
                                    <Table className="w-4 h-4" />
                                    <span className="hidden sm:inline">Agregar Mesa</span>
                                </button>

                                <button
                                    onClick={() => setIsAddCategoryModalOpen(true)}
                                    className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-purple-600 transition-colors"
                                    title="Agregar categoría"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="hidden sm:inline">Agregar Categoría</span>
                                </button>
                            </>
                        )}

                        {/* Cart Button */}
                        {getTotalItems() > 0 && (
                            <button
                                onClick={openCartModal}
                                className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-600 transition-colors"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span>{getTotalItems()} items - ${getTotalPrice()}</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Management View */}
                {showManagementView && currentUser && (
                    <div className="mb-8 space-y-6">
                        {/* Tables Management */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                                <Table className="w-5 h-5" />
                                Gestión de Mesas ({userTables.length})
                            </h3>
                            {userTables.length > 0 ? (
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
                                                    onClick={() => deleteTable(table.id)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                    title="Eliminar mesa"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex gap-2 mt-3">
                                                <button
                                                    onClick={() => showTableQR(table)}
                                                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-xs hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                                                >
                                                    <QrCode className="w-3 h-3" />
                                                    Ver QR
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-blue-600 text-sm">No hay mesas configuradas</p>
                            )}
                        </div>

                        {/* Categories Management */}
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Gestión de Categorías ({userCategories.length})
                            </h3>
                            {userCategories.length > 0 ? (
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
                                                onClick={() => deleteCategory(category.id)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                                title="Eliminar categoría"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-purple-600 text-sm">No hay categorías personalizadas</p>
                            )}
                        </div>

                        {/* Menu Items Management */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                                <ChefHat className="w-5 h-5" />
                                Gestión de Platos de la Comunidad ({userSubmittedItems.length})
                            </h3>
                            {userSubmittedItems.length > 0 ? (
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
                                                        Por: {(item as any).createdBy?.userName || 'Usuario'}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteMenuItem(item.id)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                                title="Eliminar plato"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-green-600 text-sm">No hay platos de la comunidad</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Show statistics */}
                {(userSubmittedItems.length > 0 || userTables.length > 0 || userCategories.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {userSubmittedItems.length > 0 && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                <p className="text-green-800 text-sm">
                                    🍽️ <strong>{userSubmittedItems.length}</strong> platos de la comunidad
                                </p>
                            </div>
                        )}
                        {userTables.length > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-blue-800 text-sm">
                                    🪑 <strong>{userTables.length}</strong> mesas configuradas
                                </p>
                            </div>
                        )}
                        {userCategories.length > 0 && (
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                <p className="text-purple-800 text-sm">
                                    🏷️ <strong>{userCategories.length}</strong> categorías personalizadas
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Category Filter - Enhanced with user categories */}
                <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
                    {dynamicMenuCategories.map((category) => {
                        const userCategory = userCategories.find(cat => cat.id === category.id);
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                                    selectedCategory === category.id
                                        ? userCategory 
                                            ? 'text-white border-2 border-opacity-50'
                                            : 'bg-orange-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                style={userCategory && selectedCategory === category.id ? {
                                    backgroundColor: userCategory.color,
                                    borderColor: userCategory.color
                                } : {}}
                            >
                                {userCategory && <span>{userCategory.icon}</span>}
                                {category.name} ({category.count})
                            </button>
                        );
                    })}
                </div>

                {/* Menu Items Grid - Enhanced with delete option in management view */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-48">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    <span className="text-xs font-medium">{item.rating}</span>
                                </div>

                                {/* Show if item was user-submitted */}
                                {userSubmittedItems.some(userItem => userItem.id === item.id) && (
                                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        👨‍🍳 Comunidad
                                    </div>
                                )}

                                {/* Delete button in management view */}
                                {showManagementView && currentUser && userSubmittedItems.some(userItem => userItem.id === item.id) && (
                                    <button
                                        onClick={() => deleteMenuItem(item.id)}
                                        className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                        title="Eliminar plato"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 mb-2">{item.name}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-xl font-bold text-orange-600">${item.price}</span>
                                        <div className="text-xs text-gray-500">
                                            {item.reviews} reseñas
                                        </div>
                                    </div>

                                    {goToMenuPage ? (
                                        <Link href={`/restaurantes/${restaurantId}/menu`}
                                            className="text-sm text-orange-500 hover:underline">
                                            Ver Menú Completo
                                        </Link>
                                    ) :

                                        <div className="flex items-center gap-2">
                                            {cart[item.id] > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-medium w-8 text-center">{cart[item.id]}</span>
                                                    <button
                                                        onClick={() => addToCart(item.id)}
                                                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => addToCart(item.id)}
                                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Agregar
                                                </button>
                                            )}
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View Full Menu Button */}
                <div className="text-center mt-8">
                    {goToMenuPage ? (
                        <Link
                            href={`/restaurantes/${restaurantId}/menu`}
                            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Ver Menú Completo
                        </Link>
                    ) : (
                        <button
                            onClick={openCartModal}
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Ver Carrito ({getTotalItems()})
                        </button>
                    )}
                </div>
            </section>

            {/* Cart Modal */}
            <CartModal
                isOpen={isCartModalOpen}
                onClose={closeCartModal}
                cart={cart}
                menuItems={allMenuItems}
                restaurantId={restaurantId}
                restaurantName={restaurantName}
                onClearCart={clearCart}
                tableId={tableId}
                tableName={tableName}
                onOrderCreated={(orderId: string) => {
                    console.log('Order created in menu:', orderId);
                }}
            />

            {/* Add Menu Item Modal */}
            <AddMenuItemModal
                isOpen={isAddItemModalOpen}
                onClose={closeAddItemModal}
                restaurantId={restaurantId}
                restaurantName={restaurantName}
                onItemAdded={handleItemAdded}
            />

            {/* Add Table Modal */}
            <AddTableModal
                isOpen={isAddTableModalOpen}
                onClose={() => setIsAddTableModalOpen(false)}
                restaurantId={restaurantId}
                restaurantName={restaurantName}
                onTableAdded={handleTableAdded}
            />

            {/* Add Category Modal */}
            <AddCategoryModal
                isOpen={isAddCategoryModalOpen}
                onClose={() => setIsAddCategoryModalOpen(false)}
                restaurantId={restaurantId}
                restaurantName={restaurantName}
                onCategoryAdded={handleCategoryAdded}
            />

            {/* Table QR Modal */}
            <TableQRModal
                isOpen={isTableQRModalOpen}
                onClose={() => {
                    setIsTableQRModalOpen(false);
                    setSelectedTableForQR(null);
                }}
                table={selectedTableForQR}
                restaurantName={restaurantName}
            />
        </>
    );
}
