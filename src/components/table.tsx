import React, { useEffect, useReducer } from 'react';
import { List } from '../models/impersonal';
import { Input } from './input';
import { Pagination } from './pagination';
import { useHistory } from 'react-router-dom';

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

export type DataProperties = {
  data: List[];
  search: string;
};

type BarProperties = {
  value: string;
  setter: (value: string) => void;
  name: string;
};

type State = {
  filteredData: List[];
  currentPage: number;
  searchValues: SData[];
  filteredDataLength: number;
  itemsPerPage: number;
};

type Action =
  | { type: 'searchLessThanTwo'; value: List[]; valueLength: number }
  | { type: 'changeSearch'; value: List[]; search: string }
  | { type: 'setFilteredData'; value: List[] }
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

export const Data = (properties: DataProperties): [() => List[], JSX.Element] => {
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

export const Bar = (properties: BarProperties): JSX.Element => {
  const history = useHistory();
  return (
    <div className="field is-grouped">
      <div className="control mb-4" key="TableNewItem">
        <button className="button" onClick={() => history.push(`/${properties.name}/0`)}>
          Создать
        </button>
      </div>
      <div className="control mb-4 is-expanded" key="TableSearch">
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
    </div>
  );
};

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
