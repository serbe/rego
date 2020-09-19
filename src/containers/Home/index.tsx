import './index.css';

import React from 'react';
import { useHistory } from 'react-router-dom';

import { GetList } from '../../helpers/fetcher';
import { EducationShort } from '../../models/education';
import { PracticeShort } from '../../models/practice';

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
        {educations.map((education) => (
          <tr key={education.id} className={trClass(education.start_date)}>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/education/${education.id}`)}
              role="gridcell"
            >
              {tinyDate(education.start_date)}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/contact/${education.contact_id}`)}
              role="gridcell"
            >
              {education.contact_name}
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
        {practices.map((practice) => (
          <tr key={practice.id} className={trClass(practice.date_of_practice)}>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/practice/${practice.id}`)}
              role="gridcell"
            >
              {tinyDate(practice.date_of_practice)}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/kinds/${practice.kind_id}`)}
              role="gridcell"
            >
              {practice.kind_short_name}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/companies/${practice.company_id}`)}
              role="gridcell"
            >
              {practice.company_name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const Home = (): JSX.Element => {
  const [educations, educationsError] = GetList('EducationNear');
  const [practices, practicesError] = GetList('PracticeNear');

  return practicesError || educationsError ? (
    <div>No data</div>
  ) : (
    <div className="columns is-mobile">
      <div className="column is-4">{EducationTable(educations as EducationShort[])}</div>
      <div className="column is-4 is-offset-4">{PracticeTable(practices as PracticeShort[])}</div>
    </div>
  );
};
