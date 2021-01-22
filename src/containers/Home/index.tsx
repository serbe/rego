import './index.css';

import React from 'react';
import { useHistory } from 'react-router-dom';

import { EducationShort } from '../../models/education';
import { PracticeShort } from '../../models/practice';
import { GetList } from '../../services/fetcher';

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
        {educations.map((row) => (
          <tr key={row.id} className={trClass(row.start_date)}>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/educations/${row.id}`)}
              role="gridcell"
            >
              {tinyDate(row.start_date)}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/contacts/${row.contact_id}`)}
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
        {practices.map((row) => (
          <tr key={row.id} className={trClass(row.date_of_practice)}>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/practices/${row.id}`)}
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
  const educations = GetList('EducationNear');
  const practices = GetList('PracticeNear');

  return (
    <div className="columns">
      <div className="column is-4">{EducationTable(educations as EducationShort[])}</div>
      <div className="column is-4 is-offset-4">{PracticeTable(practices as PracticeShort[])}</div>
    </div>
  );
};
