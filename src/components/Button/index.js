import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

class Button extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {inputType: ""};
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
      active,
      children,
      className,
      color,
      disable,
      focus,
      fullwidth,
      hover,
      href,
      invert,
      isStatic,
      loading,
      outline,
      round,
      size,
      type,
    } = this.props;

    let classes = cc([
      { className },
      "button",
      {
        "is-active": active,
        "is-focused": focus,
        "is-fullwidth": fullwidth,
        "is-hovered": hover,
        "is-inverted": invert,
        "is-loading": loading,
        "is-outlined": outline,
        "is-rounded": round,
        "is-static": isStatic,
        [`is-${color}`]: color,
        [`is-${size}`]: size,
      }
    ]);

    const Tag = () => {
      if (isStatic) {
        return <span disabled={disable} onClick={this.onClick} className={classes}>{children}</span>
      } else if (type === "submit" || type === "reset") {
        return <input type={type} disabled={disable} onClick={this.onClick} className={classes}>{children}</input>
      } else if (type === "a") {
        return <a href={href} disabled={disable} onClick={this.onClick} className={classes}>{children}</a>
      } else {
        return <button disabled={disable} onClick={this.onClick} className={classes}>{children}</button>
      }
    }



    return (
      <Tag disabled={disable} onClick={this.onClick} className={classes}>

      </Tag>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(["a", "button", "submit", "reset"]),
  color: PropTypes.oneOf([
    "black",
    "danger",
    "dark",
    "info",
    "light",
    "link",
    "primary",
    "success",
    "text",
    "warning",
    "white",
  ]),
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  disable: PropTypes.bool,
  focus: PropTypes.bool,
  fullwidth: PropTypes.bool,
  hover: PropTypes.bool,
  href: PropTypes.string,
  invert: PropTypes.bool,
  isStatic: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  outline: PropTypes.bool,
  round: PropTypes.bool,
  size: PropTypes.oneOf(["small", "normal", "medium", "large"]),
};

Button.defaultProps = {
  type: "a",
  color: "white"
};

export default Button;
