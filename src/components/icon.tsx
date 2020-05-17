import React, { memo } from 'react';

interface IconProps {
  children?: Element;
  className?: string;
  color?: 'info' | 'success' | 'warning' | 'danger';
  icon: string;
  position?: 'left' | 'right';
}

export const NoMemoIcon = (properties: IconProps): JSX.Element => {
  const { children, className, color, position, icon } = properties;
  const spanClasses = `${className} icon ${color ? `has-text-${color}` : ''} ${
    position ? `is-${position}` : ''
  }`;

  return (
    <span className={spanClasses}>
      <i className={`fas fa-${icon}`}>{children}</i>
    </span>
  );
};

export const Icon = memo(NoMemoIcon);
