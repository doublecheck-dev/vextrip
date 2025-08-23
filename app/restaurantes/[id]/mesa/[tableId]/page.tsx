'use client';
import { useState, useEffect } from 'react';
import { restaurants } from "@/lib/restaurants-data";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import ErrorState from "@/components/organisms/ErrorState";
import TableHeader from "@/components/organisms/TableHeader";
import MenuSection from "@/components/organisms/MenuSection";
import TablePageLayout from "@/components/templates/TablePageLayout";

interface TablePageProps {
  params: { 
    id: string;
    tableId: string;
  };
}

export default function TablePage({ params }: TablePageProps) {
  const [table, setTable] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const restaurant = restaurants.find(r => r.id === parseInt(params.id));

  useEffect(() => {
    loadTableInfo();
  }, [params.tableId]);

  const loadTableInfo = () => {
    try {
      const allTables = JSON.parse(localStorage.getItem('tourex_tables') || '[]');
      const foundTable = allTables.find((t: any) => t.id === params.tableId);
      setTable(foundTable);
    } catch (error) {
      console.error('Error loading table info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner 
        message="Cargando información de la mesa..."
        color="border-orange-500"
      />
    );
  }

  if (!restaurant) {
    return (
      <ErrorState
        title="Restaurante no encontrado"
        linkHref="/gastronomia"
        linkText="Volver a restaurantes"
      />
    );
  }

  if (!table) {
    return (
      <ErrorState
        title="Mesa no encontrada"
        linkHref={`/restaurantes/${params.id}`}
        linkText="Volver al restaurante"
      />
    );
  }

  const tableHeader = (
    <TableHeader
      tableName={table.name}
      restaurantName={restaurant.name}
      capacity={table.capacity}
      location={table.location}
      bgGradient="from-blue-500 to-purple-500"
    />
  );

  return (
    <TablePageLayout
      restaurantId={restaurant.id}
      restaurantName={restaurant.name}
      tableId={params.tableId}
      backHref={`/restaurantes/${params.id}`}
      backText="Volver al restaurante"
      headerSection={tableHeader}
      showOrderDashboard={true}
    >
      <MenuSection
        restaurantId={restaurant.id}
        restaurantName={restaurant.name}
        tableId={params.tableId}
        tableName={table.name}
        title="Menú del Restaurante"
        bgColor="bg-white"
        borderColor="border-gray-200"
      />
    </TablePageLayout>
  );
}
        