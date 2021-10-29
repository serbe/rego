import { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuthState } from '../services/auth';
import { List } from '../services/fetcher';
import { latrus } from '../services/utils';
import { Button } from './button';
import { Input } from './input';
import { Pagination } from './pagination';

export type SData = {
  data: string;
  id: number;
};

export type PaginateProperties = {
  currentPage: number;
  filteredDataLength: number;
  itemsPerPage: number;
  setter: (value: number) => void;
};

export type DataProperties = {
  data: List[];
  search: string;
};

interface BarProperties {
  name: string;
  setter: (value: string) => void;
  value: string;
}

type PaginateState = {
  currentPage: number;
  filteredData: List[];
  filteredDataLength: number;
  itemsPerPage: number;
  searchValues: SData[];
};

type PaginateAction =
  | { type: 'searchLessThanTwo'; value: List[]; valueLength: number }
  | { type: 'changeSearch'; value: List[]; search: string }
  | { type: 'setFilteredData'; value: List[] }
  | { type: 'setCurrentPage'; value: number }
  | { type: 'setSearchValues'; value: SData[] }
  | { type: 'setFilteredDataLength'; value: number };

const initialArguments = {
  currentPage: 0,
  filteredData: [],
  filteredDataLength: 0,
  itemsPerPage: 20,
  searchValues: [],
};

const paginateReducer = (state: PaginateState, action: PaginateAction): PaginateState => {
  switch (action.type) {
    case 'searchLessThanTwo':
      if (state.filteredDataLength !== action.valueLength) {
        return { ...state, filteredDataLength: action.valueLength, filteredData: action.value };
      }
      return state;
    case 'changeSearch': {
      const searchArray = action.search.toLowerCase().split(' ');
      const temporaryFilteredData = action.value.filter((_, index) =>
        searchArray.every(
          (value: string) =>
            state.searchValues[index].data.includes(value) ||
            (latrus(value[0]) && state.searchValues[index].data.includes(latrus(value))),
        ),
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

export const Paginate = ({
  filteredDataLength,
  itemsPerPage,
  currentPage,
  setter,
}: PaginateProperties): JSX.Element => {
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

export const Data = ({ data, search }: DataProperties): [() => List[], JSX.Element] => {
  type TableData = typeof data;

  const [{ filteredData, currentPage, filteredDataLength, itemsPerPage }, dispatch] = useReducer(
    paginateReducer,
    initialArguments,
  );

  const setCurrentPage = (page: number): void => {
    dispatch({
      type: 'setCurrentPage',
      value: page,
    });
  };

  useEffect(() => {
    const sv: SData[] = data.map((row, index): SData => {
      const values = Object.values(row);
      const rowString: string[] = values.map((value) => {
        if (value && typeof value !== 'number') {
          if (typeof value === 'string') {
            return value;
          }
          if (Array.isArray(value)) {
            return value.join('');
          }
        }
        return '';
      });
      return { id: index, data: rowString.join('').toLowerCase() };
    });
    dispatch({ type: 'setSearchValues', value: sv });
    dispatch({ type: 'setFilteredData', value: data });
    dispatch({ type: 'setFilteredDataLength', value: data.length });
  }, [data]);

  useEffect(() => {
    if (search.length < 2) {
      dispatch({ type: 'searchLessThanTwo', value: data, valueLength: data.length });
    } else {
      dispatch({ type: 'changeSearch', value: data, search });
    }
  }, [search, data]);

  const paginationData = (): TableData => {
    return filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  };

  return [
    paginationData,
    Paginate({
      currentPage,
      filteredDataLength,
      itemsPerPage,
      setter: setCurrentPage,
    }),
  ];
};

export const Bar = ({ name, setter, value }: BarProperties): JSX.Element => {
  const { auth } = useAuthState();
  const history = useHistory();

  const CreateButton = () =>
    auth.user.role > 2 ? (
      <div className="control mb-4" key="TableNewItem">
        <Button onClick={() => history.push(`/${name}/0`)}>Создать</Button>
      </div>
    ) : (
      <></>
    );

  return (
    <div className="field is-grouped">
      <CreateButton />
      <div className="control mb-4 is-expanded" key="TableSearch">
        <Input
          className="input is-expanded"
          name="search"
          placeholder="Поиск"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            setter(event.target.value)
          }
          value={value}
        />
      </div>
    </div>
  );
};
