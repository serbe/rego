import React, { useState, FC } from 'react';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { Pagination } from './pagination';
import { Column } from '../models/column';

const splitArray = (items: any[]): JSX.Element | null =>
  items ? (
    <>
      {items.map((arrayItem, index) => (
        <div key={`div${index}`}>{arrayItem}</div>
      ))}
    </>
  ) : null;

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

export const Table: FC<TableProps> = (properties: TableProps) => {
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
  } = properties;

  const itemsOnPage = paginate || 20;
  const search = '';

  let filteredLength = 0;

  const filteredData = (): any[] => {
    if (search !== '') {
      filteredLength = data.length;
      return data;
    }
    const sliceData = data.slice(currentPage * itemsOnPage, (currentPage + 1) * itemsOnPage);
    filteredLength = data.length;
    return sliceData;
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
        {columns.map<JSX.Element>((column: Column, index: number) => (
          <th key={`th${index}`} className={column.className}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );

  const Td = (field: any, isArray: boolean | undefined): JSX.Element | null =>
    isArray ? splitArray(field) : field;

  const Row = (row: any): JSX.Element | null => (
    <>
      {columns.map((column: Column, index: number) => (
        <td key={`td${row.id}${index}`} className={column.className}>
          {column.linkField && column.linkBase ? (
            <Link to={column.linkBase + row[column.linkField]}>
              {Td(row[column.field], column.array)}
            </Link>
          ) : (
            Td(row[column.field], column.array)
          )}
        </td>
      ))}
    </>
  );

  const Rows = (): JSX.Element => (
    <>
      {filteredData().map((item, index) => (
        <tr key={`tr${item.id}${index}`}>{Row(item)}</tr>
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
    paginate && filteredLength / itemsOnPage > 2 ? (
      <Pagination
        currentPage={currentPage + 1}
        lastPage={Math.ceil(filteredLength / itemsOnPage)}
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
