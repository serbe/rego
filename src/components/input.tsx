import React from "react";
import Icon from "./icon";
import clsx from "clsx";

interface IInputProps {
  className?: string,
  color?: "primary" | "info" | "success" | "warning" | "danger",
  disable?: boolean,
  focus?: boolean,
  hover?: boolean,
  iconLeft?: string,
  iconRight?: string,
  isStatic?: boolean,
  loading?: boolean,
  onClick?: any,
  onChange?: any,
  placeholder?: string,
  readonly?: boolean,
  round?: boolean,
  size?: "small" | "normal" | "medium" | "large",
  type?: "text" | "password" | "email" | "tel",
  value?: string
};

export class Input extends React.Component<IInputProps> {
  static defaultProps: Partial<IInputProps> = {
    type: "text"
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
      onClick,
      onChange,
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
          onChange={onChange}
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
