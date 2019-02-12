import { Component } from "react";
import PropTypes from "prop-types";
import cc from "classcat";

class Icon extends Component {
  render() {
    const { children, className, color, size, icon } = this.props;

    let spanClasses = cc([
      { className },
      "icon",
      {
        [`has-text-${color}`]: color,
        [`is-${size}`]: size
      }
    ]);

    let iClasses = cc(["fas", { [`fa-${icon}`]: icon }]);

    return (
      <span className={spanClasses}>
        <i className={iClasses}>{children}</i>
      </span>
    );
  }
}

Icon.propTypes = {
  color: PropTypes.oneOf("info", "success", "warning", "danger"),
  size: PropTypes.oneOf("small", "normal", "medium", "large"),
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};

export default Icon;
