import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { Icon } from './icon';

export type StringInputProperties = {
  value: string;
  setter: (value: string) => void;
};

export type NumberInputProperties = {
  value: number;
  setter: (value: number) => void;
};

export type BooleanInputProperties = {
  value: boolean;
  setter: (value: boolean) => void;
};

interface InputProps {
  className?: string;
  classNameDiv?: string;
  disabled?: boolean;
  icon?: string;
  iconRight?: string;
  name: string;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  placeholder?: string;
  readonly?: boolean;
  type?: 'text' | 'password' | 'email' | 'tel';
  value?: string;
}

export const Input = (properties: InputProps): JSX.Element => {
  const {
    className,
    classNameDiv,
    disabled,
    icon,
    iconRight,
    name,
    onBlur,
    onChange,
    onClick,
    placeholder,
    readonly,
    type,
    value,
  } = properties;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const divClasses = `control ${classNameDiv || ''} ${icon ? 'has-icons-left' : ''} ${
    iconRight ? 'has-icons-right' : ''
  }`;

  return (
    <div className={divClasses}>
      <input
        className={`${className || ''} input`}
        defaultValue={inputValue}
        disabled={disabled}
        id={name}
        key={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        readOnly={readonly}
        type={type}
      />
      {icon && <Icon position={'left'} icon={icon} />}
      {iconRight && <Icon position={'right'} icon={iconRight} />}
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
};
