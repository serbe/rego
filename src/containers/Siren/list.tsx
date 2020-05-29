import React, { useEffect, useState } from 'react';
import { List, Search } from '../../components/table';
import { splitNumbers, useInput } from '../../helpers/utils';
import { SirenList, SirenListJsonScheme } from '../../models/siren';
import { rws } from '../../netapi';

export const Sirens = (): JSX.Element => {
  const [data, setData] = useState<SirenList[]>([]);
  const [search, changeSearch] = useInput('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): SirenList[] => {
    return paginationData();
  };

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as SirenListJsonScheme;
      if (data.name && data.name === 'SirenList' && data.object.SirenList) {
        setData(data.object.SirenList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send('{"Get":{"List":"SirenList"}}');

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

  const Body = (): JSX.Element => (
    <>
      {tableData().map((siren, index) => (
        <tr key={`tr${siren.id}${index}`}>
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
      {Search(search, changeSearch)}
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
