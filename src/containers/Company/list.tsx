import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { CompanyList } from '../../models/company';
import { GetList } from '../../services/fetcher';
import { splitNumbers, splitStrings } from '../../services/utils';

export const Companies = (): JSX.Element => {
  const history = useHistory();
  const data = GetList('CompanyList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data,
    search,
  });

  const tableData = (): CompanyList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((company) => (
        <tr key={`tr${company.id}`}>
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

  return (
    <>
      <Bar value={search} setter={setSearch} name="companies" />
      <table className="table is-narrow is-fullwidth">
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
