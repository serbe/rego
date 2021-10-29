import { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

import { Input } from './input';

export interface FormFieldProperties {
  autocomplete?: string;
  className?: string;
  disabled?: boolean;
  icon?: string;
  iconRight?: string;
  label?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  rounded?: boolean;
  type?: 'text' | 'password' | 'email' | 'tel';
  value?: number | string;
}

export const FormField = ({
  autocomplete,
  className,
  disabled,
  icon,
  iconRight,
  label,
  name,
  onChange,
  onClick,
  onKeyPress,
  placeholder,
  readonly,
  type,
  value,
}: FormFieldProperties): JSX.Element => {
  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <Input
        autocomplete={autocomplete}
        className={className}
        disabled={disabled}
        icon={icon}
        iconRight={iconRight}
        name={name}
        onChange={onChange}
        onClick={onClick}
        onKeyPress={onKeyPress}
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
