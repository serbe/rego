import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Pagination } from "./pagination";

const splitArray = items => {
  if (items) {
    return items.map((item, index) => <div key={index}>{item}</div>);
  } else {
    return null;
  }
};

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: 0
    };
  }

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
      loaded,
      paginate
    } = this.props;

    let per_page = paginate ? paginate : 20;
    let search = "";

    let filtered_len = 0;

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
      return filteredData().map(row => <tr key={row.id}>{Row(row)}</tr>);
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

    const filteredData = () => {
      if (search !== "") {
        filtered_len = data.length;
        return data;
      } else {
        const slice_data = data.slice(
          this.state.current_page * per_page,
          (this.state.current_page + 1) * per_page
        );
        filtered_len = data.length;
        return slice_data;
      }
    };

    const Paginate = () => {
      return paginate && filtered_len / per_page > 2 ? (
        <Pagination
          current_page={this.state.current_page + 1}
          last_page={Math.ceil(filtered_len / per_page)}
          callback={receiveChildValue}
          rounded
        />
      ) : null;
    };

    const receiveChildValue = value => {
      this.setState(() => ({ current_page: value - 1 }));
    };

    return !loaded ? (
      <div>Loading data</div>
    ) : (
      <div>
        <table className={classes}>
          <Heading />
          <TBody />
        </table>
        <Paginate />
      </div>
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
      class_name: PropTypes.string
    })
  ),
  loaded: PropTypes.bool,
  paginate: PropTypes.number
};
