import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

const split = items => {
  if (items) {
    return items.foreach((item, index) => <div key={index}>{item}</div>);
  } else {
    return null;
  }
};

class Table extends React.Component {
  render() {
    const {
      bordered,
      children,
      className,
      fullwidth,
      hoverable,
      narrow,
      striped,
      data,
      columns
    } = this.props;

    const classes = cc([
      { className },
      "table",
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
  striped: PropTypes.bool,
  data: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    witdh: PropTypes.string,
    type: PropTypes.oneOf("array")
  }))
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
