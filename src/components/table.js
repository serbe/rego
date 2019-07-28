import React, { useState } from "react";
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

const Table = props => {
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
  } = props;

  let per_page = paginate ? paginate : 20;
  // eslint-disable-next-line
  // const [search, setSearch] = useState("");
  let current_page = 0;

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
      return data;
    } else {
      return data.slice(current_page * per_page, (current_page + 1) * per_page);
    }
  };

  return !loaded ? (
    <div>Loading data</div>
  ) : (
    <table className={classes}>
      <Heading />
      <TBody />
    </table>
  );
};

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

export default Table;
