import React, { ChangeEvent, FC, MouseEvent } from 'react';

import { Input } from './input';

interface FormFieldProps {
  className?: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  focused?: boolean;
  hovered?: boolean;
  iconLeft?: string;
  iconRight?: string;
  isStatic?: boolean;
  label?: string | boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  rounded?: boolean;
  size?: 'small' | 'normal' | 'medium' | 'large';
  type?: 'text' | 'password' | 'email' | 'tel';
  value?: string | undefined;
  defaultValue?: string | undefined;
}

export const FormField: FC<FormFieldProps> = (properties: FormFieldProps) => {
  const {
    className,
    color,
    disabled,
    focused,
    hovered,
    iconLeft,
    iconRight,
    isStatic,
    label,
    loading,
    onClick,
    onChange,
    placeholder,
    readonly,
    rounded,
    size,
    type,
    value,
    defaultValue,
  } = properties;

  const Label = (): JSX.Element | null => {
    if (label) {
      if (label !== true) {
        return <label className="label">{label}</label>;
      } else {
        return <label className="label">{placeholder}</label>;
      }
    } else {
      return null;
    }
  };

  return (
    <div className="field">
      <Label />
      <Input
        className={className}
        color={color}
        disabled={disabled}
        focused={focused}
        hovered={hovered}
        iconLeft={iconLeft}
        iconRight={iconRight}
        isStatic={isStatic}
        loading={loading}
        onClick={onClick}
        onChange={onChange}
        placeholder={placeholder}
        readonly={readonly}
        rounded={rounded}
        size={size}
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
