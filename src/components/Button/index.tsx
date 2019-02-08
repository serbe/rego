import classNames from "classnames";
import * as React from "react";
import { Colors, Sizes } from "src/components/vars";
// import BulmaIcon from 'components/BulmaIcon';

interface IButtonProps {
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  color?: Colors;
  size?: Sizes;
  outlined?: boolean;
  inverted?: boolean;
  rounded?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  loading?: boolean;
  isStatic?: boolean;
  disabled?: boolean;
}

interface IButtonState {
  visible: boolean;
}

class Button extends React.Component<IButtonProps, IButtonState> {
  // constructor(props: any){
  //   super(props);
  // }
  // handleEvent = () => {
  //   console.log(this.props);
  // };

  // static defaultProps: Partial<IButtonProps> = {
  //   active: true,
  // }

  // let ButtonTag: string =  this.props.isStatic ? "span" : "a";

  constructor(props: IButtonProps) {
    super(props);
    this.state = {
      visible: true
    };
  }

  public render() {
    const classes = classNames(this.props.className, "button", {
      [`is-${this.props.color}`]: this.props.color,
      [`is-${this.props.size}`]: this.props.size,
      "is-active": this.props.active,
      "is-focused": this.props.focused,
      "is-hovered": this.props.hovered,
      "is-inverted": this.props.inverted,
      "is-loading": this.props.loading,
      "is-outlined": this.props.outlined,
      "is-rounded": this.props.rounded,
      "is-static": this.props.isStatic
    });

    const ButtonTag = this.props.isStatic ? "span" : "a";

    return (
      <ButtonTag
        // {...props}
        // onClick={disabled ? undefined : onClick()}
        // disabled={this.props.disabled}
        className={classes}
      >
        {this.props.children}
      </ButtonTag>
    );
  }
}

export default Button;
