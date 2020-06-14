import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Search } from '../../components/table';
import { URL } from '../../helpers/utils';
import { SirenTypeList, SirenTypeListJsonScheme } from '../../models/sirentype';

export const SirenTypes = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<SirenTypeList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): SirenTypeList[] => {
    return paginationData();
  };

  useEffect(() => {
    const ws = new WebSocket(URL);

    ws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as SirenTypeListJsonScheme;
      if (data.name && data.name === 'SirenTypeList' && data.object.SirenTypeList) {
        setData(data.object.SirenTypeList);
      }
      if (data.error) {
        setError(data.error);
      }
    });

    ws.addEventListener('open', () => {
      ws.send('{"Get":{"List":"SirenTypeList"}}');
    });

    return (): void => {
      ws.close();
    };
  }, []);

  const Body = (): JSX.Element => (
    <>
      {tableData().map((siren_type, index) => (
        <tr
          key={`tr${siren_type.id}${index}`}
          onClick={(): void => history.push(`/sirentypes/${siren_type.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="w250">{siren_type.name}</td>
          <td className="w95">{siren_type.radius}</td>
          <td className="w250">{siren_type.note}</td>
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
            <th className="w250">Тип сирены</th>
            <th className="w95">Радиус действия</th>
            <th className="w250">Заметка</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
