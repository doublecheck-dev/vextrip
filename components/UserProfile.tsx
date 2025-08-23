'use client';
import { useState, useEffect } from 'react';
import { X, User, Calendar, Mail, Phone, MapPin, QrCode, MessageCircle, Clock, Eye } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  provider?: string;
  createdAt?: string;
  lastLogin?: string;
}

interface QRRecord {
  id: string;
  userId: number | null;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  message: string;
  businessName: string;
  timestamp: string;
  action: 'viewed' | 'generated' | 'clicked';
}

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [qrRecords, setQrRecords] = useState<QRRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'activity'>('profile');

  useEffect(() => {
    if (isOpen) {
      loadUserData();
      loadQRRecords();
    }
  }, [isOpen]);

  const loadUserData = () => {
    try {
      const userData = localStorage.getItem('vextrip_user');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadQRRecords = () => {
    try {
      const records = localStorage.getItem('vextrip_qr_records');
      if (records) {
        const allRecords = JSON.parse(records);
        // Filter records for current user
        const userRecords = allRecords.filter((record: QRRecord) => 
          record.userId === currentUser?.id || record.userEmail === currentUser?.email
        );
        setQrRecords(userRecords.sort((a: QRRecord, b: QRRecord) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ));
      }
    } catch (error) {
      console.error('Error loading QR records:', error);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'viewed': return <Eye className="w-4 h-4 text-blue-500" />;
      case 'generated': return <QrCode className="w-4 h-4 text-green-500" />;
      case 'clicked': return <MessageCircle className="w-4 h-4 text-purple-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'viewed': return 'Vio QR';
      case 'generated': return 'Generó QR';
      case 'clicked': return 'Abrió WhatsApp';
      default: return 'Actividad';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  if (!isOpen || !currentUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl mx-4 relative shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {getInitials(currentUser.name)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <p className="text-orange-100">{currentUser.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {currentUser.provider || 'email'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'profile'
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="w-5 h-5 inline mr-2" />
              Mi Perfil
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'activity'
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <QrCode className="w-5 h-5 inline mr-2" />
              Actividad QR ({qrRecords.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' ? (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Nombre</p>
                      <p className="font-medium">{currentUser.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Miembro desde</p>
                      <p className="font-medium">
                        {currentUser.createdAt 
                          ? new Date(currentUser.createdAt).toLocaleDateString()
                          : 'No disponible'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Último acceso</p>
                      <p className="font-medium">
                        {currentUser.lastLogin 
                          ? new Date(currentUser.lastLogin).toLocaleDateString()
                          : 'No disponible'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <QrCode className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{qrRecords.filter(r => r.action === 'generated').length}</p>
                  <p className="text-sm text-blue-600">QRs Generados</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{qrRecords.filter(r => r.action === 'clicked').length}</p>
                  <p className="text-sm text-green-600">WhatsApp Abierto</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <Eye className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">{qrRecords.filter(r => r.action === 'viewed').length}</p>
                  <p className="text-sm text-purple-600">QRs Vistos</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Historial de Actividad QR</h3>
              {qrRecords.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <QrCode className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No hay actividad QR registrada</p>
                  <p className="text-sm">Genera tu primer código QR para comenzar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {qrRecords.map((record) => (
                    <div key={record.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-400">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getActionIcon(record.action)}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-800">
                                {getActionText(record.action)}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(record.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {record.businessName}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              📱 {record.phoneNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
