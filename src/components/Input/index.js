import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";
import Icon from "./components/Icon";

class Input extends React.Component {
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
      className,
      color,
      disable,
      focus,
      hover,
      iconLeft,
      iconRight,
      isStatic,
      loading,
      placeholder,
      readonly,
      round,
      size,
      type,
      value,
    } = this.props;

    let divClasses = cc([
      "control",
      {
        "has-icons-left": iconLeft,
        "has-icons-right": iconRight,
        "is-loading": loading,
        [`is-${size}`]: size,
      }
    ]);
    let inputClasses = cc([
      { className },
      "input",
      {
        "is-focused": focus,
        "is-hovered": hover,
        "is-rounded": round,
        "is-static": isStatic,
        [`is-${color}`]: color,
        [`is-${size}`]: size,
      }
    ]);
    let LeftIcon = null;
    if (iconLeft) {
      LeftIcon = <Icon position={"left"} icon={iconLeft} />;
    }
    let RightIcon = null;
    if (iconRight) {
      RightIcon = <Icon position={"right"} icon={iconRight} />;
    }

    return (
      <div className={divClasses}>
        <input
          className={inputClasses}
          disabled={disable}
          onClick={this.onClick}
          placeholder={placeholder}
          readonly={readonly}
          type={type}
          value={value}
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
  value: PropTypes.string,
};

Input.defaultProps = {
  type: "text"
};

export default Input;
