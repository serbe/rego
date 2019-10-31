import React from "react";
import clsx from "clsx";

import { Icon } from "./icon";

interface InputProps {
  type: "text" | "password" | "email" | "tel";
  color: "primary" | "info" | "success" | "warning" | "danger";
  size: "small" | "normal" | "medium" | "large";
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
  value: string;
  label?: string;
  error?: string;
  pattern?: string;
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
    value,
    label,
    error,
    pattern
  } = props;
  const divClasses = clsx([
    "control",
    {
      "has-icons-left": iconLeft,
      "has-icons-right": iconRight,
      [`is-${size}`]: size
    }
  ]);
  let cn = className;
  const inputClasses = clsx([
    { cn },
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
    if (label && placeholder && label === "") {
      return placeholder;
    } else {
      return label;
    }
  };
  const isError = () => {
    if (value !== "" && pattern) {
      const patt = new RegExp(pattern);
      return !patt.test(value);
    }
    return false;
  };
  const Label = () =>
    getLabel ? (
      <label className="label" key="InputLabel">
        {getLabel}
      </label>
    ) : null;
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
          value={value}
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
