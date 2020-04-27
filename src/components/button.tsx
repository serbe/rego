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
    light,
    loading,
    outlined,
    rounded,
    type,
    onClick,
  } = properties;

  const classes = `button ${className ? className : ''} ${active ? 'is-active' : ''} ${
    focused ? 'is-focused' : ''
  } ${fullwidth ? 'is-fullwidth' : ''} ${hovered ? 'is-hovered' : ''} ${
    inverted ? 'is-inverted' : ''
  } ${light ? 'is-light' : ''} ${loading ? 'is-loading' : ''} ${outlined ? 'is-outlined' : ''} ${
    rounded ? 'is-rounded' : ''
  } ${color ? `is-${color}` : ''}`;

  const AButton = (): JSX.Element => (
    <a href={href} onClick={onClick} className={classes}>
      {children}
    </a>
  );
  const SRButton = (): JSX.Element => (
    <input type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </input>
  );
  const NButton = (): JSX.Element => (
    <button disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );

  if (type === 'submit' || type === 'reset') {
    return <SRButton />;
  }
  if (type === 'a') {
    return <AButton />;
  }
  return <NButton />;
};

Button.defaultProps = {
  type: 'button',
  color: 'white',
};
