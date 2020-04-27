import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';

import { Pagination } from './pagination';
import { ModelsList } from '../models/lists';

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

const splitArray = (items: string[]): JSX.Element => (
  <>
    {items.map((arrayItem, index) => (
      <div key={`div${index}`}>{arrayItem}</div>
    ))}
  </>
);

interface TableProps {
  data: ModelsList[];
  columns: Column[];
  rowClass?: RowClassFunc;
  className?: string;
  loaded?: boolean;
  paginate?: number;
  nohead?: boolean;
  hoverable?: boolean;
  striped?: boolean;
  bordered?: boolean;
}

export const Table: FC<TableProps> = (properties: TableProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data,
    columns,
    className,
    paginate,
    nohead,
    rowClass,
    hoverable,
    striped,
    bordered,
  } = properties;

  const itemsOnPage = paginate || 20;
  const search = '';

  let filteredLength = 0;

  const filteredData = (): ModelsList[] => {
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

  const classes = `${className ? className : ''} table is-fullwidth is-narrow mwt ${
    hoverable ? 'is-hoverable' : ''
  } ${striped ? 'is-striped' : ''} ${bordered ? 'is-bordered' : ''}`;

  const tableClasses = `${classes}`;

  const Heading = (): JSX.Element =>
    nohead ? (
      <></>
    ) : (
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

  const Td = (field: string[] | string, isArray: boolean | undefined): JSX.Element =>
    isArray && field && Array.isArray(field) ? splitArray(field) : <>{field}</>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TableRow = (row: any): JSX.Element => (
    <>
      {columns.map((column: Column, index: number) => (
        <td key={`td${row.id}${index}`} className={column.className}>
          {column.linkField && column.linkBase ? (
            <Link to={column.linkBase + row[column.linkField]} className="has-text-dark">
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          className={rowClass ? rowClass.rowFunc((item as any)[rowClass.rowFuncField]) : undefined}
          key={`tr${item.id}${index}`}
        >
          {TableRow(item)}
        </tr>
      ))}
    </>
  );

  const TBody = (): JSX.Element =>
    data && data.length > 0 ? (
      <tbody>
        <TableAllRows />
      </tbody>
    ) : (
      <></>
    );

  const Paginate = (): JSX.Element =>
    paginate && filteredLength / itemsOnPage > 2 ? (
      <Pagination
        currentPage={currentPage + 1}
        lastPage={Math.ceil(filteredLength / itemsOnPage)}
        callback={receiveChildValue}
      />
    ) : (
      <></>
    );

  return !data ? (
    <div>Loading data</div>
  ) : (
    <>
      <table className={tableClasses}>
        <Heading />
        <TBody />
      </table>
      <Paginate />
    </>
  );
};
