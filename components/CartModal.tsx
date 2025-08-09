'use client';
import { useState, useEffect } from 'react';
import { X, ShoppingCart, User, MapPin, Phone, Calendar, Clock, CreditCard } from 'lucide-react';

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
    onOrderCreated?: (orderId: string) => void; // Updated prop to include orderId
}

export default function CartModal({
    isOpen,
    onClose,
    cart,
    menuItems,
    restaurantId,
    restaurantName,
    onClearCart,
    onOrderCreated
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
            const allTables = JSON.parse(localStorage.getItem('tourex_tables') || '[]');
            const restaurantTables = allTables.filter(
                (table: any) => table.restaurantId === restaurantId && table.status === 'available'
            );

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
                // Auto-select first table
                setSelectedTable(defaultTables[0].id);
            } else {
                setAvailableTables(restaurantTables);
                // Auto-select first available table
                setSelectedTable(restaurantTables[0].id);
            }
        } catch (error) {
            console.error('Error loading tables:', error);
            // Fallback to default tables
            const fallbackTables = [
                { id: 'mesa-1', name: 'Mesa 1 (2 personas)', capacity: 2 },
                { id: 'mesa-2', name: 'Mesa 2 (4 personas)', capacity: 4 }
            ];
            setAvailableTables(fallbackTables);
            setSelectedTable(fallbackTables[0].id);
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem('tourex_user');
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

    const saveOrderToStorage = (order: CartOrder) => {
        try {
            const existingOrders = JSON.parse(localStorage.getItem('tourex_orders') || '[]');
            existingOrders.push(order);

            // Keep only last 50 orders
            if (existingOrders.length > 50) {
                existingOrders.splice(0, existingOrders.length - 50);
            }

            localStorage.setItem('tourex_orders', JSON.stringify(existingOrders));
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
            const tableNumber = selectedTableInfo?.name.match(/\d+/)?.[0] || selectedTable.replace('mesa-', '');

            const order: CartOrder = {
                id: orderId,
                userId: currentUser ? currentUser.id : 0,
                userName: currentUser ? currentUser.name : guestInfo.name,
                userEmail: currentUser ? currentUser.email : guestInfo.email,
                restaurantId,
                restaurantName,
                items: cartItems,
                totalPrice,
                deliveryInfo: orderType === 'delivery' ? deliveryInfo : {
                    address: `${restaurantName} - ${selectedTableInfo?.name} - Table#${tableNumber}`,
                    phone: 'Reserva en restaurante',
                    date: new Date().toISOString().split('T')[0],
                    time: 'Inmediato',
                    notes: `Mesa reservada | Mesa #${tableNumber} | Duración estimada: ${dinnerDuration} minutos | Mesa Numero: ${tableNumber} | Comentarios: ${deliveryInfo.notes}`,
                    tableId: tableNumber
                },
                status: 'pending',
                timestamp: new Date().toISOString()
            };

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
                    detail: { orderId, restaurantId }
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
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <ShoppingCart className="w-8 h-8" />
                        <h2 className="text-2xl font-bold">Mi Carrito</h2>
                    </div>
                    <p className="opacity-90">{restaurantName}</p>
                </div>

                <div className="p-6">
                    {/* User Info */}
                    {currentUser ? (
                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="font-semibold text-gray-800">{currentUser.name}</p>
                                    <p className="text-sm text-gray-600">{currentUser.email}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Información personal</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={guestInfo.name}
                                        onChange={handleInputChange}
                                        placeholder="Tu nombre completo"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={guestInfo.email}
                                        onChange={handleInputChange}
                                        placeholder="tu@email.com"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Order Type Selection */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tipo de pedido</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setOrderType('dine-in')}
                                className={`p-4 rounded-lg border-2 transition-colors ${orderType === 'dine-in'
                                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">🍽️</div>
                                    <div>
                                        <h4 className="font-semibold">En el restaurante</h4>
                                        <p className="text-sm opacity-75">Reservar mesa (Recomendado)</p>
                                    </div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setOrderType('delivery')}
                                className={`p-4 rounded-lg border-2 transition-colors ${orderType === 'delivery'
                                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">🚚</div>
                                    <div>
                                        <h4 className="font-semibold">Delivery</h4>
                                        <p className="text-sm opacity-75">Entrega a domicilio</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="space-y-4 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Productos ({cartItems.length})</h3>
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-orange-600">${item.price * item.quantity}</p>
                                    <p className="text-xs text-gray-500">${item.price} c/u</p>
                                </div>
                            </div>
                        ))}

                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span>Total:</span>
                                <span className="text-orange-600">${totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Form */}
                    {cartItems.length > 0 && (
                        <form onSubmit={handleSubmitOrder} className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {orderType === 'delivery' ? 'Información de entrega' : 'Información de reserva'}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Table selection for dine-in only */}
                                {orderType === 'dine-in' && (
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            🍽️ Mesa asignada
                                        </label>
                                        {selectedTable ? (
                                            <div className="w-full p-3 bg-blue-50 border border-blue-300 rounded-lg">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-blue-800">
                                                            {availableTables.find(t => t.id === selectedTable)?.name || 'Mesa seleccionada'}
                                                        </p>
                                                        <p className="text-sm text-blue-600">
                                                            {availableTables.find(t => t.id === selectedTable)?.location &&
                                                                `${availableTables.find(t => t.id === selectedTable)?.location} • `}
                                                            Capacidad: {availableTables.find(t => t.id === selectedTable)?.capacity || 2} personas
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <select
                                                value={selectedTable}
                                                onChange={(e) => setSelectedTable(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                                required
                                            >
                                                <option value="">Elegir mesa disponible</option>
                                                {availableTables.map((table) => (
                                                    <option key={table.id} value={table.id}>
                                                        {table.name} {table.location && `- ${table.location}`} (Capacidad: {table.capacity})
                                                    </option>
                                                ))}
                                            </select>
                                        )}

                                        {availableTables.length === 0 && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                No hay mesas configuradas. El administrador debe agregar mesas.
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Duration info for dine-in only */}
                                {orderType === 'dine-in' && (
                                    <div className="md:col-span-2">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Información de la reserva</h4>
                                            <p className="text-blue-700 text-sm mb-2">
                                                <strong>Duración estimada:</strong> {dinnerDuration} minutos
                                            </p>
                                            <p className="text-blue-600 text-xs">
                                                La mesa será preparada inmediatamente. Puedes extender tu estadía si es necesario.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Address field only for delivery */}
                                {orderType === 'delivery' && (
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <MapPin className="w-4 h-4 inline mr-1" />
                                            Dirección *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={deliveryInfo.address}
                                            onChange={handleInputChange}
                                            placeholder="Calle, número, barrio"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                )}

                                {/* Phone field only for delivery */}
                                {orderType === 'delivery' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <Phone className="w-4 h-4 inline mr-1" />
                                            Teléfono *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={deliveryInfo.phone}
                                            onChange={handleInputChange}
                                            placeholder="+54 260 123-4567"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                )}

                                {/* Date field only for delivery */}
                                {orderType === 'delivery' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Fecha *
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={deliveryInfo.date}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                )}

                                {/* Time field only for delivery */}
                                {orderType === 'delivery' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <Clock className="w-4 h-4 inline mr-1" />
                                            Hora *
                                        </label>
                                        <select
                                            name="time"
                                            value={deliveryInfo.time}
                                            onChange={handleSelectChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Seleccionar hora</option>
                                            <option value="12:00">12:00</option>
                                            <option value="12:30">12:30</option>
                                            <option value="13:00">13:00</option>
                                            <option value="13:30">13:30</option>
                                            <option value="19:00">19:00</option>
                                            <option value="19:30">19:30</option>
                                            <option value="20:00">20:00</option>
                                            <option value="20:30">20:30</option>
                                            <option value="21:00">21:00</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {orderType === 'delivery' ? 'Notas adicionales' : 'Comentarios especiales'}
                                </label>
                                <textarea
                                    name="notes"
                                    value={deliveryInfo.notes}
                                    onChange={handleInputChange}
                                    placeholder={
                                        orderType === 'delivery'
                                            ? "Instrucciones especiales, referencias del domicilio, etc."
                                            : "Preferencias de mesa, celebración especial, etc."
                                    }
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                            </div>

                            {/* Submit Message */}
                            {submitMessage && (
                                <div className={`p-3 rounded-lg text-sm ${submitMessage.includes('✅')
                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                    }`}>
                                    {submitMessage}
                                </div>
                            )}

                            {/* Submit Button */}
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

