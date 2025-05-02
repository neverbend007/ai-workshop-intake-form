
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import FormField from './FormField';
import { FormValues } from '@/types/formTypes';

interface TextInputProps {
  id: keyof FormValues;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  register: UseFormRegister<FormValues>;
  validation: Record<string, any>;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  error,
  type = "text",
  autoComplete,
  register,
  validation
}) => {
  return (
    <FormField id={id} label={label} error={error}>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        className={`block w-full rounded-lg border ${error ? 'border-red-300 ring-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm bg-white/70 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
        {...register(id, validation)}
      />
    </FormField>
  );
};

export default TextInput;
