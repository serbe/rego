import React, { ChangeEvent, FC } from 'react';

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (properties: InputProps) => {
  const { name, label, type, placeholder, value, onChange } = properties;

  const Label = (): JSX.Element | null =>
    label ? <label className="block mb-2 text-sm font-bold text-gray-700">{label}</label> : null;

  const Inp = (): JSX.Element => (
    <input
      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      name={name}
      type={type ? type : 'text'}
      placeholder={placeholder ? placeholder : label}
      defaultValue={value}
      onChange={onChange}
    />
  );

  return (
    <div className="mb-4">
      <Label />
      <Inp />
    </div>
  );
};
