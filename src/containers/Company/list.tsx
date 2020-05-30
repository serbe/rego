import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Search } from '../../components/table';
import { splitNumbers, splitStrings } from '../../helpers/utils';
import { CompanyList, CompanyListJsonScheme } from '../../models/company';
import { rws } from '../../netapi';

export const Companies = (): JSX.Element => {
  const [data, setData] = useState<CompanyList[]>([]);
  const [search, setSearch] = useState(() => '');
  const [error, setError] = useState<string>();
  const history = useHistory();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): CompanyList[] => {
    return paginationData();
  };

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as CompanyListJsonScheme;
      if (data.name && data.name === 'CompanyList' && data.object.CompanyList) {
        setData(data.object.CompanyList);
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
      {Search(search, setSearch)}
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
