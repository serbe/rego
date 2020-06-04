import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { List, Search } from '../../components/table';
import { splitNumbers } from '../../helpers/utils';
import { SirenList, SirenListJsonScheme } from '../../models/siren';

export const Sirens = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<SirenList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): SirenList[] => {
    return paginationData();
  };

  useEffect(() => {
    const rws = new ReconnectingWebSocket('ws://127.0.0.1:9090');

    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as SirenListJsonScheme;
      if (data.name && data.name === 'SirenList' && data.object.SirenList) {
        setData(data.object.SirenList);
      }
      if (data.error) {
        setError(data.error);
      }
    });

    rws.addEventListener('open', () => {
      rws.send('{"Get":{"List":"SirenList"}}');
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
      {tableData().map((siren, index) => (
        <tr
          key={`tr${siren.id}${index}`}
          onClick={(): void => history.push(`/sirens/${siren.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="w250">{siren.siren_type_name}</td>
          <td className="is-hidden-mobile">{siren.address}</td>
          <td className="is-hidden-touch w250">{siren.contact_name}</td>
          <td className="w95 nowrap">{splitNumbers(siren.phones)}</td>
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
            <th className="is-hidden-mobile w250">Адрес</th>
            <th>Ответственный</th>
            <th className="w95 nowrap">Телефоны</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
