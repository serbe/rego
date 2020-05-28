import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SData, Search, Paginate } from '../../components/table';
import { splitNumbers, useInput, splitStrings } from '../../helpers/utils';
import { CompanyList } from '../../models/company';
import { rws } from '../../netapi';

type CLWS = {
  name: string;
  object: {
    CompanyList?: CompanyList[];
  };
  error?: string;
};

export const Companies = (): JSX.Element => {
  const [companies, setCompanies] = useState<CompanyList[]>([]);
  const [filteredData, setFilteredData] = useState<CompanyList[]>([]);
  const [search, changeSearch] = useInput('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValues, setSearchValues] = useState<SData[]>([]);
  const [filteredLength, setFilteredLength] = useState(0);
  const [error, setError] = useState<string>();
  const history = useHistory();

  const itemsOnPage = 20;

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as CLWS;
      if (data.name && data.name === 'CompanyList' && data.object.CompanyList) {
        setCompanies(data.object.CompanyList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send('{"Get":{"List":"CompanyList"}}');

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

  useEffect(() => {
    const sv: SData[] = [];
    companies.map((row, index): void => {
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
    setFilteredData(companies);
    setFilteredLength(companies.length);
  }, [companies]);

  useEffect(() => {
    if (search.length < 2) {
      const dataLength = companies.length;
      if (filteredLength !== dataLength) {
        setFilteredData(companies);
        setFilteredLength(dataLength);
      }
    } else {
      const searchArray = search.toLowerCase().split(' ');
      const temporaryFilteredData = companies.filter((_, index) =>
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

  const paginationData = (): CompanyList[] => {
    return filteredData.slice(currentPage * itemsOnPage, (currentPage + 1) * itemsOnPage);
  };

  const Body = (): JSX.Element => (
    <>
      {paginationData().map((company, index) => (
        <tr key={`tr${company.id}${index}`}>
          <td
            onClick={(): void => history.push(`/companies/${company.id}`)}
            role="gridcell"
            className="w250 link"
          >
            {company.name}
          </td>
          <td className="is-hidden-touch w250">{company.address}</td>
          <td className="is-hidden-mobile w250">{company.scope_name}</td>
          <td className="w95">{splitNumbers(company.phones)}</td>
          <td className="is-hidden-touch w95">{splitNumbers(company.faxes)}</td>
          <td className="is-hidden-touch is-hidden-desktop-only w95">
            {splitStrings(company.practices)}
          </td>
        </tr>
      ))}
    </>
  );

  return error ? (
    <></>
  ) : (
    <>
      {Search(search, changeSearch)}
      <table className="table is-narrow">
        <tbody>
          <tr>
            <th className="w250">Наименование</th>
            <th className="is-hidden-touch w250">Адрес</th>
            <th className="is-hidden-mobile w250">Сфера деятельности</th>
            <th className="w95">Телефоны</th>
            <th className="is-hidden-touch w95">Факсы</th>
            <th className="is-hidden-touch is-hidden-desktop-only w95">Тренировки</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate(filteredLength, itemsOnPage, currentPage, setCurrentPage)}
    </>
  );
};
