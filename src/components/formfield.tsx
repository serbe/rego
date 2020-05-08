import React, { ChangeEvent, MouseEvent } from 'react';

import { Input } from './input';

interface FormFieldProps {
  name: string;
  id?: string;
  key?: string;
  className?: string;
  disabled?: boolean;
  icon?: string;
  iconRight?: string;
  label?: string | boolean;
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  rounded?: boolean;
  type?: 'text' | 'password' | 'email' | 'tel';
  value?: string;
  defaultValue?: string;
}

export const FormField = (properties: FormFieldProps): JSX.Element => {
  const {
    name,
    id,
    key,
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
    defaultValue,
  } = properties;

  const Label = (): JSX.Element | null =>
    label ? (
      <label className="label" htmlFor={id ? id : name}>
        {label !== true ? label : placeholder}
      </label>
    ) : null;

  return (
    <div className="field">
      <Label />
      <Input
        name={name}
        id={id}
        key={key}
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
        defaultValue={defaultValue}
      />
    </div>
  );
};

FormField.defaultProps = {
  type: 'text',
};
