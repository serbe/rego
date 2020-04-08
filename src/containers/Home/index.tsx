import React, { useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';

import { EducationShort } from '../../models/education';
import { PracticeShort } from '../../models/practice';
import { rws } from '../../netapi';

import './home.css';

type HomeWS = {
  name: string;
  object: {
    EducationShort?: EducationShort[];
    PracticeShort?: PracticeShort[];
  };
  error?: string;
};

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

export const Home: FC<{}> = () => {
  const [hasError, setErrors] = useState<string>();
  const [educations, setEducations] = useState<EducationShort[]>([]);
  const [practices, setPractices] = useState<PracticeShort[]>([]);

  useEffect(function () {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data: HomeWS = JSON.parse(message.data);
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
    rws.send('{"Get":{"List":"EducationNear"}}');
    rws.send('{"Get":{"List":"PracticeNear"}}');

    return function cleanup(): void {
      rws.removeEventListener('message', (message: unknown) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

  const EducationTable = (): JSX.Element => (
    <table className="border-2 border-collapse border-gray-500 table-auto">
      <tbody>
        {educations.map((row, index) => (
          <tr key={index} className={trClass(row.start_date)}>
            <td className="px-2 py-2 border">
              <Link to={`/education/${row.id}`}>{tinyDate(row.start_date)}</Link>
            </td>
            <td className="px-2 py-2 border">
              <Link to={`/contact/${row.contact_id}`}>{row.contact_name}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const PracticeTable = (): JSX.Element => (
    <table className="border-2 border-collapse border-gray-500 table-auto">
      <tbody>
        {practices.map((row, index) => (
          <tr key={index} className={trClass(row.date_of_practice)}>
            <td className="px-2 py-2 border">
              <Link to={`/practice/${row.id}`}>{tinyDate(row.date_of_practice)}</Link>
            </td>
            <td className="px-2 py-2 border">
              <Link to={`/kind/${row.kind_id}`}>{row.kind_short_name}</Link>
            </td>
            <td className="px-2 py-2 border">
              <Link to={`/company/${row.company_id}`}>{row.company_name}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return hasError ? (
    <div>No data</div>
  ) : (
    <div className="flex">
      <div className="flex-1">
        <EducationTable />
      </div>
      <div className="flex-1" />
      <div className="flex-1">
        <PracticeTable />
      </div>
    </div>
  );
};
