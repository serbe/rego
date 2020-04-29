import React, { ChangeEvent, MouseEvent } from 'react';
import { Icon } from './icon';

interface InputProps {
  className?: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  defaultValue?: string;
  disabled?: boolean;
  focused?: boolean;
  hovered?: boolean;
  icon?: string;
  iconRight?: string;
  isStatic?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  rounded?: boolean;
  type?: 'text' | 'password' | 'email' | 'tel';
  value?: string;
}

export const Input = (properties: InputProps): JSX.Element => {
  const {
    className,
    color,
    defaultValue,
    disabled,
    focused,
    hovered,
    icon,
    iconRight,
    isStatic,
    loading,
    onClick,
    onChange,
    placeholder,
    readonly,
    rounded,
    type,
    value,
  } = properties;

  const divClasses = `control ${icon ? 'has-icons-left' : ''} ${
    iconRight ? 'has-icons-right' : ''
  } ${loading ? 'is-loading' : ''}`;

  const inputClasses = `${className ? className : ''} input ${focused ? 'is-focused' : ''} ${
    hovered ? 'is-hovered' : ''
  } ${rounded ? 'is-rounded' : ''} ${isStatic ? 'is-static' : ''} ${color ? `is-${color}` : ''}`;

  const LeftIcon = (): JSX.Element | null => (icon ? <Icon position={'left'} icon={icon} /> : null);

  const RightIcon = (): JSX.Element | null =>
    iconRight ? <Icon position={'right'} icon={iconRight} /> : null;

  return (
    <div className={divClasses}>
      <input
        className={inputClasses}
        disabled={disabled}
        onClick={onClick}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readonly}
        type={type}
        value={value}
        defaultValue={defaultValue}
      />
      <LeftIcon />
      <RightIcon />
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
};
