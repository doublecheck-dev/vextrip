'use client';
import React, { useState, useRef } from 'react';
import { X, QrCode, Download, Copy, ExternalLink } from 'lucide-react';

interface TableQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: any;
  restaurantName: string;
}

export default function TableQRModal({ isOpen, onClose, table, restaurantName }: TableQRModalProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !table) return null;

  const tableUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/restaurantes/${table.restaurantId}/mesa/${table.id}`;
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(tableUrl)}`;

  const copyToClipboard = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(tableUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const downloadQRCode = async () => {
    try {
      const response = await fetch(qrCodeApiUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR_${table.name.replace(/\s+/g, '_')}_${restaurantName.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      // Fallback to direct link method
      const link = document.createElement('a');
      link.href = qrCodeApiUrl;
      link.download = `QR_${table.name.replace(/\s+/g, '_')}_${restaurantName.replace(/\s+/g, '_')}.png`;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
          type="button"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <QrCode className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Código QR</h2>
              <p className="opacity-90">{table.name} - {restaurantName}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* QR Code Display */}
          <div className="text-center" ref={qrRef}>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 inline-block">
              <img 
                src={qrCodeApiUrl}
                alt={`QR Code for ${table.name}`}
                className="w-64 h-64 mx-auto"
              />
              <div className="mt-4">
                <h3 className="font-bold text-lg text-gray-800">{table.name}</h3>
                <p className="text-gray-600">Capacidad: {table.capacity} personas</p>
                <p className="text-gray-600">{table.location || 'Ubicación no especificada'}</p>
              </div>
            </div>
          </div>

          {/* Table Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">¿Qué pueden hacer los clientes?</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Ver el menú digital de forma instantánea</li>
              <li>• Realizar pedidos directamente desde su mesa</li>
              <li>• Seguir el estado de sus pedidos en tiempo real</li>
              <li>• Ver solo los pedidos de su mesa específica</li>
            </ul>
          </div>

          {/* URL Display */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de la mesa:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tableUrl}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded text-sm bg-white"
              />
              <button
                onClick={copyToClipboard}
                className={`p-2 rounded transition-colors ${
                  copySuccess 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title="Copiar URL"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a
                href={tableUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                title="Abrir en nueva pestaña"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            {copySuccess && (
              <p className="text-green-600 text-sm mt-1">✓ URL copiada al portapapeles</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={downloadQRCode}
              className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              type="button"
            >
              <Download className="w-5 h-5" />
              Descargar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
