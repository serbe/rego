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
      type,
      color,
      size,
      round,
      hover,
      focus,
      loading,
      disable,
      readonly,
      isStatic,
      iconLeft,
      iconRight,
      value,
      placeholder,
      className
    } = this.props;

    let divClasses = cc([
      "control",
      {
        [`is-${size}`]: size,
        "has-icons-left": iconLeft,
        "has-icons-right": iconRight,
        "is-loading": loading
      }
    ]);
    let inputClasses = cc([
      { className },
      "input",
      {
        [`is-${color}`]: color,
        [`is-${size}`]: size,
        "is-rounded": round,
        "is-hovered": hover,
        "is-focused": focus,
        "is-static": isStatic
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
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disable}
          readonly={readonly}
          className={inputClasses}
          onClick={this.onClick}
        />
        <LeftIcon />
        <RightIcon />
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf("text", "password", "email", "tel"),
  color: PropTypes.oneOf("primary", "info", "success", "warning", "danger"),
  size: PropTypes.oneOf("small", "normal", "medium", "large"),
  round: PropTypes.bool,
  hover: PropTypes.bool,
  focus: PropTypes.bool,
  loading: PropTypes.bool,
  disable: PropTypes.bool,
  readonly: PropTypes.bool,
  isStatic: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

Input.defaultProps = {
  type: "text"
};

export default Input;
