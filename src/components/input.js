import Icon from "./icon";
import PropTypes from "prop-types";
import React from "react";
import cc from "classcat";

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
      placeholder,
      readonly,
      round,
      size,
      type,
      value
    } = this.props;

    const divClasses = cc([
      "control",
      {
        "has-icons-left": iconLeft,
        "has-icons-right": iconRight,
        "is-loading": loading,
        [`is-${size}`]: size
      }
    ]);
    const inputClasses = cc([
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
  value: PropTypes.string
};

Input.defaultProps = {
  type: "text"
};

export default Input;
