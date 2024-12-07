import React from 'react';

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function NumberInput({ label, value, onChange, error }: NumberInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        maxLength={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="01-99"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}