import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

class Table extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     page: this.props.currentPage
  //   };
  // }

  render() {
    const {
      bordered,
      children,
      className,
      fullwidth,
      hoverable,
      narrow,
      striped
    } = this.props;

    const classes = cc([
      { className },
      "button",
      {
        "is-bordered": bordered,
        "is-fullwidth": fullwidth,
        "is-hoverable": hoverable,
        "is-narrow": narrow,
        "is-striped": striped
      }
    ]);

    return <table className={classes}>{children}</table>;
  }
}

Table.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  fullwidth: PropTypes.bool,
  hoverable: PropTypes.bool,
  narrow: PropTypes.bool,
  striped: PropTypes.bool
};

// Table.defaultProps = {
//   bordered: false,
//   children: null,
//   className: "",
//   fullwidth: false,
//   hoverable: false,
//   narrow: false,
//   striped: false,
// };

export default Table;
