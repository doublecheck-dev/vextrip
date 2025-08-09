'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowLeft, Users, MapPin } from "lucide-react";
import { restaurants } from "@/lib/restaurants-data";
import RestaurantMenu from "@/components/RestaurantMenu";
import OrderStatusDashboard from "@/components/OrderStatusDashboard";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información de la mesa...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Restaurante no encontrado</h1>
          <Link href="/gastronomia" className="text-green-600 hover:text-green-700">
            Volver a restaurantes
          </Link>
        </div>
      </div>
    );
  }

  if (!table) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Mesa no encontrada</h1>
          <Link href={`/restaurantes/${params.id}`} className="text-green-600 hover:text-green-700">
            Volver al restaurante
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href={`/restaurantes/${params.id}`} className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver al restaurante
          </Link>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8" />
            <h1 className="text-4xl font-bold">{table.name}</h1>
          </div>
          <p className="text-xl opacity-90 mb-2">{restaurant.name}</p>
          <div className="flex items-center justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Capacidad: {table.capacity} personas</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{table.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Table-specific Order Status Dashboard - Enhanced */}
        <div className="mb-8">

          
          <OrderStatusDashboard 
            restaurantId={restaurant.id}
            restaurantName={restaurant.name}
            tableFilter={params.tableId}
          />
          
        </div>

        {/* Restaurant Menu */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Menú del Restaurante</h2>
              <p className="text-gray-600">Haz tu pedido directamente desde {table.name}</p>
            </div>
          </div>
          
          <RestaurantMenu
            goToMenuPage={false}
            restaurantId={restaurant.id}
            restaurantName={restaurant.name}
          />
        </div>
      </div>
    </div>
  );
}
