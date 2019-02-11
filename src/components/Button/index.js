import React, { Component } from "react";
import PropTypes from "prop-types";
import cc from "classcat";
// import BulmaIcon from 'components/BulmaIcon';

const propTypes = {
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
  size: PropTypes.oneOf("small", "medium", "large"),
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
  click: PropTypes.func,
  href: PropTypes.string,
  children: PropTypes.node,
  // innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
};

const defaultProps = {
  type: "a",
  color: "white",
};

class Button extends Component {
  // handleEvent = () => {
  //   console.log(this.props);
  // };

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
      click,
      href,
      children
    } = this.props;

    if type == "submit"
    let Tag = isStatic ? "span" : "a";

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
      <Button
        // {...props}
        disabled={disable}
        onClick={disable ? undefined : click()}
        className={classes}
      >
        {children}
      </Button>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;