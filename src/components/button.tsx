import React, { FC, MouseEvent } from 'react';

interface ButtonProps {
  type?: 'a' | 'button' | 'submit' | 'reset';
  color?:
    | 'black'
    | 'danger'
    | 'dark'
    | 'info'
    | 'light'
    | 'link'
    | 'primary'
    | 'success'
    | 'text'
    | 'warning'
    | 'white';
  active?: boolean;
  children?: string;
  className?: string;
  disabled?: boolean;
  focused?: boolean;
  fullwidth?: boolean;
  hovered?: boolean;
  href?: string;
  inverted?: boolean;
  isStatic?: boolean;
  light?: boolean;
  loading?: boolean;
  onClick?: (
    event: React.MouseEvent<
      HTMLAnchorElement | HTMLButtonElement | HTMLInputElement,
      globalThis.MouseEvent
    >,
  ) => void;
  outlined?: boolean;
  rounded?: boolean;
  size?: 'small' | 'normal' | 'medium' | 'large';
}

export const Button: FC<ButtonProps> = (properties: ButtonProps) => {
  const {
    active,
    children,
    className,
    color,
    disabled,
    focused,
    fullwidth,
    hovered,
    href,
    inverted,
    isStatic,
    light,
    loading,
    outlined,
    rounded,
    size,
    type,
    onClick,
  } = properties;

  const colorClass = color ? `is-${color}` : '';
  const sizeClass = size ? `is-${size}` : '';

  const classes = `button ${className ? className : ''} ${active ? 'is-active' : ''} ${
    focused ? 'is-focused' : ''
  } ${fullwidth ? 'is-fullwidth' : ''} ${hovered ? 'is-hovered' : ''} ${
    inverted ? 'is-inverted' : ''
  } ${light ? 'is-light' : ''} ${loading ? 'is-loading' : ''} ${outlined ? 'is-outlined' : ''} ${
    rounded ? 'is-rounded' : ''
  } ${isStatic ? 'is-static' : ''} ${colorClass} ${sizeClass}`;

  const Tag = (): JSX.Element => {
    if (isStatic) {
      return (
        <span role="button" className={classes} tabIndex={-1} onClick={onClick}>
          {children}
        </span>
      );
    } else if (type === 'submit' || type === 'reset') {
      return (
        <input type={type} disabled={disabled} onClick={onClick} className={classes}>
          {children}
        </input>
      );
    } else if (type === 'a') {
      return (
        <a href={href} onClick={onClick} className={classes}>
          {children}
        </a>
      );
    } else {
      return (
        <button disabled={disabled} onClick={onClick} className={classes}>
          {children}
        </button>
      );
    }
  };

  return <Tag />;
};

Button.defaultProps = {
  type: 'button',
  color: 'white',
};
