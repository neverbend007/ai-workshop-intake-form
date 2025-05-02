
import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, error, children }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-300">{error}</p>
      )}
    </div>
  );
};

export default FormField;
