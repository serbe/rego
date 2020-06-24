import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Data, Search } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { KindList } from '../../models/kind';

export const Kinds = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('KindList');
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
          <td className="is-hidden-mobile">{kind.note}</td>
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
            <th>Тип тренировки</th>
            <th>Сокращенное наименование</th>
            <th className="is-hidden-mobile">Заметка</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
