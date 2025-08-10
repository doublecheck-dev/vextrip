'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import CartModal from "./CartModal";
import AddMenuItemModal from "./AddMenuItemModal";
import AddTableModal from "./AddTableModal";
import AddCategoryModal from "./AddCategoryModal";
import TableQRModal from "./TableQRModal";
import MenuHeader from "./organisms/MenuHeader";
import ManagementView from "./organisms/ManagementView";
import CategoryFilter from "./molecules/CategoryFilter";
import MenuGrid from "./organisms/MenuGrid";
import StatCard from "./atoms/StatCard";

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
                <MenuHeader
                    currentUser={currentUser}
                    showManagementView={showManagementView}
                    cartItemsCount={getTotalItems()}
                    cartTotal={getTotalPrice()}
                    onToggleManagementView={() => setShowManagementView(!showManagementView)}
                    onOpenAddItemModal={() => setIsAddItemModalOpen(true)}
                    onOpenAddTableModal={() => setIsAddTableModalOpen(true)}
                    onOpenAddCategoryModal={() => setIsAddCategoryModalOpen(true)}
                    onOpenCartModal={openCartModal}
                />

                {showManagementView && currentUser && (
                    <ManagementView
                        userTables={userTables}
                        userCategories={userCategories}
                        userSubmittedItems={userSubmittedItems}
                        onDeleteTable={deleteTable}
                        onDeleteCategory={deleteCategory}
                        onDeleteMenuItem={deleteMenuItem}
                        onShowTableQR={showTableQR}
                    />
                )}

                {/* Statistics */}
                {(userSubmittedItems.length > 0 || userTables.length > 0 || userCategories.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {userSubmittedItems.length > 0 && (
                            <StatCard
                                icon="🍽️"
                                count={userSubmittedItems.length}
                                label="platos de la comunidad"
                                bgColor="bg-green-50 border-green-200"
                                textColor="text-green-800"
                            />
                        )}
                        {userTables.length > 0 && (
                            <StatCard
                                icon="🪑"
                                count={userTables.length}
                                label="mesas configuradas"
                                bgColor="bg-blue-50 border-blue-200"
                                textColor="text-blue-800"
                            />
                        )}
                        {userCategories.length > 0 && (
                            <StatCard
                                icon="🏷️"
                                count={userCategories.length}
                                label="categorías personalizadas"
                                bgColor="bg-purple-50 border-purple-200"
                                textColor="text-purple-800"
                            />
                        )}
                    </div>
                )}

                <CategoryFilter
                    categories={dynamicMenuCategories}
                    userCategories={userCategories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

                <MenuGrid
                    items={filteredItems}
                    cart={cart}
                    userSubmittedItems={userSubmittedItems}
                    showManagementView={showManagementView}
                    currentUser={currentUser}
                    goToMenuPage={goToMenuPage}
                    restaurantId={restaurantId}
                    onAddToCart={addToCart}
                    onRemoveFromCart={removeFromCart}
                    onDeleteMenuItem={deleteMenuItem}
                />

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

            {/* Modals */}
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