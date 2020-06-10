import React, { useEffect, useState, useReducer } from 'react';
import { CertificateList } from '../models/certificate';
import { CompanyList } from '../models/company';
import { ContactList } from '../models/contact';
import { DepartmentList } from '../models/department';
import { EducationList } from '../models/education';
import { KindList } from '../models/kind';
import { PostList } from '../models/post';
import { PracticeList } from '../models/practice';
import { RankList } from '../models/rank';
import { ScopeList } from '../models/scope';
import { SirenList } from '../models/siren';
import { SirenTypeList } from '../models/sirentype';
import { Input, StringInputProperties } from './input';
import { Pagination } from './pagination';

export type SData = {
  id: number;
  data: string;
};

export type PaginateProperties = {
  filteredLength: number;
  itemsOnPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

export type dataType =
  | CertificateList
  | CompanyList
  | ContactList
  | DepartmentList
  | EducationList
  | KindList
  | PostList
  | PracticeList
  | RankList
  | ScopeList
  | SirenList
  | SirenTypeList;

export type ListProperties = {
  data: dataType[];
  search: string;
};

type State = {
  filteredData: dataType[];
  currentPage: number;
  searchValues: SData[];
  filteredLength: number;
};

type Action =
  | { type: 'littleSearch' }
  | { type: 'bigSearch' }
  | { type: 'data'; value: dataType[] }
  | { type: 'page'; value: number }
  | { type: 'values'; value: SData[] }
  | { type: 'length'; value: number };

const initialArguments = {
  filteredData: [],
  currentPage: 0,
  searchValues: [],
  filteredLength: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // case 'littleSearch':
    //   const dataLength = state.data.length;
    //   if (filteredLength !== dataLength) {
    //     dispatch({ type: 'data', value: data });
    //     // setFilteredData(data);
    //     dispatch({ type: 'length', value: dataLength });
    //     // setFilteredLength(dataLength);
    //   }
    // case 'bigSearch':

    case 'data':
      return { ...state, filteredData: action.value };
    case 'page':
      return { ...state, currentPage: action.value };
    case 'values':
      return { ...state, searchValues: action.value };
    case 'length':
      return { ...state, filteredLength: action.value };
    default:
      return { ...state };
  }
};

export const List = (properties: ListProperties): [() => dataType[], JSX.Element] => {
  const { data, search } = properties;
  type td = typeof properties.data;

  // const [filteredData, setFilteredData] = useState<td>([]);
  // const [currentPage, setCurrentPage] = useState(0);
  // const [searchValues, setSearchValues] = useState<SData[]>([]);
  // const [filteredLength, setFilteredLength] = useState(0);

  const [{ filteredData, currentPage, searchValues, filteredLength }, dispatch] = useReducer(
    reducer,
    initialArguments,
  );

  const itemsOnPage = 20;

  const setCurrentPage = (page: number): void => {
    dispatch({
      type: 'page',
      value: page,
    });
  };

  useEffect(() => {
    const sv: SData[] = data.map(
      (row, index): SData => {
        const values = Object.values(row);
        const rowString: string[] = values.map((value) => {
          if (value && typeof value !== 'number') {
            if (typeof value === 'string') {
              return value;
            } else if (Array.isArray(value)) {
              return value.join('');
            }
          }
          return '';
        });
        return { id: index, data: rowString.join('').toLowerCase() };
      },
    );
    dispatch({ type: 'values', value: sv });
    // setSearchValues(sv);
    dispatch({ type: 'data', value: data });
    // setFilteredData(data);
    dispatch({ type: 'length', value: data.length });
    // setFilteredLength(data.length);
  }, [data]);

  useEffect(() => {
    if (search.length < 2) {
      // const dataLength = data.length;
      // if (filteredLength !== dataLength) {
      //   dispatch({ type: 'data', value: data });
      //   // setFilteredData(data);
      //   dispatch({ type: 'length', value: dataLength });
      //   // setFilteredLength(dataLength);
      // }
      dispatch({ type: 'littleSearch' });
    } else {
      const searchArray = search.toLowerCase().split(' ');
      const temporaryFilteredData = data.filter((_, index) =>
        searchArray.every((value: string) => searchValues[index].data.includes(value)),
      );
      const temporaryFilteredLength = temporaryFilteredData.length;
      if (temporaryFilteredLength !== filteredLength) {
        if (currentPage > 1 && currentPage + 1 > Math.ceil(temporaryFilteredLength / itemsOnPage)) {
          dispatch({ type: 'page', value: Math.ceil(temporaryFilteredLength / itemsOnPage) - 1 });
          // setCurrentPage(Math.ceil(temporaryFilteredLength / itemsOnPage) - 1);
        }
        dispatch({ type: 'data', value: temporaryFilteredData });
        // setFilteredData(temporaryFilteredData);
        dispatch({ type: 'length', value: temporaryFilteredLength });
        // setFilteredLength(temporaryFilteredLength);
      }
    }
  }, [search]);

  const paginationData = (): td => {
    return filteredData.slice(currentPage * itemsOnPage, (currentPage + 1) * itemsOnPage);
  };

  return [
    paginationData,
    Paginate({
      filteredLength: filteredLength,
      itemsOnPage: itemsOnPage,
      currentPage: currentPage,
      setCurrentPage: setCurrentPage,
    }),
  ];
};

export const Search = (properties: StringInputProperties): JSX.Element => (
  <div className="control mb-4" key="TableSearch">
    <Input
      name="search"
      className="input is-expanded"
      placeholder="Поиск"
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
        properties.setter(event.target.value)
      }
      value={properties.value}
    />
  </div>
);

export const Paginate = (properties: PaginateProperties): JSX.Element => {
  const { filteredLength, itemsOnPage, currentPage, setCurrentPage } = properties;
  const receiveChildValue = (value: number): void => {
    setCurrentPage(value - 1);
  };
  return filteredLength / itemsOnPage > 2 ? (
    <Pagination
      currentPage={currentPage + 1}
      lastPage={Math.ceil(filteredLength / itemsOnPage)}
      setter={receiveChildValue}
    />
  ) : (
    <></>
  );
};
