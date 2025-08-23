import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import ContactItem from '../molecules/ContactItem';

interface ContactInfoProps {
  phone: string;
  email: string;
  address: string;
  openHours: string;
  website: string;
}

export default function ContactInfo({ phone, email, address, openHours, website }: ContactInfoProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Información de Contacto</h3>
      <div className="space-y-5">
        <ContactItem
          icon={<Phone className="w-6 h-6 text-orange-600" />}
          title={phone}
          subtitle="Llamar ahora"
          href={`tel:${phone}`}
          bgColor="bg-orange-100 group-hover:bg-orange-200"
        />

        <ContactItem
          icon={<Mail className="w-6 h-6 text-blue-600" />}
          title={email}
          subtitle="Enviar email"
          href={`mailto:${email}`}
          bgColor="bg-blue-100 group-hover:bg-blue-200"
        />

        <ContactItem
          icon={<MapPin className="w-6 h-6 text-green-600" />}
          title={address}
          subtitle="Dirección"
          bgColor="bg-green-100"
        />

        <ContactItem
          icon={<Clock className="w-6 h-6 text-purple-600" />}
          title={openHours}
          subtitle="Horario de atención"
          bgColor="bg-purple-100"
        />

        <ContactItem
          icon={<ExternalLink className="w-6 h-6 text-indigo-600" />}
          title={website}
          subtitle="Visitar sitio web"
          href={`https://${website}`}
          bgColor="bg-indigo-100 group-hover:bg-indigo-200"
        />
      </div>
    </div>
  );
}
