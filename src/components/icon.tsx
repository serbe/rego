import React from "react";

import clsx from "clsx";

interface IIconProps {
  children?: Element;
  className?: string;
  color?: "info" | "success" | "warning" | "danger";
  icon: string;
  position?: "left" | "right";
  size?: "small" | "normal" | "medium" | "large";
}

class Icon extends React.Component<IIconProps> {
  render() {
    const { children, className, color, size, position, icon } = this.props;

    const spanClasses = clsx([
      { className },
      "icon",
      {
        [`has-text-${color}`]: color,
        [`is-${position}`]: position,
        [`is-${size}`]: size
      }
    ]);

    const iClasses = clsx(["fas", { [`fa-${icon}`]: icon }]);

    return (
      <span className={spanClasses}>
        <i className={iClasses}>{children}</i>
      </span>
    );
  }
}
