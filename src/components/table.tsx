import React, { useEffect, useReducer } from 'react';
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
  filteredDataLength: number;
  itemsPerPage: number;
  currentPage: number;
  setter: (value: number) => void;
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
  filteredDataLength: number;
  itemsPerPage: number;
};

type Action =
  | { type: 'searchLessThanTwo'; value: dataType[]; valueLength: number }
  | { type: 'changeSearch'; value: dataType[]; search: string }
  | { type: 'setFilteredData'; value: dataType[] }
  | { type: 'setCurrentPage'; value: number }
  | { type: 'setSearchValues'; value: SData[] }
  | { type: 'setFilteredDataLength'; value: number };

const initialArguments = {
  filteredData: [],
  currentPage: 0,
  searchValues: [],
  filteredDataLength: 0,
  itemsPerPage: 20,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'searchLessThanTwo':
      if (state.filteredDataLength !== action.valueLength) {
        return { ...state, filteredDataLength: action.valueLength, filteredData: action.value };
      }
      return state;
    case 'changeSearch': {
      const searchArray = action.search.toLowerCase().split(' ');
      const temporaryFilteredData = action.value.filter((_, index) =>
        searchArray.every((value: string) => state.searchValues[index].data.includes(value)),
      );
      const temporaryFilteredLength = temporaryFilteredData.length;
      if (temporaryFilteredLength !== state.filteredDataLength) {
        if (
          state.currentPage > 1 &&
          state.currentPage + 1 > Math.ceil(temporaryFilteredLength / state.itemsPerPage)
        ) {
          return {
            ...state,
            currentPage: Math.ceil(temporaryFilteredLength / state.itemsPerPage) - 1,
            filteredData: temporaryFilteredData,
            filteredDataLength: temporaryFilteredLength,
          };
        }
        return {
          ...state,
          filteredData: temporaryFilteredData,
          filteredDataLength: temporaryFilteredLength,
        };
      }
      return state;
    }
    case 'setFilteredData':
      return { ...state, filteredData: action.value };
    case 'setCurrentPage':
      return { ...state, currentPage: action.value };
    case 'setSearchValues':
      return { ...state, searchValues: action.value };
    case 'setFilteredDataLength':
      return { ...state, filteredDataLength: action.value };
    default:
      return state;
  }
};

export const List = (properties: ListProperties): [() => dataType[], JSX.Element] => {
  const { data, search } = properties;
  type td = typeof properties.data;

  const [{ filteredData, currentPage, filteredDataLength, itemsPerPage }, dispatch] = useReducer(
    reducer,
    initialArguments,
  );

  const setCurrentPage = (page: number): void => {
    dispatch({
      type: 'setCurrentPage',
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
    dispatch({ type: 'setSearchValues', value: sv });
    dispatch({ type: 'setFilteredData', value: data });
    dispatch({ type: 'setFilteredDataLength', value: data.length });
  }, [data]);

  useEffect(() => {
    if (search.length < 2) {
      dispatch({ type: 'searchLessThanTwo', value: data, valueLength: data.length });
    } else {
      dispatch({ type: 'changeSearch', value: data, search: search });
    }
  }, [search, data]);

  const paginationData = (): td => {
    return filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  };

  return [
    paginationData,
    Paginate({
      filteredDataLength: filteredDataLength,
      itemsPerPage: itemsPerPage,
      currentPage: currentPage,
      setter: setCurrentPage,
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
  const { filteredDataLength, itemsPerPage, currentPage, setter } = properties;
  const receiveChildValue = (value: number): void => {
    setter(value - 1);
  };
  return filteredDataLength / itemsPerPage > 2 ? (
    <Pagination
      currentPage={currentPage + 1}
      lastPage={Math.ceil(filteredDataLength / itemsPerPage)}
      setter={receiveChildValue}
    />
  ) : (
    <></>
  );
};
