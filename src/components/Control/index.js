import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

class Control extends React.Component {
  render() {
    const {
      children,
      className,
      // href,
      // onClick,
      isP,
      // color,
      size,
      leftIcon,
      rightIcon,
      // rounded,
      // hovered,
      // focused,
      // active,
      loading,
      // isStatic,
      // disabled,
      ...props
    } = this.props;
    const Tag = isP ? "p" : "div";

    return (
      <Tag
        {...props}
        // disabled={disabled}
        // onClick={disabled ? undefined : onClick}
        className={cc([
          { className },
          "control",
          {
            // [`is-${color}`]: color,
            [`is-${size}`]: size,
            // 'is-outlined': outlined,
            // 'is-inverted': inverted,
            // 'is-rounded': rounded,
            // 'is-hovered': hovered,
            // 'is-focused': focused,
            // 'is-active': active,
            "is-loading": loading
            // 'is-static': isStatic
          }
        ])}
      >
        {children}
      </Tag>
    );
  }
}

// static defaultProps = {
// 	children: null,
// 	className: '',
// 	// href: '',
// 	// onClick: () => null,
// 	isP: false,
// 	// color: null,
// 	size: null,
// 	leftIcon: null,
// 	rightIcon: null,
// 	// outlined: false,
// 	// inverted: false,
// 	// rounded: false,
// 	// hovered: false,
// 	// focused: false,
// 	// active: false,
// 	loading: false,
// 	// isStatic: false,
// 	// disabled: false
// };

Control.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  // onClick: PropTypes.func,
  isP: PropTypes.bool,
  // color: PropTypes.oneOf('white', 'light', 'dark', 'text', 'primary', 'link', 'info', 'success', 'warning', 'danger'),
  size: PropTypes.oneOf("small", "medium", "large"),
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  // outlined: PropTypes.bool,
  // inverted: PropTypes.bool,
  // rounded: PropTypes.bool,
  // hovered: PropTypes.bool,
  // focused: PropTypes.bool,
  // active: PropTypes.bool,
  loading: PropTypes.bool
  // isStatic: PropTypes.bool,
  // disabled: PropTypes.bool
};

export default Control;
