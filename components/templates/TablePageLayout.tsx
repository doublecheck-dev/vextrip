import BackButton from '../atoms/BackButton';
import OrderStatusDashboard from '../OrderStatusDashboard';

interface TablePageLayoutProps {
  restaurantId: number;
  restaurantName: string;
  tableId: string;
  backHref: string;
  backText?: string;
  headerSection: React.ReactNode;
  children: React.ReactNode;
  showOrderDashboard?: boolean;
}

export default function TablePageLayout({
  restaurantId,
  restaurantName,
  tableId,
  backHref,
  backText = "Volver al restaurante",
  headerSection,
  children,
  showOrderDashboard = true
}: TablePageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <BackButton href={backHref}>
            {backText}
          </BackButton>
        </div>
      </div>

      {headerSection}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {showOrderDashboard && (
          <div className="mb-8">
            <OrderStatusDashboard 
              restaurantId={restaurantId}
              restaurantName={restaurantName}
              tableFilter={tableId}
            />
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
