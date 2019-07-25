import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";

const splitArray = items => {
  if (items) {
    return items.map((item, index) => <div key={index}>{item}</div>);
  } else {
    return null;
  }
};

class Table extends React.Component {
  render() {
    const {
      bordered,
      className,
      fullwidth,
      hoverable,
      narrow,
      striped,
      data,
      columns,
      loaded
    } = this.props;

    const classes = clsx([
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

    const Heading = () => {
      return (
        <thead>
          <tr>
            {columns.map((item, key) => (
              <th key={key} className={item.c_name}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
      );
    };

    const Row = row => {
      return columns.map((item, key) => (
        <td key={key} className={item.c_name}>
          {item.link_field && item.link_base ? (
            <Link to={item.link_base + row[item.link_field]}>
              {item.array ? splitArray(row[item.field]) : row[item.field]}
            </Link>
          ) : item.array ? (
            splitArray(row[item.field])
          ) : (
            row[item.field]
          )}
        </td>
      ));
    };

    const Rows = () => {
      let list = [];
      for (let i = 0; i < 50; i++) {
        list.push(data[i]);
      }
      return list.map(row => <tr key={row.id}>{Row(row)}</tr>);
    };

    const TBody = () => {
      if (data && data.length > 0) {
        return (
          <tbody>
            <Rows />
          </tbody>
        );
      } else {
        return null;
      }
    };

    return loaded ? (
      <div>Loading data</div>
    ) : (
      <table className={classes}>
        <Heading />
        <TBody />
      </table>
    );
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
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      label: PropTypes.string,
      witdh: PropTypes.string,
      array: PropTypes.bool,
      link_base: PropTypes.string,
      link_field: PropTypes.string,
      c_name: PropTypes.string
    })
  ),
  loaded: PropTypes.bool
};

export default Table;
