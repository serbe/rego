import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { SirenList } from '../../models/siren';
import { GetList } from '../../services/fetcher';
import { splitNumbers } from '../../services/utils';

export const Sirens = (): JSX.Element => {
  const history = useHistory();
  const data = GetList('SirenList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data,
    search,
  });

  const tableData = (): SirenList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((siren) => (
        <tr
          key={`tr${siren.id}`}
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

  return (
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
