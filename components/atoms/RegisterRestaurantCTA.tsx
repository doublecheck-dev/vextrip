import React from 'react';

export default function RegisterRestaurantCTA({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="bg-white text-orange-600 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-orange-100 transition-colors duration-200 text-lg"
      onClick={onClick}
    >
      Registrar mi restaurante
    </button>
  );
}
