import React, { useContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext, SocketValues } from '../../helpers/socket';
import { EducationShort } from '../../models/education';
import { PracticeShort } from '../../models/practice';
import './index.css';

type EducationProperties = {
  values?: EducationShort[];
};

type PracticeProperties = {
  values?: PracticeShort[];
};

const EducationTable = (properties: EducationProperties): JSX.Element => {
  const history = useHistory();
  const { values } = properties;
  return (
    <table className="table is-narrow">
      <tbody>
        {values?.map((row, index) => (
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

const PracticeTable = (properties: PracticeProperties): JSX.Element => {
  const history = useHistory();
  const { values } = properties;
  return (
    <table className="table is-narrow">
      <tbody>
        {values?.map((row, index) => (
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
  const { state, dispatch, rws } = useContext<SocketValues>(SocketContext);
  const { PracticeShort, EducationShort, Error } = state;

  useEffect(() => {
    rws.send('{"Get":{"List":"EducationNear"}}');
    rws.send('{"Get":{"List":"PracticeNear"}}');
    return (): void => {
      // dispatch('clearEducationNear');
      // dispatch('clearPracticeNear');
    };
  }, []);

  return Error ? (
    <div>No data</div>
  ) : (
    <div className="columns is-mobile">
      <div className="column is-4">
        <EducationTable values={EducationShort} />
      </div>
      <div className="column is-4 is-offset-4">
        <PracticeTable values={PracticeShort} />
      </div>
    </div>
  );
};
