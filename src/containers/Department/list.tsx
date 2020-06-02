import React, { useEffect, useState } from 'react';
import { List, Search } from '../../components/table';
import { DepartmentList, DepartmentListJsonScheme } from '../../models/department';
import { rws } from '../../netapi';

export const Departments = (): JSX.Element => {
  const [data, setData] = useState<DepartmentList[]>([]);
  const [search, changeSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): DepartmentList[] => {
    return paginationData();
  };

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as DepartmentListJsonScheme;
      if (data.name && data.name === 'DepartmentList' && data.object.DepartmentList) {
        setData(data.object.DepartmentList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send('{"Get":{"List":"DepartmentList"}}');

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

  const Body = (): JSX.Element => (
    <>
      {tableData().map((department, index) => (
        <tr key={`tr${department.id}${index}`}>
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
      {Search(search, changeSearch)}
      <table className="table is-narrow">
        <tbody>
          <tr>
            <th className="w250">Наименование</th>
            <th className="w250">Заметка</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
