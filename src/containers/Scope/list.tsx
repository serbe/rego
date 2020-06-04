import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { List, Search } from '../../components/table';
import { ScopeList, ScopeListJsonScheme } from '../../models/scope';

export const Scopes = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<ScopeList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): ScopeList[] => {
    return paginationData();
  };

  useEffect(() => {
    const rws = new ReconnectingWebSocket('ws://127.0.0.1:9090');

    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as ScopeListJsonScheme;
      if (data.name && data.name === 'ScopeList' && data.object.ScopeList) {
        setData(data.object.ScopeList);
      }
      if (data.error) {
        setError(data.error);
      }
    });

    rws.addEventListener('open', () => {
      rws.send('{"Get":{"List":"ScopeList"}}');
    });

    rws.onclose = () => {
      rws.close();
    };

    return (): void => {
      rws.close();
    };
  }, []);

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
