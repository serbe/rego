import React, { MouseEvent } from 'react';

interface ButtonProps {
  children?: string;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (
    event: MouseEvent<
      HTMLAnchorElement | HTMLButtonElement | HTMLInputElement,
      globalThis.MouseEvent
    >,
  ) => void;
}

export const Button = (properties: ButtonProps): JSX.Element => {
  const { children, className, disabled, href, onClick } = properties;
  const classes = `button ${className || ''}`;

  return href ? (
    <a href={href} onClick={onClick} className={classes}>
      {children}
    </a>
  ) : (
    <button disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
