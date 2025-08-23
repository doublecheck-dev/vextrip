import { Calendar, Clock, Users } from "lucide-react";

interface ReservationCardProps {
  priceRange: string;
  reservationRequired: boolean;
}

export default function ReservationCard({ priceRange, reservationRequired }: ReservationCardProps) {
  return (
    <div id="reservation-form" className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 shadow-lg text-white">
      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-2">{priceRange}</div>
        <div className="text-orange-100">Rango de precios promedio</div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-orange-100 mb-2">Fecha de reserva</label>
          <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
            <Calendar className="w-5 h-5 text-orange-100" />
            <input
              type="date"
              className="flex-1 bg-transparent text-white placeholder-orange-200 outline-none"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-orange-100 mb-2">Hora preferida</label>
          <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
            <Clock className="w-5 h-5 text-orange-100" />
            <select className="flex-1 bg-transparent text-white outline-none">
              <option className="text-gray-800">19:00</option>
              <option className="text-gray-800">19:30</option>
              <option className="text-gray-800">20:00</option>
              <option className="text-gray-800">20:30</option>
              <option className="text-gray-800">21:00</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-orange-100 mb-2">Número de comensales</label>
          <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
            <Users className="w-5 h-5 text-orange-100" />
            <select className="flex-1 bg-transparent text-white outline-none">
              <option className="text-gray-800">2 personas</option>
              <option className="text-gray-800">3 personas</option>
              <option className="text-gray-800">4 personas</option>
              <option className="text-gray-800">5+ personas</option>
            </select>
          </div>
        </div>
      </div>

      <button className="w-full bg-white text-orange-600 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg">
        {reservationRequired ? '🍽️ Reservar Mesa' : '📞 Consultar Disponibilidad'}
      </button>
    </div>
  );
}
