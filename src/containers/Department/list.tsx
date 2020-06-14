import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Search } from '../../components/table';
import { URL } from '../../helpers/utils';
import { DepartmentList, DepartmentListJsonScheme } from '../../models/department';

export const Departments = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<DepartmentList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): DepartmentList[] => {
    return paginationData();
  };

  useEffect(() => {
    const ws = new WebSocket(URL);

    ws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as DepartmentListJsonScheme;
      if (data.name && data.name === 'DepartmentList' && data.object.DepartmentList) {
        setData(data.object.DepartmentList);
      }
      if (data.error) {
        setError(data.error);
      }
    });

    ws.addEventListener('open', () => {
      ws.send('{"Get":{"List":"DepartmentList"}}');
    });

    return (): void => {
      ws.close();
    };
  }, []);

  const Body = (): JSX.Element => (
    <>
      {tableData().map((department, index) => (
        <tr
          key={`tr${department.id}${index}`}
          onClick={(): void => history.push(`/departments/${department.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="w250">{department.name}</td>
          <td className="w250">{department.note}</td>
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
            <th className="w250">Наименование отдела</th>
            <th className="w250">Заметка</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
