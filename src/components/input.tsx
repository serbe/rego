import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

import { Icon } from './icon';

export interface StringInputProperties {
  value?: string;
  setter: (value?: string) => void;
}

export interface NumberInputProperties {
  value?: number;
  setter: (value?: number) => void;
}

export interface BooleanInputProperties {
  value: boolean;
  setter: (value: boolean) => void;
}

interface InputProperties {
  autocomplete?: string;
  className?: string;
  classNameDiv?: string;
  disabled?: boolean;
  icon?: string;
  iconRight?: string;
  name: string;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  type?: 'text' | 'password' | 'email' | 'tel';
  value?: number | string;
}

export const Input = ({
  autocomplete,
  className,
  classNameDiv,
  disabled,
  icon,
  iconRight,
  name,
  onBlur,
  onChange,
  onClick,
  onKeyPress,
  placeholder,
  readonly,
  type,
  value,
}: InputProperties): JSX.Element => {
  const divClass = clsx(
    `control`,
    classNameDiv,
    { 'has-icons-left': icon },
    { 'has-icons-right': iconRight },
  );

  return (
    <div className={divClass}>
      <input
        autoComplete={autocomplete}
        className={`${className || ''} input`}
        defaultValue={value}
        disabled={disabled}
        id={name}
        key={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        readOnly={readonly}
        type={type}
      />
      {icon && <Icon position="left" icon={icon} />}
      {iconRight && <Icon position="right" icon={iconRight} />}
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
};
