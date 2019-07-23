import React from "react";

import PropTypes from "prop-types";
import clsx from "clsx";

class Icon extends React.Component {
  render() {
    const { children, className, color, size, position, icon } = this.props;

    const spanClasses = clsx([
      { className },
      "icon",
      {
        [`has-text-${color}`]: color,
        [`is-${position}`]: position,
        [`is-${size}`]: size,
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

Icon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(["info", "success", "warning", "danger"]),
  icon: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["left", "right"]),
  size: PropTypes.oneOf(["small", "normal", "medium", "large"]),
};

export default Icon;
