
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import FormField from './FormField';
import { FormValues } from '@/types/formTypes';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectInputProps {
  id: keyof FormValues;
  label: string;
  error?: string;
  options: Option[];
  register: UseFormRegister<FormValues>;
  validation: Record<string, any>;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  error,
  options,
  register,
  validation
}) => {
  return (
    <FormField id={id} label={label} error={error}>
      <select
        id={id}
        className={`block w-full rounded-lg border ${error ? 'border-red-300 ring-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm bg-white/70 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
        {...register(id, validation)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export default SelectInput;
