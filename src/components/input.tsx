import React from "react";
import clsx from "clsx";

import { Icon } from "./icon";

interface InputProps {
  type?: "text" | "password" | "email" | "tel";
  color?: "primary" | "info" | "success" | "warning" | "danger";
  size?: "small" | "normal" | "medium" | "large";
  rounded?: boolean;
  hovered?: boolean;
  focused?: boolean;
  loading?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  isStatic?: boolean;
  iconLeft?: string;
  iconRight?: string;
  className?: string;
  onClick?: React.MouseEvent<HTMLElement>;
  onChange?: React.MouseEvent<HTMLElement>;
  placeholder?: string;
  name?: string;
  value?: string;
  label?: string | boolean;
  error?: string;
  pattern?: string;
  inputRef?: any;
}

export const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    type,
    color,
    size,
    rounded,
    hovered,
    focused,
    loading,
    disabled,
    readonly,
    isStatic,
    iconLeft,
    iconRight,
    className,
    onClick,
    onChange,
    placeholder,
    name,
    value,
    label,
    error,
    pattern,
    inputRef
  } = props;

  const divClasses = clsx([
    "control",
    {
      "has-icons-left": iconLeft,
      "has-icons-right": iconRight,
      [`is-${size}`]: size
    }
  ]);

  const inputClasses = clsx([
    { className },
    "input",
    {
      [`is-${color}`]: color,
      [`is-${size}`]: size,
      "is-rounded": rounded,
      "is-hovered": hovered,
      "is-focused": focused,
      "is-loading": loading,
      "is-static": isStatic
    }
  ]);

  const getLabel = () => {
    if (typeof label === "string") {
      return label;
    } else if (label && placeholder) {
      return placeholder;
    } else {
      return undefined;
    }
  };

  const isError = () => {
    if (value && value !== "" && pattern) {
      const patt = new RegExp(pattern);
      return !patt.test(value);
    }
    return false;
  };

  const Label = () =>
    getLabel ? <label className="label">{getLabel()}</label> : null;

  const Error = () =>
    isError ? (
      <p className="help is-danger" key="InputError">
        {error}
      </p>
    ) : null;

  const LeftIcon = () =>
    iconLeft ? <Icon position={"left"} icon={iconLeft} /> : null;

  const RightIcon = () =>
    iconRight ? <Icon position={"right"} icon={iconRight} /> : null;

  return (
    <div className="field">
      <Label />
      <div className={divClasses}>
        <input
          className={inputClasses}
          type={type}
          disabled={disabled}
          onClick={() => onClick}
          onChange={() => onChange}
          placeholder={placeholder}
          readOnly={readonly}
          name={name}
          defaultValue={value}
          ref={inputRef}
        />
        <LeftIcon />
        <RightIcon />
        <Error />
      </div>
    </div>
  );
};

Input.defaultProps = {
  type: "text"
};
