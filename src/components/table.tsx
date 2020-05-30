import React, { useEffect, useState } from 'react';
import { CertificateList } from '../models/certificate';
import { CompanyList } from '../models/company';
import { ContactList } from '../models/contact';
import { SirenList } from '../models/siren';
import { Input } from './input';
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

export type dataType = CertificateList | CompanyList | ContactList | SirenList;

export type ListProperties = {
  data: dataType[];
  search: string;
};

export const List = (properties: ListProperties): [() => dataType[], JSX.Element] => {
  const { data, search } = properties;
  type td = typeof properties.data;

  const [filteredData, setFilteredData] = useState<td>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValues, setSearchValues] = useState<SData[]>([]);
  const [filteredLength, setFilteredLength] = useState(0);

  const itemsOnPage = 20;

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
    setFilteredData(data);
    setFilteredLength(data.length);
  }, [data]);

  useEffect(() => {
    if (search.length < 2) {
      const dataLength = data.length;
      if (filteredLength !== dataLength) {
        setFilteredData(data);
        setFilteredLength(dataLength);
      }
    } else {
      const searchArray = search.toLowerCase().split(' ');
      const temporaryFilteredData = data.filter((_, index) =>
        searchArray.every((value: string) => searchValues[index].data.includes(value)),
      );
      const temporaryFilteredLength = temporaryFilteredData.length;
      if (temporaryFilteredLength !== filteredLength) {
        if (currentPage > 1 && currentPage + 1 > Math.ceil(temporaryFilteredLength / itemsOnPage)) {
          setCurrentPage(Math.ceil(temporaryFilteredLength / itemsOnPage) - 1);
        }
        setFilteredData(temporaryFilteredData);
        setFilteredLength(temporaryFilteredLength);
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

export const Search = (value: string, setter: (value: string) => void): JSX.Element => (
  <div className="control mb1 mwt" key="TableSearch">
    <Input
      name="search"
      className="input is-expanded"
      placeholder="Поиск"
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setter(event.target.value)}
      value={value}
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
      callback={receiveChildValue}
    />
  ) : (
    <></>
  );
};
