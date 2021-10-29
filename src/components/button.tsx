import clsx from 'clsx';
import { MouseEvent } from 'react';

interface ButtonProperties {
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

export const Button = ({
  children,
  className,
  disabled,
  href,
  onClick,
}: ButtonProperties): JSX.Element => {
  const buttonClass = clsx(`button`, className);

  return href ? (
    <a href={href} onClick={onClick} className={buttonClass}>
      {children}
    </a>
  ) : (
    <button type="button" disabled={disabled} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};
