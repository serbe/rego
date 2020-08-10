import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { RankList } from '../../models/rank';

export const Ranks = (): JSX.Element => {
  const history = useHistory();
  const data = GetList('RankList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): RankList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((rank, index) => (
        <tr
          key={`tr${rank.id}${index}`}
          onClick={(): void => history.push(`/ranks/${rank.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="w250">{rank.name}</td>
        </tr>
      ))}
    </>
  );

  return (
    <>
      <Bar value={search} setter={setSearch} name="ranks" />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Наименование чина</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
