'use client';
import { useState, useEffect } from 'react';
import { X, ShoppingCart, CreditCard } from 'lucide-react';
import UserInfoSection from './molecules/UserInfoSection';
import OrderTypeSelector from './molecules/OrderTypeSelector';
import CartItemsList from './molecules/CartItemsList';
import DeliveryForm from './organisms/DeliveryForm';
import DineInForm from './organisms/DineInForm';
import FormTextarea from './atoms/FormTextarea';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartOrder {
    id: string;
    userId: number;
    userName: string;
    userEmail: string;
    restaurantId: number;
    restaurantName: string;
    items: CartItem[];
    totalPrice: number;
    deliveryInfo: {
        address: string;
        phone: string;
        date: string;
        time: string;
        notes: string;
        tableId: string; 
    };
    status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
    timestamp: string;
}

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: { [key: string]: number };
    menuItems: any[];
    restaurantId: number;
    restaurantName: string;
    onClearCart: () => void;
    onOrderCreated?: (orderId: string) => void;
    tableId?: string;
    tableName?: string;
}

export default function CartModal({
    isOpen,
    onClose,
    cart,
    menuItems,
    restaurantId,
    restaurantName,
    onClearCart,
    onOrderCreated,
    tableId,
    tableName
}: CartModalProps) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [orderType, setOrderType] = useState<'delivery' | 'dine-in'>('dine-in'); // Changed default to dine-in
    const [deliveryInfo, setDeliveryInfo] = useState({
        address: '',
        phone: '',
        date: '',
        time: '',
        notes: '',
        tableId: '' // Added tableId for dine-in orders
    });
    const [guestInfo, setGuestInfo] = useState({
        name: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [selectedTable, setSelectedTable] = useState('');
    const [dinnerDuration, setDinnerDuration] = useState('30');
    const [availableTables, setAvailableTables] = useState<any[]>([]);

    // Load available tables from storage
    useEffect(() => {
        if (isOpen) {
            loadAvailableTables();
        }
    }, [isOpen, restaurantId]);

    const loadAvailableTables = () => {
        try {
            const allTables = JSON.parse(localStorage.getItem('vextrip_tables') || '[]');
            const restaurantTables = allTables.filter(
                (table: any) => table.restaurantId === restaurantId && table.status === 'available'
            );

            // If tableId is provided (from table page), find the actual table data
            if (tableId && tableName) {
                const foundTable = allTables.find((table: any) => table.id === tableId);
                if (foundTable) {
                    // Ensure capacity has a fallback value
                    const tableWithCapacity = {
                        ...foundTable,
                        capacity: foundTable.capacity || 4
                    };
                    setAvailableTables([tableWithCapacity]);
                    setSelectedTable(tableId);
                } else {
                    // Fallback with provided data
                    const specificTable = { 
                        id: tableId, 
                        name: tableName, 
                        capacity: 4,
                        location: 'Mesa asignada' 
                    };
                    setAvailableTables([specificTable]);
                    setSelectedTable(tableId);
                }
                return;
            }

            // Add default tables if none exist
            if (restaurantTables.length === 0) {
                const defaultTables = [
                    { id: 'mesa-1', name: 'Mesa 1 (2 personas)', capacity: 2 },
                    { id: 'mesa-2', name: 'Mesa 2 (4 personas)', capacity: 4 },
                    { id: 'mesa-3', name: 'Mesa 3 (6 personas)', capacity: 6 },
                    { id: 'mesa-4', name: 'Mesa 4 (8 personas)', capacity: 8 },
                    { id: 'mesa-5', name: 'Mesa VIP (10 personas)', capacity: 10 }
                ];
                setAvailableTables(defaultTables);
                setSelectedTable(defaultTables[0].id);
            } else {
                // Ensure all restaurant tables have capacity fallback
                const tablesWithCapacity = restaurantTables.map((table: any) => ({
                    ...table,
                    capacity: table.capacity || 4
                }));
                setAvailableTables(tablesWithCapacity);
                setSelectedTable(tablesWithCapacity[0].id);
            }
        } catch (error) {
            console.error('Error loading tables:', error);
            // Fallback behavior
            if (tableId && tableName) {
                const fallbackTable = { 
                    id: tableId, 
                    name: tableName, 
                    capacity: 4, 
                    location: 'Assigned' 
                };
                setAvailableTables([fallbackTable]);
                setSelectedTable(tableId);
            } else {
                const fallbackTables = [
                    { id: 'mesa-1', name: 'Mesa 1 (2 personas)', capacity: 2 },
                    { id: 'mesa-2', name: 'Mesa 2 (4 personas)', capacity: 4 }
                ];
                setAvailableTables(fallbackTables);
                setSelectedTable(fallbackTables[0].id);
            }
        }
    };

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

    const cartItems: CartItem[] = Object.entries(cart)
        .filter(([itemId, quantity]) => quantity > 0)
        .map(([itemId, quantity]) => {
            const item = menuItems.find(item => item.id === parseInt(itemId));
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity,
                image: item.image
            };
        });

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDeliveryInfo({
            ...deliveryInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDeliveryInfo({
            ...deliveryInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleGuestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuestInfo({
            ...guestInfo,
            [e.target.name]: e.target.value
        });
    };

    const saveOrderToStorage = (order: CartOrder) => {
        try {
            const existingOrders = JSON.parse(localStorage.getItem('vextrip_orders') || '[]');
            existingOrders.push(order);

            // Keep only last 50 orders
            if (existingOrders.length > 50) {
                existingOrders.splice(0, existingOrders.length - 50);
            }

            localStorage.setItem('vextrip_orders', JSON.stringify(existingOrders));
            console.log('📦 Order saved to localStorage:', order);
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            setSubmitMessage('❌ El carrito está vacío');
            return;
        }

        // Check required fields based on order type
        if (orderType === 'delivery') {
            if (!deliveryInfo.address || !deliveryInfo.phone || !deliveryInfo.date || !deliveryInfo.time) {
                setSubmitMessage('❌ Por favor completa todos los campos obligatorios');
                return;
            }
        } else {
            if (!selectedTable) {
                setSubmitMessage('❌ Por favor selecciona una mesa para tu reserva');
                return;
            }
        }

        // For guest users, check name and email
        if (!currentUser && (!guestInfo.name || !guestInfo.email)) {
            setSubmitMessage('❌ Por favor completa tu nombre y email');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const selectedTableInfo = availableTables.find(t => t.id === selectedTable);
            const tableNumber = selectedTableInfo?.name.match(/\d+/)?.[0] || selectedTable.replace(/mesa-.*-/, '').replace('mesa-', '');

            const order: CartOrder = {
                id: orderId,
                userId: currentUser ? currentUser.id : 0,
                userName: currentUser ? currentUser.name : guestInfo.name,
                userEmail: currentUser ? currentUser.email : guestInfo.email,
                restaurantId,
                restaurantName,
                items: cartItems,
                totalPrice,
                deliveryInfo: orderType === 'delivery' ? {
                    ...deliveryInfo,
                    tableId: ''
                } : {
                    address: `${restaurantName} - ${selectedTableInfo?.name || 'Mesa'} - TableRef: ${selectedTable}`,
                    phone: 'Reserva en restaurante',
                    date: new Date().toISOString().split('T')[0],
                    time: 'Inmediato',
                    notes: `Mesa reservada | Mesa #${tableNumber} | Duración estimada: ${dinnerDuration} minutos | Table ID: ${selectedTable} | TableRef: ${selectedTable} | Mesa Numero: ${tableNumber} | Comentarios: ${deliveryInfo.notes || 'Sin comentarios'}`,
                    tableId: selectedTable // Store the complete table ID
                },
                status: 'pending',
                timestamp: new Date().toISOString()
            };

            console.log('💾 Saving order with table ID:', selectedTable);
            console.log('📋 Order details:', {
                tableId: order.deliveryInfo.tableId,
                address: order.deliveryInfo.address,
                notes: order.deliveryInfo.notes
            });

            saveOrderToStorage(order);

            const successMessage = orderType === 'delivery'
                ? '✅ ¡Pedido de delivery realizado exitosamente! Te contactaremos pronto.'
                : '✅ ¡Reserva confirmada! Te esperamos en el restaurante.';

            setSubmitMessage(successMessage);

            // Notify parent component about new order with orderId
            if (onOrderCreated) {
                onOrderCreated(orderId);
            }

            // Trigger focus on OrderStatusDashboard
            setTimeout(() => {
                // Scroll to order status dashboard
                const orderDashboard = document.querySelector('[data-order-dashboard]');
                if (orderDashboard) {
                    orderDashboard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }

                // Trigger a custom event for the dashboard to focus
                window.dispatchEvent(new CustomEvent('newOrderCreated', {
                    detail: { orderId, restaurantId, tableId: selectedTable }
                }));
            }, 1000);

            // Clear cart and close modal after delay
            setTimeout(() => {
                onClearCart();
                onClose();
                setSubmitMessage('');
                setDeliveryInfo({
                    address: '',
                    phone: '',
                    date: '',
                    time: '',
                    notes: '',
                    tableId: ''
                });
                setGuestInfo({
                    name: '',
                    email: ''
                });
                setSelectedTable('');
            }, 3000);

        } catch (error) {
            console.error('Error submitting order:', error);
            setSubmitMessage('❌ Error al procesar el pedido. Intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 relative shadow-2xl max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <ShoppingCart className="w-8 h-8" />
                        <h2 className="text-2xl font-bold">Mi Carrito</h2>
                    </div>
                    <p className="opacity-90">{restaurantName}</p>
                </div>

                <div className="p-6">
                    <UserInfoSection
                        currentUser={currentUser}
                        guestInfo={guestInfo}
                        onGuestInfoChange={handleGuestInputChange}
                    />

                    <OrderTypeSelector
                        orderType={orderType}
                        onOrderTypeChange={setOrderType}
                    />

                    <CartItemsList
                        cartItems={cartItems}
                        totalPrice={totalPrice}
                    />

                    {cartItems.length > 0 && (
                        <form onSubmit={handleSubmitOrder} className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {orderType === 'delivery' ? 'Información de entrega' : 'Información de reserva'}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {orderType === 'dine-in' ? (
                                    <DineInForm
                                        selectedTable={selectedTable}
                                        availableTables={availableTables}
                                        dinnerDuration={dinnerDuration}
                                        tableId={tableId}
                                        tableName={tableName}
                                        onTableChange={setSelectedTable}
                                        onClearTableSelection={() => setSelectedTable('')}
                                    />
                                ) : (
                                    <DeliveryForm
                                        deliveryInfo={deliveryInfo}
                                        onInputChange={handleInputChange}
                                        onSelectChange={handleSelectChange}
                                    />
                                )}
                            </div>

                            <FormTextarea
                                label={orderType === 'delivery' ? 'Notas adicionales' : 'Comentarios especiales'}
                                name="notes"
                                value={deliveryInfo.notes}
                                onChange={handleInputChange}
                                placeholder={
                                    orderType === 'delivery'
                                        ? "Instrucciones especiales, referencias del domicilio, etc."
                                        : "Preferencias de mesa, celebración especial, etc."
                                }
                            />

                            {submitMessage && (
                                <div className={`p-3 rounded-lg text-sm ${submitMessage.includes('✅')
                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                    : 'bg-red-100 text-red-800 border border-red-200'
                                }`}>
                                    {submitMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                <CreditCard className="w-5 h-5" />
                                {isSubmitting ? 'Procesando...' :
                                    orderType === 'delivery'
                                        ? `Confirmar Delivery - $${totalPrice}`
                                        : `Confirmar Reserva - $${totalPrice}`
                                }
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

                

