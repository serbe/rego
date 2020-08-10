import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { ScopeList } from '../../models/scope';

export const Scopes = (): JSX.Element => {
  const history = useHistory();
  const data = GetList('ScopeList');
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
        </tr>
      ))}
    </>
  );

  return (
    <>
      <Bar value={search} setter={setSearch} name="scopes" />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Сфера деятельности</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
