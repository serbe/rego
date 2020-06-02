import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Search } from '../../components/table';
import { RankList, RankListJsonScheme } from '../../models/rank';
import { rws } from '../../netapi';

export const Ranks = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<RankList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): RankList[] => {
    return paginationData();
  };

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as RankListJsonScheme;
      if (data.name && data.name === 'RankList' && data.object.RankList) {
        setData(data.object.RankList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send('{"Get":{"List":"RankList"}}');

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

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
          <td className="w250">{rank.note}</td>
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
            <th className="w250">Наименование чина</th>
            <th className="w250">Заметка</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
