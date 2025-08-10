import OrderStatusDashboard from '../OrderStatusDashboard';
import WhatsAppQR from '../WhatsAppQR';

interface RestaurantPageLayoutProps {
  restaurantId: number;
  restaurantName: string;
  phoneNumber: string;
  heroSection: React.ReactNode;
  children: React.ReactNode;
  showOrderDashboard?: boolean;
  showWhatsApp?: boolean;
  tableFilter?: string;
}

export default function RestaurantPageLayout({
  restaurantId,
  restaurantName,
  phoneNumber,
  heroSection,
  children,
  showOrderDashboard = true,
  showWhatsApp = true,
  tableFilter
}: RestaurantPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {heroSection}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {showOrderDashboard && (
          <OrderStatusDashboard 
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            tableFilter={tableFilter}
          />
        )}
        
        {children}
      </div>

      {showWhatsApp && (
        <WhatsAppQR 
          phoneNumber={phoneNumber}
          message={`Hola! Me interesa consultar sobre el menú de ${restaurantName}. ¿Podrían brindarme más información?`}
          businessName={`Menú ${restaurantName} - TourEx`}
        />
      )}
    </div>
  );
}
