import classNames from "classnames";
import * as React from "react";
import { FourColors, Sizes } from "src/components/vars";

interface IIconProps {
  children?: React.ReactNode;
  className?: string;
  icon: string;
  color?: FourColors;
  size?: Sizes;
}

export default class Icon extends React.Component<IIconProps> {
  constructor(props: IIconProps) {
    super(props);
  }

  public render() {
    const spanClasses = classNames(this.props.className, "icon", {
      [`has-text-${this.props.color}`]: this.props.color,
      [`is-${this.props.size}`]: this.props.size
    });

    const iconClasses = classNames("fas", {
      [`fa-${this.props.icon}`]: this.props.icon
    });

    return (
      <span className={spanClasses}>
        <i className={iconClasses}>{this.props.children}</i>
      </span>
    );
  }
}
