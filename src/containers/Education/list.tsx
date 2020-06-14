import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Search } from '../../components/table';
import { URL } from '../../helpers/utils';
import { EducationList, EducationListJsonScheme } from '../../models/education';

export const Educations = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<EducationList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): EducationList[] => {
    return paginationData();
  };

  useEffect(() => {
    const ws = new WebSocket(URL);

    ws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as EducationListJsonScheme;
      if (data.name && data.name === 'EducationList' && data.object.EducationList) {
        setData(data.object.EducationList);
      }
      if (data.error) {
        setError(data.error);
      }
    });

    ws.addEventListener('open', () => {
      ws.send('{"Get":{"List":"EducationList"}}');
    });

    return (): void => {
      ws.close();
    };
  }, []);

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
