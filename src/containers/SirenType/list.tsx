import React, { useEffect, useState } from 'react';
import { List, Search } from '../../components/table';
import { SirenTypeList, SirenTypeListJsonScheme } from '../../models/sirentype';
import { rws } from '../../netapi';

export const SirenTypes = (): JSX.Element => {
  const [data, setData] = useState<SirenTypeList[]>([]);
  const [search, changeSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): SirenTypeList[] => {
    return paginationData();
  };

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as SirenTypeListJsonScheme;
      if (data.name && data.name === 'SirenList' && data.object.SirenTypeList) {
        setData(data.object.SirenTypeList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send('{"Get":{"List":"SirenTypeList"}}');

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
          <td className="w250">{siren.name}</td>
          <td className="w95">{siren.radius}</td>
          <td className="w250">{siren.note}</td>
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
            <th className="w250">Наименование</th>
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
