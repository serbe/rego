import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { URL } from '../../helpers/utils';
import { EducationShort } from '../../models/education';
import { PracticeShort } from '../../models/practice';
import './index.css';

type HomeWS = {
  name: string;
  object: {
    EducationShort?: EducationShort[];
    PracticeShort?: PracticeShort[];
  };
  error?: string;
};

const trClass = (date: string): string => {
  const m = new Date();
  const d = new Date(date);
  if (d < m) {
    return 'tr-green';
  }
  m.setMonth(m.getMonth() + 1);
  if (d < m) {
    return 'tr-red';
  }
  return 'tr-yellow';
};

const tinyDate = (date: string): string => {
  if (date.length === 10) {
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`;
  }
  return date;
};

export const Home = (): JSX.Element => {
  const [hasError, setErrors] = useState<string>();
  const [educations, setEducations] = useState<EducationShort[]>([]);
  const [practices, setPractices] = useState<PracticeShort[]>([]);
  const history = useHistory();

  useEffect(() => {
    const ws = new WebSocket(URL);

    ws.addEventListener('message', (event: MessageEvent) => {
      const data = JSON.parse(event.data) as HomeWS;
      if (data.name && data.name === 'PracticeNear' && data.object.PracticeShort) {
        setPractices(data.object.PracticeShort);
      }
      if (data.name && data.name === 'EducationNear' && data.object.EducationShort) {
        setEducations(data.object.EducationShort);
      }
      if (data.error) {
        setErrors(data.error);
      }
    });

    ws.addEventListener('open', () => {
      ws.send('{"Get":{"List":"EducationNear"}}');
      ws.send('{"Get":{"List":"PracticeNear"}}');
    });

    return (): void => {
      ws.close();
    };
  }, []);

  const EducationTable = (): JSX.Element => (
    <table className="table is-narrow">
      <tbody>
        {educations.map((row, index) => (
          <tr key={index} className={trClass(row.start_date)}>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/education/${row.id}`)}
              role="gridcell"
            >
              {tinyDate(row.start_date)}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/contact/${row.contact_id}`)}
              role="gridcell"
            >
              {row.contact_name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const PracticeTable = (): JSX.Element => (
    <table className="table is-narrow">
      <tbody>
        {practices.map((row, index) => (
          <tr key={index} className={trClass(row.date_of_practice)}>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/practice/${row.id}`)}
              role="gridcell"
            >
              {tinyDate(row.date_of_practice)}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/kind/${row.kind_id}`)}
              role="gridcell"
            >
              {row.kind_short_name}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/company/${row.company_id}`)}
              role="gridcell"
            >
              {row.company_name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return hasError ? (
    <div>No data</div>
  ) : (
    <div className="columns is-mobile">
      <div className="column is-4">
        <EducationTable />
      </div>
      <div className="column is-4 is-offset-4">
        <PracticeTable />
      </div>
    </div>
  );
};
