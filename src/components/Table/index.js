import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

export default class BulmaTable extends React.Component {
  static propTypes = {
    bordered: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    fullwidth: PropTypes.bool,
    hoverable: PropTypes.bool,
    narrow: PropTypes.bool,
    striped: PropTypes.bool,
  };

  static defaultProps = {
    bordered: false,
    children: null,
    className: "",
    fullwidth: false,
    hoverable: false,
    narrow: false,
    striped: false,
  };

  render() {
    const {
      bordered,
      children,
      className,
      fullwidth,
      hoverable,
      narrow,
      striped,
      ...props
    } = this.props;

    return (
      <table
        {...props}
        className={cc([
          { className },
          "button",
          {
            "is-bordered": bordered,
            "is-fullwidth": fullwidth,
            "is-hoverable": hoverable,
            "is-narrow": narrow,
            "is-striped": striped,
          }
        ])}
      >
        {children}
      </table>
    );
  }
}
