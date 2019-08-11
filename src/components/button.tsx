import React, { Component } from "react";

import clsx from "clsx";

interface IButtonProps {
  type: "a" | "button" | "submit" | "reset";
  color:
    | "black"
    | "danger"
    | "dark"
    | "info"
    | "light"
    | "link"
    | "primary"
    | "success"
    | "text"
    | "warning"
    | "white";
  active: boolean;
  children: string;
  className: string;
  disable: boolean;
  focus: boolean;
  fullwidth: boolean;
  hover: boolean;
  href: string;
  invert: boolean;
  isStatic: boolean;
  loading: boolean;
  onClick?: any;
  outline: boolean;
  round: boolean;
  size: "small" | "normal" | "medium" | "large";
}

export class Button extends Component<IButtonProps> {
  static defaultProps: Partial<IButtonProps> = {
    type: "button",
    color: "white"
  };

  // constructor(props) {
  //   super(props);
  //   // this.onClick = this.onClick.bind(this);
  // }

  // function onClick(e) {
  //   if (this.props.disabled) {
  //     e.preventDefault();
  //     return;
  //   }

  //   if (this.props.onClick) {
  //     this.props.onClick(e);
  //   }
  // }

  render() {
    const {
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
      onClick
    } = this.props;

    const classes = clsx([
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
        [`is-${size}`]: size
      }
    ]);

    const Tag = () => {
      if (isStatic) {
        return (
          <span onClick={onClick} className={classes}>
            {children}
          </span>
        );
      } else if (type === "submit" || type === "reset") {
        return (
          <input
            type={type}
            disabled={disable}
            onClick={onClick}
            className={classes}
          >
            {children}
          </input>
        );
      } else if (type === "a") {
        return (
          <a href={href} onClick={onClick} className={classes}>
            {children}
          </a>
        );
      } else {
        return (
          <button disabled={disable} onClick={onClick} className={classes}>
            {children}
          </button>
        );
      }
    };

    return <Tag />;
  }
}
