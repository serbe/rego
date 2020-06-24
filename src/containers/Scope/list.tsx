import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Data, Search } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { ScopeList } from '../../models/scope';

export const Scopes = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('ScopeList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): ScopeList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((scope, index) => (
        <tr
          key={`tr${scope.id}${index}`}
          onClick={(): void => history.push(`/scopes/${scope.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="w250">{scope.name}</td>
          <td className="w250">{scope.note}</td>
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
            <th className="w250">Сфера деятельности</th>
            <th className="w250">Заметка</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
