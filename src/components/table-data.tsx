import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { Pagination } from '@material-ui/lab';
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

function Td(field: string[] | string, isArray?: boolean): JSX.Element {
  return isArray && field && Array.isArray(field) ? splitArray(field) : <>{field}</>;
}

interface TableDataProps {
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

export function TableData(properties: TableDataProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState<string>('');
  const [searchValues, setSearchValues] = useState<SData[]>([]);
  const [fData, setFData] = useState<ModelsList[]>([]);
  const [fLength, setFLength] = useState(0);

  const history = useHistory();

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
        if (currentPage + 1 > Math.ceil(filteredLength / itemsOnPage)) {
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

  // const tableClasses = `${className ? className : ''} table is-fullwidth is-narrow mwt ${
  //   hoverable ? 'is-hoverable' : ''
  // } ${striped ? 'is-striped' : ''} ${bordered ? 'is-bordered' : ''}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TR = (row: any): JSX.Element => (
    <>
      {columns.map((column: Column, index: number) => (
        <TableCell
          key={`td${row.id}${index}`}
          className={column.className}
          onClick={(): void => {
            column.linkField &&
              column.linkBase &&
              history.push(column.linkBase + row[column.linkField]);
          }}
        >
          {Td(
            column.fieldFunc ? column.fieldFunc(row[column.field]) : row[column.field],
            column.array,
          )}
        </TableCell>
      ))}
    </>
  );

  const TableAllRows = (): JSX.Element => (
    <>
      {paginationData().map((item, index) => (
        <TableRow
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          className={rowClass ? rowClass.rowFunc((item as any)[rowClass.rowFuncField]) : undefined}
          key={`tr${item.id}${index}`}
        >
          {TR(item)}
        </TableRow>
      ))}
    </>
  );

  // const Paginate = (): JSX.Element | null =>
  //   paginate && fLength / itemsOnPage > 2 ? (
  //     <Pagination
  //       currentPage={currentPage + 1}
  //       lastPage={Math.ceil(fLength / itemsOnPage)}
  //       callback={receiveChildValue}
  //     />
  //   ) : null;

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
      <TableContainer component={Paper}>
        <Table>
          {!nohead && (
            <TableHead>
              <TableRow>
                {columns.map<JSX.Element>((column: Column, index: number) => (
                  <TableRow key={`th${index}`} className={column.className}>
                    {column.label}
                  </TableRow>
                ))}
              </TableRow>
            </TableHead>
          )}
          {data && data.length > 0 && (
            <TableBody>
              <TableAllRows />
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
