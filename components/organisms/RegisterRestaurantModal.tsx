import React from 'react';
import RegisterRestaurantForm from '../organisms/RegisterRestaurantForm';

export default function RegisterRestaurantModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <RegisterRestaurantForm onSuccess={onSuccess} onClose={onClose} />
      </div>
    </div>
  );
}
