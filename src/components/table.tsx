import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination } from './pagination';
import { Input } from './input';
import { CertificateList, CertificateListJsonScheme } from '../models/certificate';
import { CompanyList } from '../models/company';
import { ContactList } from '../models/contact';
import { EducationList, EducationShort } from '../models/education';
import { PracticeList, PracticeShort } from '../models/practice';
import { splitNumbers, useInput, splitStrings } from '../helpers/utils';
import { rws } from '../netapi';

export type SData = {
  id: number;
  data: string;
};

export type dataType = CertificateList | CompanyList | ContactList;

export type ListProperties = {
  dataName: string;
  dataType: dataType;
  jsonType: CertificateListJsonScheme;
  jsonObject: any;
};

export const List = (properties: ListProperties): any => {
  type td = typeof properties.dataType;
  type jsonScheme = typeof properties.jsonType;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dataName, jsonObject } = properties;

  const [data, setData] = useState<td[]>([]);
  const [filteredData, setFilteredData] = useState<td[]>([]);
  const [search, changeSearch] = useInput('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValues, setSearchValues] = useState<SData[]>([]);
  const [filteredLength, setFilteredLength] = useState(0);
  const [error, setError] = useState<string>();
  const history = useHistory();

  const itemsOnPage = 20;

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as jsonScheme;
      if (data.name && data.name === dataName && jsonObject) {
        setData(jsonObject);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send(`{"Get":{"List":"${dataName}"}}`);

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, [jsonObject]);

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

  const paginationData = (): td[] => {
    return filteredData.slice(currentPage * itemsOnPage, (currentPage + 1) * itemsOnPage);
  };

  return paginationData;
};

export const Search = (
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
): JSX.Element => (
  <div className="control mb1 mwt" key="TableSearch">
    <Input
      name="search"
      className="input is-expanded"
      placeholder="Поиск"
      onChange={onChange}
      value={value}
    />
  </div>
);

export const Paginate = (
  fLength: number,
  itemsOnPage: number,
  currentPage: number,
  setCurrentPage: (value: number) => void,
): JSX.Element => {
  const receiveChildValue = (value: number): void => {
    setCurrentPage(value - 1);
  };
  return fLength / itemsOnPage > 2 ? (
    <Pagination
      currentPage={currentPage + 1}
      lastPage={Math.ceil(fLength / itemsOnPage)}
      callback={receiveChildValue}
    />
  ) : (
    <></>
  );
};
