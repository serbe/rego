import React, { ChangeEvent, MouseEvent } from 'react';
import { Icon } from './icon';

interface InputProps {
  name: string;
  id?: string;
  key?: string;
  className?: string;
  classNameDiv?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  icon?: string;
  iconRight?: string;
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  type?: 'text' | 'password' | 'email' | 'tel';
}

export const Input = (properties: InputProps): JSX.Element => {
  const {
    name,
    id,
    key,
    className,
    classNameDiv,
    defaultValue,
    disabled,
    icon,
    iconRight,
    onClick,
    onChange,
    onBlur,
    placeholder,
    readonly,
    type,
    value,
  } = properties;

  const divClasses = `${classNameDiv ? classNameDiv : ''} control ${icon ? 'has-icons-left' : ''} ${
    iconRight ? 'has-icons-right' : ''
  }`;

  const inputClasses = `${className ? className : ''} input`;

  const LeftIcon = (): JSX.Element | null => (icon ? <Icon position={'left'} icon={icon} /> : null);

  const RightIcon = (): JSX.Element | null =>
    iconRight ? <Icon position={'right'} icon={iconRight} /> : null;

  return (
    <div className={divClasses}>
      <input
        name={name}
        id={id ? id : name}
        key={key ? key : name}
        className={inputClasses}
        disabled={disabled}
        onClick={onClick}
        onChange={onChange}
        onBlur={onBlur}
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
