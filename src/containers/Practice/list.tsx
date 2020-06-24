import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Data, Search } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { PracticeList } from '../../models/practice';

export const Practices = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('PracticeList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): PracticeList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((practice, index) => (
        <tr
          key={`tr${practice.id}${index}`}
          onClick={(): void => history.push(`/practices/${practice.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="nowrap">{practice.date_str}</td>
          <td className="w250">{practice.kind_name}</td>
          <td className="w250 is-hidden-mobile">{practice.company_name}</td>
        </tr>
      ))}
    </>
  );

  return error ? (
    <></>
  ) : (
    <>
      <Search value={search} setter={setSearch} />
      <table className="table is-narrow">
        <tbody>
          <tr>
            <th className="nowrap">Дата тренировки</th>
            <th className="w250">Тип тренировки</th>
            <th className="w250 is-hidden-mobile">Организация</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
