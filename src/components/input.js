import React from "react";

import Icon from "./icon";
import PropTypes from "prop-types";
import clsx from "clsx";

class Input extends React.Component {
  render() {
    const {
      className,
      color,
      disable,
      focus,
      hover,
      iconLeft,
      iconRight,
      isStatic,
      loading,
      onClick,
      placeholder,
      readonly,
      round,
      size,
      type,
      value
    } = this.props;

    const divClasses = clsx([
      "control",
      {
        "has-icons-left": iconLeft,
        "has-icons-right": iconRight,
        "is-loading": loading,
        [`is-${size}`]: size
      }
    ]);
    const inputClasses = clsx([
      { className },
      "input",
      {
        "is-focused": focus,
        "is-hovered": hover,
        "is-rounded": round,
        "is-static": isStatic,
        [`is-${color}`]: color,
        [`is-${size}`]: size
      }
    ]);
    const LeftIcon = () => {
      if (iconLeft) {
        return <Icon position={"left"} icon={iconLeft} />;
      } else {
        return null;
      }
    };
    const RightIcon = () => {
      if (iconRight) {
        return <Icon position={"right"} icon={iconRight} />;
      } else {
        return null;
      }
    };

    return (
      <div className={divClasses}>
        <input
          className={inputClasses}
          disabled={disable}
          onClick={onClick}
          placeholder={placeholder}
          readOnly={readonly}
          type={type}
          defaultValue={value}
        />
        <LeftIcon />
        <RightIcon />
      </div>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  disable: PropTypes.bool,
  focus: PropTypes.bool,
  hover: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  isStatic: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  round: PropTypes.bool,
  size: PropTypes.oneOf(["small", "normal", "medium", "large"]),
  type: PropTypes.oneOf(["text", "password", "email", "tel"]),
  value: PropTypes.string
};

Input.defaultProps = {
  type: "text"
};

export default Input;
