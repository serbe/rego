import React, { ChangeEvent, memo, MouseEvent } from 'react';
import { Input } from './input';

interface FormFieldProps {
  name: string;
  className?: string;
  disabled?: boolean;
  icon?: string;
  iconRight?: string;
  label?: string;
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  rounded?: boolean;
  type?: 'text' | 'password' | 'email' | 'tel';
  value?: string;
}

export const NoMemoFormField = (properties: FormFieldProps): JSX.Element => {
  const {
    name,
    className,
    disabled,
    icon,
    iconRight,
    label,
    onClick,
    onChange,
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
        name={name}
        className={className}
        disabled={disabled}
        icon={icon}
        iconRight={iconRight}
        onClick={onClick}
        onChange={onChange}
        placeholder={placeholder}
        readonly={readonly}
        type={type}
        value={value}
      />
    </div>
  );
};

NoMemoFormField.defaultProps = {
  type: 'text',
};

export const FormField = memo(NoMemoFormField);
