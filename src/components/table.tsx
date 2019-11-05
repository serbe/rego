import React, {useState} from "react";
import clsx from "clsx";

import { Link } from "react-router-dom";
import { Pagination } from "./pagination";

const splitArray = (items: any[]): JSX.Element | null =>
  items ? (
    <>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </>
  ) : null;

type Column = {
  field: string;
  label?: string;
  witdh?: string;
  array?: boolean;
  link_base?: string;
  link_field?: string;
  class_name?: string;
};

interface TableProps {
  bordered?: boolean;
  striped?: boolean;
  narrow?: boolean;
  hoverable?: boolean;
  fullwidth?: boolean;
  data: any[];
  columns: Column[];
  className?: string;
  loaded?: boolean;
  paginate?: number;
}

export const Table: React.FC<TableProps> = (props: TableProps) => {
  const [current_page, setCurrentPage] = useState(0);

  const {
    bordered,
    striped,
    narrow,
    hoverable,
    fullwidth,
    data,
    columns,
    className,
    paginate
  } = props;

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

  const Heading = (): JSX.Element => (
    <thead>
      <tr>
        {columns.map((item, key) => (
          <th key={key} className={item.class_name}>
            {item.label}
          </th>
        ))}
      </tr>
    </thead>
  );

  const Row = (row: any): JSX.Element | null => (
    <>
      {columns.map((item, key) => (
        <td key={key} className={item.class_name}>
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
      ))}
    </>
  );

  const Rows = (): JSX.Element => (
    <>
      {filteredData().map((item, index) => (
        <tr key={index}>{Row(item)}</tr>
      ))}
    </>
  );

  const TBody = () =>
    data && data.length > 0 ? (
      <tbody>
        <Rows />
      </tbody>
    ) : null;

  const filteredData = () => {
    if (search !== "") {
      filtered_len = data.length;
      return data;
    } else {
      const slice_data = data.slice(
        current_page * per_page,
        (current_page + 1) * per_page
      );
      filtered_len = data.length;
      return slice_data;
    }
  };

  const Paginate = () =>
    paginate && filtered_len / per_page > 2 ? (
      <Pagination
        current_page={current_page + 1}
        last_page={Math.ceil(filtered_len / per_page)}
        callback={receiveChildValue}
        rounded
      />
    ) : null;

  const receiveChildValue = (value: number) => {
    setCurrentPage(value - 1);
  };

  return !data ? (
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
};
