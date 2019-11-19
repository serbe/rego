import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Pagination } from './pagination';

export type Column = {
  field: string;
  fieldFunc?: (value: string) => string;
  label?: string;
  witdh?: string;
  array?: boolean;
  linkBase?: string;
  linkField?: string;
  className?: string;
};

export type RowClassFunc = {
  rowFunc: (value: string) => string;
  rowFuncField: string;
};

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
  rowClass?: RowClassFunc;
  className?: string;
  loaded?: boolean;
  paginate?: number;
  nohead?: boolean;
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
    nohead,
    rowClass,
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

  const Heading = (): JSX.Element | null =>
    nohead ? null : (
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

  const TableRow = (row: any): JSX.Element | null => (
    <>
      {columns.map((column: Column, index: number) => (
        <td key={`td${row.id}${index}`} className={column.className}>
          {column.linkField && column.linkBase ? (
            <Link to={column.linkBase + row[column.linkField]}>
              {Td(
                column.fieldFunc ? column.fieldFunc(row[column.field]) : row[column.field],
                column.array,
              )}
            </Link>
          ) : (
            Td(
              column.fieldFunc ? column.fieldFunc(row[column.field]) : row[column.field],
              column.array,
            )
          )}
        </td>
      ))}
    </>
  );

  const TableAllRows = (): JSX.Element => (
    <>
      {filteredData().map((item, index) => (
        <tr
          className={rowClass ? rowClass.rowFunc(item[rowClass.rowFuncField]) : undefined}
          key={`tr${item.id}${index}`}
        >
          {TableRow(item)}
        </tr>
      ))}
    </>
  );

  const TBody = (): JSX.Element | null =>
    data && data.length > 0 ? (
      <tbody>
        <TableAllRows />
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
    <>
      <table className={classes}>
        <Heading />
        <TBody />
      </table>
      <Paginate />
    </>
  );
};
