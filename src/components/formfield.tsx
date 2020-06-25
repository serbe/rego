import React, { ChangeEvent, MouseEvent } from 'react';

import { Input } from './input';

interface FormFieldProps {
  className?: string;
  disabled?: boolean;
  icon?: string;
  iconRight?: string;
  label?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  placeholder?: string;
  readonly?: boolean;
  rounded?: boolean;
  type?: 'text' | 'password' | 'email' | 'tel';
  value?: string;
}

export const FormField = (properties: FormFieldProps): JSX.Element => {
  const {
    className,
    disabled,
    icon,
    iconRight,
    label,
    name,
    onChange,
    onClick,
    placeholder,
    readonly,
    type,
    value,
  } = properties;

  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <Input
        className={className}
        disabled={disabled}
        icon={icon}
        iconRight={iconRight}
        name={name}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        readonly={readonly}
        type={type}
        value={value}
      />
    </div>
  );
};

FormField.defaultProps = {
  type: 'text',
};
