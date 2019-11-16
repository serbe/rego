import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface IconProps {
  color?: 'info' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'normal' | 'medium' | 'large';
  icon: string;
  position: 'left' | 'right';
  children?: ReactNode;
  className?: string;
}

export const Icon: FC<IconProps> = (properties: IconProps) => {
  const { color, size, icon, position, children, className } = properties;

  const spanClasses = clsx([
    { className },
    'icon',
    {
      [`has-text-${color}`]: color,
      [`is-${position}`]: position,
      [`is-${size}`]: size,
    },
  ]);

  const iClasses = clsx(['fas', `fa-${icon}`]);

  return (
    <span className={spanClasses}>
      <i className={iClasses}>{children}</i>
    </span>
  );
};
