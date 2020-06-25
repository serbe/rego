import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { DepartmentList } from '../../models/department';

export const Departments = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('DepartmentList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): DepartmentList[] => {
    return paginationData();
  };

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
      <Bar value={search} setter={setSearch} name="departments" />
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
