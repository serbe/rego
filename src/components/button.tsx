import React, { MouseEvent } from 'react';

interface ButtonProps {
  children?: string;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (
    event: React.MouseEvent<
      HTMLAnchorElement | HTMLButtonElement | HTMLInputElement,
      globalThis.MouseEvent
    >,
  ) => void;
}

const NoMemoButton = (properties: ButtonProps): JSX.Element => {
  const { children, className, disabled, href, onClick } = properties;
  const classes = `button ${className ? className : ''}`;

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

export const Button = React.memo(NoMemoButton);
