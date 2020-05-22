import React, { ChangeEvent, memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModelsList } from '../models/lists';
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

type SData = {
  id: number;
  data: string;
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

export const NoMemoTable = (properties: TableProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState<string>('');
  const [searchValues, setSearchValues] = useState<SData[]>([]);
  const [fData, setFData] = useState<ModelsList[]>([]);
  const [fLength, setFLength] = useState(0);

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

  useEffect(() => {
    const sv: SData[] = [];
    data.map((row, index): void => {
      let rowString = '';
      const values = Object.values(row);
      values.map((value): void => {
        if (value && typeof value !== 'number') {
          if (typeof value === 'string') {
            rowString += value;
          } else if (Array.isArray(value)) {
            rowString += value.join('');
          }
        }
      });
      sv.push({ id: index, data: rowString.toLowerCase() });
    });
    setSearchValues(sv);
    setFData(data);
    setFLength(data.length);
  }, [data]);

  useEffect(() => {
    if (search.length < 2) {
      const dataLength = data.length;
      if (fLength !== dataLength) {
        setFData(data);
        setFLength(dataLength);
      }
    } else {
      const searchArray = search.toLowerCase().split(' ');
      const filteredData = data.filter((_, index) =>
        searchArray.every((value: string) => searchValues[index].data.includes(value)),
      );
      const filteredLength = filteredData.length;
      if (filteredLength !== fLength) {
        if (currentPage > 1 && currentPage + 1 > Math.ceil(filteredLength / itemsOnPage)) {
          setCurrentPage(Math.ceil(filteredLength / itemsOnPage) - 1);
        }
        setFData(filteredData);
        setFLength(filteredLength);
      }
    }
  }, [search, itemsOnPage]);

  const paginationData = (): ModelsList[] => {
    return fData.slice(currentPage * itemsOnPage, (currentPage + 1) * itemsOnPage);
  };

  const changeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const receiveChildValue = (value: number): void => {
    setCurrentPage(value - 1);
  };

  const tableClasses = `${className ? className : ''} table is-fullwidth is-narrow ${
    hoverable ? 'is-hoverable' : ''
  } ${striped ? 'is-striped' : ''} ${bordered ? 'is-bordered' : ''}`;

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

  const Td = (field: string[] | string, isArray?: boolean): JSX.Element =>
    isArray && field && Array.isArray(field) ? splitArray(field) : <>{field}</>;

  function TableRow(row: ModelsList): JSX.Element {
    return (
      <>
        {columns.map((column: Column, index: number) => {
          const field = column.linkField;
          if (field && field in row) {
            console.log(field, 'in');
          }
          return (
            <td key={`td${row.id}${index}`} className={column.className}>
              {column.linkBase && field && field in row ? (
                <Link to={`${column.linkBase}${row[field]}`} className="has-text-dark">
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
          );
        })}
      </>
    );
  }

  const TableAllRows = (): JSX.Element => (
    <>
      {paginationData().map((item, index) => (
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
    paginate && fLength / itemsOnPage > 2 ? (
      <Pagination
        currentPage={currentPage + 1}
        lastPage={Math.ceil(fLength / itemsOnPage)}
        callback={receiveChildValue}
      />
    ) : (
      <></>
    );

  const Search = (): JSX.Element => (
    <p className="control mb1 mwt" key="TableSearch">
      <input
        className="input is-expanded"
        type="search"
        placeholder="Поиск"
        onChange={changeSearch}
        value={search}
        autoFocus
      />
    </p>
  );

  return !data ? (
    <div>Loading data</div>
  ) : (
    <>
      <Search />
      <table className={tableClasses}>
        <Heading />
        <TBody />
      </table>
      <Paginate />
    </>
  );
};

export const Table = memo(NoMemoTable);
