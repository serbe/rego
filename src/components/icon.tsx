import clsx from 'clsx';

export interface IconProperties {
  children?: Element;
  className?: string;
  color?: 'info' | 'success' | 'warning' | 'danger';
  icon: string;
  position?: 'left' | 'right';
}

export const Icon = (properties: IconProperties): JSX.Element => {
  const { children, className, color, position, icon } = properties;
  const spanClass = clsx('icon', className, {
    [`has-text-${color}`]: color,
    [`is-${position}`]: position,
  });
  const iconClass = clsx('fas', { [`fa-${icon}`]: icon });

  return (
    <span className={spanClass}>
      <i className={iconClass}>{children}</i>
    </span>
  );
};
