import React from 'react';

export interface IconProperties {
  children?: Element;
  className?: string;
  color?: 'info' | 'success' | 'warning' | 'danger';
  icon: string;
  position?: 'left' | 'right';
}

export const Icon = (properties: IconProperties): JSX.Element => {
  const { children, className, color, position, icon } = properties;
  const spanClasses = `icon ${className || ''} ${color ? `has-text-${color}` : ''} ${
    position ? `is-${position}` : ''
  }`;

  return (
    <span className={spanClasses}>
      <i className={`fas fa-${icon}`}>{children}</i>
    </span>
  );
};
