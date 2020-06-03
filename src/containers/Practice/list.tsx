import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Search } from '../../components/table';
import { PracticeList, PracticeListJsonScheme } from '../../models/practice';
import { rws } from '../../netapi';

export const Practices = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<PracticeList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): PracticeList[] => {
    return paginationData();
  };

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as PracticeListJsonScheme;
      if (data.name && data.name === 'PracticeList' && data.object.PracticeList) {
        setData(data.object.PracticeList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send('{"Get":{"List":"PracticeList"}}');

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

  const Body = (): JSX.Element => (
    <>
      {tableData().map((practice, index) => (
        <tr
          key={`tr${practice.id}${index}`}
          onClick={(): void => history.push(`/practices/${practice.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="nowrap">{practice.date_str}</td>
          <td className="w250">{practice.kind_name}</td>
          <td className="w250 is-hidden-mobile">{practice.company_name}</td>
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
            <th className="nowrap">Дата тренировки</th>
            <th className="w250">Тип тренировки</th>
            <th className="w250 is-hidden-mobile">Организация</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
