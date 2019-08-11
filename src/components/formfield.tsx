import React from "react";

import { Input } from "./input";

interface IFormFieldProps {
  className: string;
  color?: "primary" | "info" | "success" | "warning" | "danger";
  disable?: boolean;
  focus?: boolean;
  hover?: boolean;
  iconLeft?: string;
  iconRight?: string;
  isStatic?: boolean;
  label?: string | boolean;
  loading?: boolean;
  onClick?: Function;
  onChange?: Function;
  placeholder?: string;
  readonly?: boolean;
  round?: boolean;
  size?: "small" | "normal" | "medium" | "large";
  type?: "text" | "password" | "email" | "tel";
  value: string;
}

export class FormField extends React.Component<IFormFieldProps> {
  static defaultProps: Partial<IFormFieldProps> = {
    type: "text"
  };

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
      onChange,
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
          return <label className="label">{label}</label>;
        } else {
          return <label className="label">{placeholder}</label>;
        }
      } else {
        return null;
      }
    };

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
          onChange={onChange}
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
