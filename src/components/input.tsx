import React, { ChangeEvent, FC, MouseEvent } from 'react';
import { Icon } from './icon';

interface InputProps {
  className?: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  defaultValue?: string | undefined;
  disabled?: boolean;
  focused?: boolean;
  hovered?: boolean;
  iconLeft?: string;
  iconRight?: string;
  isStatic?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  rounded?: boolean;
  size?: 'small' | 'normal' | 'medium' | 'large';
  type?: 'text' | 'password' | 'email' | 'tel';
  value?: string | undefined;
}

export const Input: FC<InputProps> = (properties: InputProps) => {
  const {
    className,
    color,
    defaultValue,
    disabled,
    focused,
    hovered,
    iconLeft,
    iconRight,
    isStatic,
    loading,
    onClick,
    onChange,
    placeholder,
    readonly,
    rounded,
    size,
    type,
    value,
  } = properties;

  const sizeClass = size ? `is-${size}` : '';
  const colorClass = color ? `is-${color}` : '';

  const divClasses = `control ${iconLeft ? 'has-icons-left' : ''} ${
    iconRight ? 'has-icons-right' : ''
  } ${loading ? 'is-loading' : ''} ${sizeClass}`;

  const inputClasses = `${className ? className : ''} input ${focused ? 'is-focused' : ''} ${
    hovered ? 'is-hovered' : ''
  } ${rounded ? 'is-rounded' : ''} ${isStatic ? 'is-static' : ''} ${colorClass} ${sizeClass}`;

  const LeftIcon = (): JSX.Element | null => {
    if (iconLeft) {
      return <Icon position={'left'} icon={iconLeft} />;
    } else {
      return null;
    }
  };
  const RightIcon = (): JSX.Element | null => {
    if (iconRight) {
      return <Icon position={'right'} icon={iconRight} />;
    } else {
      return null;
    }
  };

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
