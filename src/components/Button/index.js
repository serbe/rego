import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    let {
      type,
      color,
      size,
      fullwidth,
      outline,
      invert,
      round,
      hover,
      focus,
      active,
      loading,
      isStatic,
      disable,
      className,
      children
    } = this.props;

    let Tag = type;
    if (isStatic) {
      Tag = "span";
    } else if (type === "submit" || type === "reset") {
      Tag = "input";
    }

    let classes = cc([
      { className },
      "button",
      {
        [`is-${color}`]: color,
        [`is-${size}`]: size,
        "is-fullwidth": fullwidth,
        "is-outlined": outline,
        "is-inverted": invert,
        "is-rounded": round,
        "is-hovered": hover,
        "is-focused": focus,
        "is-active": active,
        "is-loading": loading,
        "is-static": isStatic
      }
    ]);

    return (
      <Tag
        disabled={disable}
        onClick={this.onClick}
        className={classes}
      >
        {children}
      </Tag>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf("a", "button", "submit", "reset"),
  color: PropTypes.oneOf(
    "white",
    "light",
    "dark",
    "text",
    "black",
    "primary",
    "link",
    "info",
    "success",
    "warning",
    "danger"
  ),
  size: PropTypes.oneOf("small", "normal", "medium", "large"),
  fullwidth: PropTypes.bool,
  outline: PropTypes.bool,
  invert: PropTypes.bool,
  round: PropTypes.bool,
  hover: PropTypes.bool,
  focus: PropTypes.bool,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  isStatic: PropTypes.bool,
  disable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
  children: PropTypes.node
  // innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
};

Button.defaultProps = {
  type: "a",
  color: "white"
};

export default Button;
