import React, { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import { Icon } from './icon';

interface InputProps {
  name: string;
  className?: string;
  classNameDiv?: string;
  value?: string;
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

export const NoMemoInput = (properties: InputProps): JSX.Element => {
  const {
    name,
    className,
    classNameDiv,
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

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value ? value : '');
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
    if (onChange) onChange(event);
  };

  const divClasses = `${classNameDiv ? classNameDiv : ''} control ${icon ? 'has-icons-left' : ''} ${
    iconRight ? 'has-icons-right' : ''
  }`;

  return (
    <div className={divClasses}>
      <input
        name={name}
        id={name}
        key={name}
        className={`${className ? className : ''} input`}
        disabled={disabled}
        onClick={onClick}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readonly}
        type={type}
        value={inputValue}
      />
      {icon && <Icon position={'left'} icon={icon} />}
      {iconRight && <Icon position={'right'} icon={iconRight} />}
    </div>
  );
};

NoMemoInput.defaultProps = {
  type: 'text',
};

export const Input = React.memo(NoMemoInput);
