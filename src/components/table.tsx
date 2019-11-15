import React, { useState, FC } from 'react';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { Pagination } from './pagination';

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

export const Table: FC<TableProps> = (props: TableProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    bordered,
    striped,
    narrow,
    hoverable,
    fullwidth,
    data,
    columns,
    className,
    paginate,
  } = props;

  const itemsOnPage = paginate ? paginate : 20;
  const search = '';

  let filteredLen = 0;

  const filteredData = (): any[] => {
    if (search !== '') {
      filteredLen = data.length;
      return data;
    } else {
      const sliceData = data.slice(currentPage * itemsOnPage, (currentPage + 1) * itemsOnPage);
      filteredLen = data.length;
      return sliceData;
    }
  };

  const receiveChildValue = (value: number): void => {
    setCurrentPage(value - 1);
  };

  const classes = clsx([
    { className },
    'table',
    {
      'is-bordered': bordered,
      'is-fullwidth': fullwidth,
      'is-hoverable': hoverable,
      'is-narrow': narrow,
      'is-striped': striped,
    },
  ]);

  const Heading = (): JSX.Element => (
    <thead>
      <tr>
        {columns.map<JSX.Element>((item: Column, key: number) => (
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

  const TBody = (): JSX.Element | null =>
    data && data.length > 0 ? (
      <tbody>
        <Rows />
      </tbody>
    ) : null;

  const Paginate = (): JSX.Element | null =>
    paginate && filteredLen / itemsOnPage > 2 ? (
      <Pagination
        currentPage={currentPage + 1}
        lastPage={Math.ceil(filteredLen / itemsOnPage)}
        callback={receiveChildValue}
        rounded
      />
    ) : null;

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
