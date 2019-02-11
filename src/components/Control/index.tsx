import classNames from "classnames";
import * as React from "react";

interface IControlProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler;
  isPTag: boolean;
  // color: PropTypes.oneOf('white', 'light', 'dark', 'text', 'primary', 'link', 'info', 'success', 'warning', 'danger'),
  size?: "small" | "medium" | "large";
  leftIcon: string;
  rightIcon: string;
  // outlined?: boolean;
  // inverted?: boolean;
  // rounded?: boolean;
  // hovered?: boolean;
  // focused?: boolean;
  // active?: boolean;
  loading?: boolean;
  // isStatic?: boolean;
  // disabled?: boolean;
}

interface IControlState {
  visible: boolean;
}

class Control extends React.Component<IControlProps, IControlState> {
  constructor(props: IControlProps) {
    super(props);
    this.state = {
      visible: true
    };
  }

  public render() {
    const classes = classNames(this.props.className, "control", {
      // [`is-${color}`]: color,
      [`is-${this.props.size}`]: this.props.size,
      // 'is-outlined': outlined,
      // 'is-inverted': inverted,
      // 'is-rounded': rounded,
      // 'is-hovered': hovered,
      // 'is-focused': focused,
      // 'is-active': active,
      "is-loading": this.props.loading
      // 'is-static': isStatic
    });

    const ControlTag = this.props.isPTag ? "p" : "div";

    return (
      <ControlTag
        // disabled={disabled}
        // onClick={disabled ? undefined : onClick}
        className={classes}
      >
        {this.props.children}
      </ControlTag>
    );
  }
}

export default Control;
