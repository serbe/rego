import React, { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

import { EducationShort } from '../../models/education';
import { PracticeShort } from '../../models/practice';
import { fetchData } from '../../helpers/utils';
import { Column, Table } from '../../components/table';

import './home.css';

const trClass = (date: string): 'tr-is-success' | 'tr-is-danger' | 'tr-is-warning' => {
  const m = new Date();
  const d = new Date(date);
  if (d < m) {
    return 'tr-is-success';
  }
  m.setMonth(m.getMonth() + 1);
  if (d < m) {
    return 'tr-is-danger';
  }
  return 'tr-is-warning';
};

const tinyDate = (date: string): string => {
  if (date.length === 10) {
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`;
  }
  return date;
};

const practiceColumns: Column[] = [
  {
    field: 'date_of_practice',
    linkBase: '/practice/',
    linkField: 'id',
    fieldFunc: tinyDate,
    className: 'w65',
  },
  {
    field: 'kind_short_name',
    linkBase: '/practice/',
    linkField: 'id',
    className: 'w35',
  },
  {
    field: 'company_name',
    linkBase: '/company/',
    linkField: 'company_id',
  },
];

export const Home: FC<{}> = () => {
  const [hasError, setErrors] = useState();
  const [educations, setEducations] = useState<EducationShort[]>([]);
  const [practices, setPractices] = useState<PracticeShort[]>([]);

  useEffect(() => {
    fetchData('/api/go/education/near')
      .then(response =>
        response.EducationShort ? setEducations(response.EducationShort) : setErrors(true),
      )
      .catch(error => setErrors(error));
  }, []);

  useEffect(() => {
    fetchData('/api/go/practice/near')
      .then(response =>
        response.PracticeShort ? setPractices(response.PracticeShort) : setErrors(true),
      )
      .catch(error => setErrors(error));
  }, []);

  const EducationTr = () =>
    educations ? (
      <>
        {educations.map((item: EducationShort, index: number) => (
          <tr key={index} className={trClass(item.start_date)}>
            <td>
              <Link to={`/education/${item.id}`}>{tinyDate(item.start_date)}</Link>
            </td>
            <td>
              <Link to={`/contact/${item.contact_id}`}>{item.contact_name}</Link>
            </td>
          </tr>
        ))}
      </>
    ) : null;

  const Educations = (): JSX.Element | null =>
    educations ? (
      <table className="table is-narrow is-striped is-fullwith" key="educations">
        <tbody>
          <EducationTr />
        </tbody>
      </table>
    ) : null;

  const PracticeTr = (): JSX.Element | null =>
    practices ? (
      <>
        {practices.map((item: PracticeShort, index: number) => (
          <tr key={index} className={trClass(item.date_of_practice)}>
            <td className="w65">
              <Link to={`/practice/${item.id}`}>{tinyDate(item.date_of_practice)}</Link>
            </td>
            <td className="w35 is-centered">
              <Link to={`/practice/${item.id}`}>{item.kind_short_name}</Link>
            </td>
            <td>
              <Link to={`/company/${item.company_id}`}>{item.company_name}</Link>
            </td>
          </tr>
        ))}
      </>
    ) : null;

  const Practices = (): JSX.Element | null =>
    practices ? (
      <table className="table is-narrow is-striped is-fullwith" key="practices">
        <tbody>
          <PracticeTr />
        </tbody>
      </table>
    ) : null;

  return hasError ? (
    <div>No data</div>
  ) : (
    <div className="container">
      <div className="content has-text-centered">
        <div className="columns">
          <div className="column is-one-third">
            <Table data={practices} columns={practiceColumns} is-narrow is-striped is-fullwith />
          </div>
          <div className="column is-one-third is-offset-one-third">
            <Practices />
          </div>
        </div>
      </div>
    </div>
  );
};
