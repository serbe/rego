import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { KindList } from '../../models/kind';

export const Kinds = (): JSX.Element => {
  const history = useHistory();
  const data = GetList('KindList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): KindList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((kind, index) => (
        <tr
          key={`tr${kind.id}${index}`}
          onClick={(): void => history.push(`/kinds/${kind.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="w250">{kind.name}</td>
          <td className="w250">{kind.short_name}</td>
        </tr>
      ))}
    </>
  );

  return (
    <>
      <Bar value={search} setter={setSearch} name="kinds" />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th>Тип тренировки</th>
            <th>Сокращенное наименование</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
