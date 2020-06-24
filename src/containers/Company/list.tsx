import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { splitNumbers, splitStrings } from '../../helpers/utils';
import { CompanyList } from '../../models/company';

export const Companies = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('CompanyList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): CompanyList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((company, index) => (
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
      <Bar value={search} setter={setSearch} name="companies" />
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
      {Paginate}
    </>
  );
};
