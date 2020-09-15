import './index.css';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuthState } from '../../helpers/auth';
import { useWebSocketState } from '../../helpers/websocket';
import { EducationGetShortList, EducationShort } from '../../models/education';
import { PracticeGetShortList, PracticeShort } from '../../models/practice';

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

const EducationTable = (educations: EducationShort[]): JSX.Element => {
  const history = useHistory();
  return (
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
};

const PracticeTable = (practices: PracticeShort[]): JSX.Element => {
  const history = useHistory();
  return (
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
              onMouseDown={(): void => history.push(`/kinds/${row.kind_id}`)}
              role="gridcell"
            >
              {row.kind_short_name}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/companies/${row.company_id}`)}
              role="gridcell"
            >
              {row.company_name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const Home = (): JSX.Element => {
  const { ws } = useWebSocketState();
  const { auth } = useAuthState();
  const [educations, setEducations] = useState<EducationShort[]>([]);
  const [practices, setPractices] = useState<PracticeShort[]>([]);

  useEffect(() => {
    if (ws) {
      ws.addEventListener('message', (message: MessageEvent) => {
        EducationGetShortList(message, setEducations);
      });

      ws.addEventListener('message', (message: MessageEvent) => {
        PracticeGetShortList(message, setPractices);
      });

      ws.send(`{"command":{"Get":{"List":"EducationNear"}},"addon":"${auth.token}"}`);
      ws.send(`{"command":{"Get":{"List":"PracticeNear"}},"addon":"${auth.token}"}`);

      return (): void => {
        ws.removeEventListener('message', (message: MessageEvent) => {
          EducationGetShortList(message, setEducations);
        });

        ws.removeEventListener('message', (message: MessageEvent) => {
          PracticeGetShortList(message, setPractices);
        });
      };
    }
  }, [auth.token, ws]);

  return (
    <div className="columns is-mobile">
      <div className="column is-4">{EducationTable(educations)}</div>
      <div className="column is-4 is-offset-4">{PracticeTable(practices)}</div>
    </div>
  );
};
