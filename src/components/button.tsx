import React, { ReactNode, FC, MouseEvent } from 'react';
import clsx from 'clsx';

type MainColorsType = 'primary' | 'info' | 'success' | 'warning' | 'danger';

const mainColors = ['primary', 'info', 'success', 'warning', 'danger'];

interface ButtonProps {
  type?: 'a' | 'button' | 'submit' | 'reset';
  color?: 'white' | 'light' | 'dark' | 'black' | 'text' | 'link' | MainColorsType;
  light?: boolean;
  dark?: boolean;
  size?: 'small' | 'normal' | 'medium' | 'large';
  fullwidth?: boolean;
  outlined?: boolean;
  inverted?: boolean;
  rounded?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  loading?: boolean;
  isStatic?: boolean;
  disable?: boolean;
  className?: string;
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = (properties: ButtonProps) => {
  const {
    type,
    color,
    light,
    dark,
    size,
    fullwidth,
    outlined,
    inverted,
    rounded,
    hovered,
    focused,
    active,
    loading,
    isStatic,
    disable,
    className,
    href,
    onClick,
    children,
  } = properties;
  const classes = clsx([
    { className },
    'button',
    {
      [`is-${color}`]: color,
      'is-light': color && light && mainColors.includes(color),
      'is-dark': color && dark && mainColors.includes(color),
      [`is-${size}`]: size,
      'is-fullwidth': fullwidth,
      'is-outlined': outlined,
      'is-inverted': inverted,
      'is-rounded': rounded,
      'is-hovered': hovered,
      'is-focused': focused,
      'is-active': active,
      'is-loading': loading,
      'is-static': isStatic,
    },
  ]);

  const Tag = (): JSX.Element => {
    if (isStatic) {
      return (
        <span onClick={onClick} className={classes}>
          text
        </span>
      );
    }
    if (type === 'submit' || type === 'reset') {
      return <input type={type} disabled={disable} onClick={onClick} className={classes} />;
    }
    if (type === 'a') {
      return (
        <a href={href} onClick={onClick} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <button type="button" disabled={disable} onClick={onClick} className={classes}>
        {children}
      </button>
    );
  };

  return <Tag />;
};

Button.defaultProps = {
  type: 'button',
  color: 'white',
};
