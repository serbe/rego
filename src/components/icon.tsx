import React from 'react';

interface IconProps {
  children?: Element;
  className?: string;
  color?: 'info' | 'success' | 'warning' | 'danger';
  icon: string;
  position?: 'left' | 'right';
}

export const Icon = (properties: IconProps): JSX.Element => {
  const { children, className, color, position, icon } = properties;

  const spanClasses = `${className} icon ${color ? `has-text-${color}` : ''} ${
    position ? `is-${position}` : ''
  }`;
  const iClasses = `fas fa-${icon}`;

  return (
    <span className={spanClasses}>
      <i className={iClasses}>{children}</i>
    </span>
  );
};
