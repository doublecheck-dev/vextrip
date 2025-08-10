'use client';
import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Truck, ChefHat, X, Eye, EyeOff, ChevronDown, ChevronUp, Users } from 'lucide-react';

interface CartOrder {
  id: string;
  userId: number;
  userName: string;
  userEmail: string;
  restaurantId: number;
  restaurantName: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  totalPrice: number;
  deliveryInfo: {
    address: string;
    phone: string;
    date: string;
    time: string;
    notes: string;
    tableId?: string; // Add optional tableId property
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  timestamp: string;
}

interface OrderStatusDashboardProps {
  restaurantId: number;
  restaurantName: string;
  tableFilter?: string; // Optional table filter
}

export default function OrderStatusDashboard({ restaurantId, restaurantName, tableFilter }: OrderStatusDashboardProps) {
  const [orders, setOrders] = useState<CartOrder[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true); // Default to open
  const [previousOrderCount, setPreviousOrderCount] = useState(0);
  const [userCollapsed, setUserCollapsed] = useState(false); // Track user action
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [focusedOrderId, setFocusedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('tourex_user');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    loadUserOrders();
    
    // Auto-refresh every 10 seconds for more responsive updates
    const interval = setInterval(loadUserOrders, 10000);
    return () => clearInterval(interval);
  }, [restaurantId]);

  // Auto-open dashboard when new orders are detected (only if user hasn't manually collapsed)
  useEffect(() => {
    if (orders.length > previousOrderCount && orders.length > 0 && !userCollapsed) {
      setIsVisible(true);
      console.log('📋 New order detected, opening dashboard');
    }
    setPreviousOrderCount(orders.length);
  }, [orders.length, userCollapsed]);

  // Keep dashboard open if there are active orders (only if user hasn't manually collapsed)
  useEffect(() => {
    const activeOrders = orders.filter(order => order.status !== 'delivered');
    if (activeOrders.length > 0 && !userCollapsed) {
      setIsVisible(true);
    }
  }, [orders, userCollapsed]);

  // Auto-focus on confirmation order (status = 'confirmed')
  useEffect(() => {
    const confirmationOrder = orders.find(order => order.status === 'confirmed');
    if (confirmationOrder && confirmationOrder.id !== focusedOrderId) {
      setFocusedOrderId(confirmationOrder.id);
      setIsVisible(true);
      
      // Expand the confirmed order automatically
      setExpandedOrders(prev => {
        const newSet = new Set(prev);
        newSet.add(confirmationOrder.id);
        return newSet;
      });
      
      // Auto-scroll to the order after a brief delay
      setTimeout(() => {
        const element = document.getElementById(`order-${confirmationOrder.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      
      console.log('🎯 Focusing on confirmed order:', confirmationOrder.id);
    }
  }, [orders, focusedOrderId]);

  // Clear focus when order status changes from confirmed
  useEffect(() => {
    if (focusedOrderId) {
      const focusedOrder = orders.find(order => order.id === focusedOrderId);
      if (!focusedOrder || focusedOrder.status !== 'confirmed') {
        setFocusedOrderId(null);
      }
    }
  }, [orders, focusedOrderId]);

  // Listen for new order events from CartModal
  useEffect(() => {
    const handleNewOrder = (event: CustomEvent) => {
      const { orderId, restaurantId: newOrderRestaurantId } = event.detail;
      
      if (newOrderRestaurantId === restaurantId) {
        console.log('🎯 New order created, focusing dashboard:', orderId);
        
        // Force dashboard to be visible
        setIsVisible(true);
        setUserCollapsed(false);
        
        // Reload orders immediately
        loadUserOrders();
        
        // Set focus on the new order after a brief delay
        setTimeout(() => {
          setFocusedOrderId(orderId);
          
          // Auto-expand the new order
          setExpandedOrders(prev => {
            const newSet = new Set(prev);
            newSet.add(orderId);
            return newSet;
          });
        }, 500);
      }
    };

    window.addEventListener('newOrderCreated', handleNewOrder as EventListener);
    
    return () => {
      window.removeEventListener('newOrderCreated', handleNewOrder as EventListener);
    };
  }, [restaurantId]);

  const loadUserOrders = () => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('tourex_orders') || '[]');
      
      // Filter orders for this restaurant and user (including guest orders)
      let userOrders = allOrders.filter((order: CartOrder) => {
        if (order.restaurantId !== restaurantId) return false;
        
        // If table filter is provided, only show orders for that table
        if (tableFilter) {
          console.log(`🔍 Filtering orders for table: ${tableFilter}`);
          
          // Enhanced table filtering logic
          const isTableOrder = 
            // Check if table ID is in the address
            order.deliveryInfo.address.includes(tableFilter) ||
            // Check if table ID is in the notes with various patterns
            order.deliveryInfo.notes?.includes(`Table ID: ${tableFilter}`) ||
            order.deliveryInfo.notes?.includes(`TableRef: ${tableFilter}`) ||
            order.deliveryInfo.notes?.includes(`TableNumber: ${tableFilter}`) ||
            order.deliveryInfo.notes?.includes(`Mesa Numero: ${tableFilter.replace('mesa-', '')}`) ||
            // Check direct table ID match (with safe optional chaining)
            order.deliveryInfo.tableId === tableFilter ||
            // Check for various mesa patterns
            (tableFilter.startsWith('mesa-') && (
              order.deliveryInfo.notes?.includes(tableFilter) ||
              order.deliveryInfo.address.includes(tableFilter) ||
              (order.deliveryInfo.tableId && order.deliveryInfo.tableId.includes(tableFilter))
            )) ||
            // Check for table number extraction
            (() => {
              const tableNumber = tableFilter.replace(/mesa-\d+-/, '').replace('mesa-', '');
              return order.deliveryInfo.notes?.includes(`Mesa #${tableNumber}`) ||
                     order.deliveryInfo.address.includes(`Mesa ${tableNumber}`) ||
                     order.deliveryInfo.notes?.includes(`Table#${tableNumber}`);
            })();
          
          if (!isTableOrder) {
            console.log(`❌ Order ${order.id} not matching table ${tableFilter}`);
            console.log('Order details:', {
              address: order.deliveryInfo.address,
              notes: order.deliveryInfo.notes,
              tableId: order.deliveryInfo.tableId
            });
            return false;
          }
          
          console.log(`✅ Order ${order.id} matches table ${tableFilter}`);
        }
        
        // Include orders from current user or guest orders with same email/name
        if (currentUser) {
          return order.userId === currentUser.id || 
                 order.userEmail === currentUser.email;
        }
        
        // For non-logged users, show all recent orders (last 24 hours)
        const orderTime = new Date(order.timestamp);
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return orderTime > oneDayAgo;
      });

      // Sort by timestamp (newest first)
      userOrders.sort((a: CartOrder, b: CartOrder) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setOrders(userOrders);
      console.log(`📊 Loaded ${userOrders.length} orders ${tableFilter ? `for table ${tableFilter}` : ''}`);
    } catch (error) {
      console.error('Error loading user orders:', error);
    }
  };

  // Handle manual toggle by user
  const handleToggle = () => {
    setIsVisible(!isVisible);
    setUserCollapsed(!isVisible); // Track if user manually collapsed
    console.log('📋 User manually toggled dashboard:', !isVisible ? 'opened' : 'closed');
  };

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'preparing':
        return <ChefHat className="w-5 h-5 text-orange-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente de confirmación';
      case 'confirmed': return 'Confirmado - En cola';
      case 'preparing': return 'Preparando tu pedido';
      case 'delivered': return 'Listo para servir';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'confirmed': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'preparing': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'delivered': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getTableNumber = (order: CartOrder) => {
    // Try multiple ways to extract table number
    const address = order.deliveryInfo.address;
    const notes = order.deliveryInfo.notes;
    
    // Check address for table number patterns
    if (address.includes('Mesa')) {
      const match = address.match(/Mesa\s*(\d+)/i) || address.match(/Table#(\d+)/i);
      if (match) return match[1];
    }
    
    // Check notes for table number
    if (notes?.includes('TableNumber:')) {
      const match = notes.match(/TableNumber:\s*(\w+-?\d+)/);
      if (match) return match[1].replace('mesa-', '');
    }
    
    // Check notes for Mesa # pattern
    if (notes?.includes('Mesa #')) {
      const match = notes.match(/Mesa #(\d+)/);
      if (match) return match[1];
    }
    
    return null;
  };

  const getUserComments = (notes: string) => {
    if (!notes) return '';
    
    const userNotes = notes
      .split('|')
      .filter(note => {
        const trimmed = note.trim();
        return trimmed.length > 0 &&
               !trimmed.includes('Table ID:') && 
               !trimmed.includes('TableRef:') && 
               !trimmed.includes('TableNumber:') &&
               !trimmed.includes('Mesa reservada') &&
               !trimmed.includes('Duración estimada');
      })
      .map(note => note.trim())
      .filter(note => note.length > 0);
    
    return userNotes.length > 0 ? userNotes.join(' • ') : '';
  };

  const getDineInOrders = () => orders.filter(order => 
    order.deliveryInfo.address.includes('Mesa reservada') || 
    order.deliveryInfo.address.includes(restaurantName)
  );

  const getDeliveryOrders = () => orders.filter(order => 
    !order.deliveryInfo.address.includes('Mesa reservada') && 
    !order.deliveryInfo.address.includes(restaurantName)
  );

  const dineInOrders = getDineInOrders();
  const deliveryOrders = getDeliveryOrders();

  const hasActiveOrders = orders.some(order => order.status !== 'delivered');
  const completedOrders = orders.filter(order => order.status === 'delivered');
  const activeOrdersCount = orders.filter(order => order.status !== 'delivered').length;

  // Show table-specific message when no orders
  if (orders.length === 0 && tableFilter) {
    return (
      <div className="mb-8" data-order-dashboard>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  📋 Estado de Pedidos - Mesa Específica
                </h3>
                <p className="text-white/80 text-sm">
                  {restaurantName} • Solo esta mesa
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">No hay pedidos para esta mesa</h4>
            <p className="text-gray-600 mb-4">Haz tu primer pedido desde el menú de abajo</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                ℹ️ Los pedidos que realices desde esta mesa aparecerán aquí automáticamente
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return null; // Don't show anything if no orders (general case)
  }

  // Update header to show table-specific info
  return (
    <div className="mb-8" data-order-dashboard>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r text-white p-4 ${
          hasActiveOrders 
            ? 'from-orange-500 to-red-500' 
            : 'from-green-500 to-blue-500'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                📋 Estado de tus Pedidos ({orders.length})
                {tableFilter && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    Mesa Específica
                  </span>
                )}
                {hasActiveOrders && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full animate-pulse">
                    {activeOrdersCount} Activos
                  </span>
                )}
              </h3>
              <p className="text-white/80 text-sm">
                {restaurantName}
                {tableFilter && (
                  <span className="ml-2">• Solo esta mesa</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveOrders && (
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {activeOrdersCount} pendientes
                </div>
              )}
              {completedOrders.length > 0 && (
                <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                  {completedOrders.length} completados
                </div>
              )}
              <button
                onClick={handleToggle}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                title={isVisible ? 'Ocultar pedidos' : 'Mostrar pedidos'}
              >
                {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {isVisible && (
          <div className="p-4 space-y-4">
            {/* Status summary for all orders */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">📊 Resumen general</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {['pending', 'confirmed', 'preparing', 'delivered'].map(status => {
                  const count = orders.filter(order => order.status === status).length;
                  const statusLabels = {
                    pending: 'Pendientes',
                    confirmed: 'Confirmados', 
                    preparing: 'Preparando',
                    delivered: 'Completados'
                  };
                  
                  return (
                    <div key={status} className="text-center">
                      <p className="font-bold text-lg text-blue-800">{count}</p>
                      <p className="text-blue-600">{statusLabels[status as keyof typeof statusLabels]}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Orders Section */}
            {hasActiveOrders && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  🔥 Pedidos Activos
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    {activeOrdersCount}
                  </span>
                </h4>
                <div className="space-y-3">
                  {orders.filter(order => order.status !== 'delivered').map((order) => {
                    const tableNumber = getTableNumber(order);
                    const isDelivery = !order.deliveryInfo.address.includes('Mesa reservada') && 
                                     !order.deliveryInfo.address.includes(restaurantName);
                    const isExpanded = expandedOrders.has(order.id);
                    const isFocused = focusedOrderId === order.id;
                    const userComments = getUserComments(order.deliveryInfo.notes);
                    
                    return (
                      <div 
                        key={order.id} 
                        id={`order-${order.id}`}
                        className={`p-4 rounded-lg border transition-all duration-500 ${
                          getStatusColor(order.status)
                        } ${
                          isFocused 
                            ? 'ring-4 ring-blue-300 ring-opacity-75 shadow-xl scale-[1.02] bg-gradient-to-r from-blue-50 to-white border-blue-300' 
                            : ''
                        }`}
                      >
                        {/* Focused order indicator */}
                        {isFocused && (
                          <div className="flex items-center gap-2 mb-3 p-2 bg-blue-100 rounded-lg border border-blue-200">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-blue-800 font-semibold text-sm">
                              🎯 Pedido confirmado - Listo para preparar
                            </span>
                            <button
                              onClick={() => setFocusedOrderId(null)}
                              className="ml-auto text-blue-600 hover:text-blue-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(order.status)}
                            <div>
                              <p className="font-medium flex items-center gap-2">
                                Pedido #{order.id.slice(-6)}
                                {isFocused && (
                                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded animate-pulse">
                                    PRIORITARIO
                                  </span>
                                )}
                                {isDelivery ? (
                                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                    🚚 Delivery
                                  </span>
                                ) : (
                                  tableNumber && (
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                      🍽️ Mesa {tableNumber}
                                    </span>
                                  )
                                )}
                              </p>
                              <p className="text-sm opacity-75">{getStatusText(order.status)}</p>
                              {userComments && (
                                <p className="text-xs text-gray-600 mt-1 italic">
                                  💬 "{userComments}"
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${order.totalPrice}</p>
                            <p className="text-xs opacity-75">
                              {new Date(order.timestamp).toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        
                        {/* Items summary/detail toggle */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-700">
                              Productos ({order.items.reduce((sum, item) => sum + item.quantity, 0)})
                            </p>
                            <button
                              onClick={() => toggleOrderExpansion(order.id)}
                              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                              {isExpanded ? (
                                <>
                                  <span>Ocultar</span>
                                  <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  <span>Ver detalles</span>
                                  <ChevronDown className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>

                          {isExpanded ? (
                            // Detailed view - show all items
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-12 h-12 object-cover rounded-lg"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=100&q=80';
                                    }}
                                  />
                                  <div className="flex-1">
                                    <h5 className="font-medium text-gray-800">{item.name}</h5>
                                    <p className="text-sm text-gray-600">
                                      ${item.price} × {item.quantity} = ${item.price * item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                      {item.quantity}
                                    </span>
                                  </div>
                                </div>
                              ))}
                              
                              {/* Order total */}
                              <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between items-center font-semibold">
                                  <span>Total del pedido:</span>
                                  <span className="text-lg">${order.totalPrice}</span>
                                </div>
                              </div>

                              {/* Additional order info */}
                              {(order.deliveryInfo.notes && (userComments || tableFilter)) && (
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                  {userComments && (
                                    <p className="text-sm text-blue-800 mb-2">
                                      <strong>💬 Comentarios del cliente:</strong> {userComments}
                                    </p>
                                  )}
                                  {tableFilter && order.deliveryInfo.notes.includes('Duración estimada') && (
                                    <p className="text-xs text-blue-600 mt-1">
                                      ⏱️ {order.deliveryInfo.notes.match(/Duración estimada: (\d+) minutos/)?.[0]}
                                    </p>
                                  )}
                                  {tableNumber && (
                                    <p className="text-xs text-blue-600 mt-1">
                                      🍽️ Mesa: #{tableNumber}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            // Summary view - show first 2 items
                            <div className="text-sm space-y-1">
                              {order.items.slice(0, 2).map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <span className="opacity-75">{item.quantity}x {item.name}</span>
                                  <span className="font-medium">${item.price * item.quantity}</span>
                                </div>
                              ))}
                              {order.items.length > 2 && (
                                <p className="opacity-50 text-center">
                                  +{order.items.length - 2} productos más...
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Enhanced progress bar for focused orders */}
                        <div className={`mt-3 rounded-full h-2 ${isFocused ? 'bg-blue-200' : 'bg-white/50'}`}>
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              order.status === 'pending' ? 'bg-yellow-400 w-1/4' :
                              order.status === 'confirmed' ? (isFocused ? 'bg-blue-500 w-2/4 animate-pulse' : 'bg-blue-400 w-2/4') :
                              order.status === 'preparing' ? 'bg-orange-400 w-3/4' :
                              'bg-green-400 w-full'
                            }`}
                          />
                        </div>

                        {/* Action buttons for focused confirmed orders */}
                        {isFocused && order.status === 'confirmed' && (
                          <div className="mt-4 flex gap-2">
                            <button 
                              onClick={() => {
                                // Here you could trigger a kitchen notification or update
                                setFocusedOrderId(null);
                              }}
                              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-semibold"
                            >
                              <ChefHat className="w-4 h-4" />
                              Iniciar Preparación
                            </button>
                            <button 
                              onClick={() => setFocusedOrderId(null)}
                              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                              Marcar como Visto
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Completed Orders Section */}
            {completedOrders.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  ✅ Pedidos Completados
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {completedOrders.length}
                  </span>
                </h4>
                <div className="space-y-2">
                  {completedOrders.slice(0, 3).map((order) => {
                    const tableNumber = getTableNumber(order);
                    const isDelivery = !order.deliveryInfo.address.includes('Mesa reservada') && 
                                     !order.deliveryInfo.address.includes(restaurantName);
                    const isExpanded = expandedOrders.has(order.id);
                    
                    return (
                      <div key={order.id} className="p-3 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <div>
                              <p className="font-medium text-green-800 flex items-center gap-2">
                                Pedido #{order.id.slice(-6)}
                                {isDelivery ? (
                                  <span className="text-xs opacity-75">🚚</span>
                                ) : (
                                  tableNumber && (
                                    <span className="text-xs opacity-75">🍽️ Mesa {tableNumber}</span>
                                  )
                                )}
                              </p>
                              <p className="text-sm text-green-600">Completado</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-800">${order.totalPrice}</p>
                            <p className="text-xs text-green-600">
                              {new Date(order.timestamp).toLocaleDateString('es-ES')}
                            </p>
                          </div>
                        </div>

                        {/* Completed order items toggle */}
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-green-700">
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)} productos
                          </p>
                          <button
                            onClick={() => toggleOrderExpansion(order.id)}
                            className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
                          >
                            {isExpanded ? (
                              <>
                                <span>Ocultar</span>
                                <ChevronUp className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                <span>Ver productos</span>
                                <ChevronDown className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-3 space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-green-700">{item.quantity}x {item.name}</span>
                                <span className="font-medium text-green-800">${item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {completedOrders.length > 3 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{completedOrders.length - 3} pedidos completados más...
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Info message */}
            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 text-center">
              ℹ️ Los estados se actualizan automáticamente cada 10 segundos
              <span className="block mt-1 text-blue-600">
                📱 Haz clic en el ojo para ocultar/mostrar este panel
              </span>
              {focusedOrderId && (
                <span className="block mt-1 text-orange-600 font-medium">
                  🎯 Pedido confirmado resaltado - Requiere atención
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
