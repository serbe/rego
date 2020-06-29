import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { splitNumbers } from '../../helpers/utils';
import { SirenList } from '../../models/siren';

export const Sirens = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('SirenList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): SirenList[] => {
    return paginationData();
  };

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
      <Bar value={search} setter={setSearch} name="sirens" />
      <table className="table is-narrow is-fullwidth">
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
