import { MapPin, Phone, Calendar, Clock } from 'lucide-react';
import FormInput from '../atoms/FormInput';
import FormSelect from '../atoms/FormSelect';

interface DeliveryInfo {
  address: string;
  phone: string;
  date: string;
  time: string;
}

interface DeliveryFormProps {
  deliveryInfo: DeliveryInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function DeliveryForm({ deliveryInfo, onInputChange, onSelectChange }: DeliveryFormProps) {
  const timeOptions = [
    { value: '12:00', label: '12:00' },
    { value: '12:30', label: '12:30' },
    { value: '13:00', label: '13:00' },
    { value: '13:30', label: '13:30' },
    { value: '19:00', label: '19:00' },
    { value: '19:30', label: '19:30' },
    { value: '20:00', label: '20:00' },
    { value: '20:30', label: '20:30' },
    { value: '21:00', label: '21:00' }
  ];

  return (
    <>
      <div className="md:col-span-2">
        <FormInput
          label="Dirección"
          name="address"
          value={deliveryInfo.address}
          onChange={onInputChange}
          placeholder="Calle, número, barrio"
          required
          icon={<MapPin className="w-4 h-4 inline" />}
        />
      </div>

      <FormInput
        label="Teléfono"
        name="phone"
        type="tel"
        value={deliveryInfo.phone}
        onChange={onInputChange}
        placeholder="+54 260 123-4567"
        required
        icon={<Phone className="w-4 h-4 inline" />}
      />

      <FormInput
        label="Fecha"
        name="date"
        type="date"
        value={deliveryInfo.date}
        onChange={onInputChange}
        min={new Date().toISOString().split('T')[0]}
        required
        icon={<Calendar className="w-4 h-4 inline" />}
      />

      <FormSelect
        label="Hora"
        name="time"
        value={deliveryInfo.time}
        onChange={onSelectChange}
        options={timeOptions}
        placeholder="Seleccionar hora"
        required
        icon={<Clock className="w-4 h-4 inline" />}
      />
    </>
  );
}
