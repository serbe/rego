import classNames from "classnames";
import * as React from "react";
import { FiveColors, InputTypes, Sizes } from "src/components/vars";

interface IInputProps {
  value?: string;
  placeholder?: string;

  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
  className?: string;
  type?: InputTypes;
  color?: FiveColors;
  size?: Sizes;
  rounded?: boolean;
  hovered?: boolean;
  focused?: boolean;
  loading?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  isStatic?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

class Input extends React.Component<IInputProps> {
  constructor(props: IInputProps) {
    super(props);
  }

  public render() {
    // const type = this.props.type ? "text" : this.props.type;
    const classes = classNames(this.props.className, "input", {
      [`is-${this.props.color}`]: this.props.color,
      [`is-${this.props.size}`]: this.props.size,
      "is-focused": this.props.focused,
      "is-hovered": this.props.hovered,
      "is-rounded": this.props.rounded,
      "is-static": this.props.isStatic
    });

    return (
      <input
        // {...props}
        // type={type}
        value={this.props.value}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        // onClick={this.props.disabled ? undefined : onClick()}
        // readonly={this.props.readonly}
        className={classes}
      />
    );
  }
}

export default Input;
