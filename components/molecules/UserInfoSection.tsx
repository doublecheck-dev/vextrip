import { User } from 'lucide-react';
import FormInput from '../atoms/FormInput';

interface UserInfoSectionProps {
  currentUser: any;
  guestInfo: { name: string; email: string };
  onGuestInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserInfoSection({ 
  currentUser, 
  guestInfo, 
  onGuestInfoChange 
}: UserInfoSectionProps) {
  if (currentUser) {
    return (
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-blue-500" />
          <div>
            <p className="font-semibold text-gray-800">{currentUser.name}</p>
            <p className="text-sm text-gray-600">{currentUser.email}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Información personal</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Nombre completo"
          name="name"
          value={guestInfo.name}
          onChange={onGuestInfoChange}
          placeholder="Tu nombre completo"
          required
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={guestInfo.email}
          onChange={onGuestInfoChange}
          placeholder="tu@email.com"
          required
        />
      </div>
    </div>
  );
}
