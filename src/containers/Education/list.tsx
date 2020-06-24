import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Data, Search } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { EducationList } from '../../models/education';

export const Educations = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('EducationList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): EducationList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((education, index) => (
        <tr
          key={`tr${education.id}${index}`}
          onClick={(): void => history.push(`/educations/${education.id}`)}
          role="gridcell"
          className="link"
        >
          <td>{education.contact_name}</td>
          <td className="is-hidden-mobile">{education.post_name}</td>
          <td>{education.start_str}</td>
          <td className="is-hidden-mobile">{education.end_str}</td>
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
            <th>Полное имя обучаемого</th>
            <th className="is-hidden-mobile">Должность ГО ЧС</th>
            <th>Начало обучения</th>
            <th className="is-hidden-mobile">Конец обучения</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
