import React, { FC } from 'react';

interface IconProps {
  children?: Element;
  className?: string;
  color?: 'info' | 'success' | 'warning' | 'danger';
  icon: string;
  position?: 'left' | 'right';
  size?: 'small' | 'normal' | 'medium' | 'large';
}

export const Icon: FC<IconProps> = (properties: IconProps) => {
  const { children, className, color, size, position, icon } = properties;

  const colorStyle = color ? `has-text-${color}` : '';
  const positionStyle = position ? `is-${position}` : '';
  const sizeStyle = size ? `is-${size}` : '';

  const spanClasses = `${className} icon ${colorStyle} ${positionStyle} ${sizeStyle}`;

  const iClasses = `fas fa-${icon}`;

  return (
    <span className={spanClasses}>
      <i className={iClasses}>{children}</i>
    </span>
  );
};
