import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Search } from '../../components/table';
import { KindList, KindListJsonScheme } from '../../models/kind';
import { rws } from '../../netapi';

export const Kinds = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<KindList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): KindList[] => {
    return paginationData();
  };

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as KindListJsonScheme;
      if (data.name && data.name === 'KindList' && data.object.KindList) {
        setData(data.object.KindList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send('{"Get":{"List":"KindList"}}');

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

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