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

export const Button = (properties: ButtonProps): JSX.Element => {
  const { children, className, disabled, href, onClick } = properties;

  const classes = `button ${className ? className : ''}`;

  const Link = (): JSX.Element => (
    <a href={href} onClick={onClick} className={classes}>
      {children}
    </a>
  );
  const Button = (): JSX.Element => (
    <button disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );

  if (href) {
    return <Link />;
  }
  return <Button />;
};
