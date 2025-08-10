import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  min?: string;
}

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  icon,
  min
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {icon && <span className="inline mr-1">{icon}</span>}
        {label} {required && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-50"
      />
    </div>
  );
}
