import Input from "./input";
import PropTypes from "prop-types";
import React, {Component} from "react";
// import cc from "classcat";

class Field extends Component {
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
      label,
      loading,
      onClick,
      placeholder,
      readonly,
      round,
      size,
      type,
      value
    } = this.props;
    const Label = () => {
      if (label) {
        if (label !== true) {
          return <label className="label">{label}</label>
        } else {
          return <label className="label">{placeholder}</label>
        }
      } else {
        return null;
      }
    }

    return (
      <div className="field">
        <Label />
        <Input
          className={className}
          color={color}
          disable={disable}
          focus={focus}
          hover={hover}
          iconLeft={iconLeft}
          iconRight={iconRight}
          isStatic={isStatic}
          loading={loading}
          onClick={onClick}
          placeholder={placeholder}
          readonly={readonly}
          round={round}
          size={size}
          type={type}
          value={value}
        />
      </div>
    );
  }
}

Field.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  disable: PropTypes.bool,
  focus: PropTypes.bool,
  hover: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  isStatic: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  round: PropTypes.bool,
  size: PropTypes.oneOf(["small", "normal", "medium", "large"]),
  type: PropTypes.oneOf(["text", "password", "email", "tel"]),
  value: PropTypes.string
};

Field.defaultProps = {
  type: "text"
};

export default Field;
