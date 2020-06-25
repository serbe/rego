import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { SirenTypeList } from '../../models/sirentype';

export const SirenTypes = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('SirenTypeList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): SirenTypeList[] => {
    return paginationData();
  };

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
      <Bar value={search} setter={setSearch} name="sirentypes" />
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
