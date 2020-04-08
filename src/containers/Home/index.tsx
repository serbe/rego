import React, { useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';

import { EducationShort } from '../../models/education';
import { PracticeShort } from '../../models/practice';
import { rws } from '../../netapi';

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
    return 'hover:bg-green-400';
  }
  m.setMonth(m.getMonth() + 1);
  if (d < m) {
    return 'hover:bg-red-600';
  }
  return 'hover:bg-yellow-300';
};

const tdClass = (date: string): string => {
  const m = new Date();
  const d = new Date(date);
  if (d < m) {
    return 'px-1 py-1 border border-green-400';
  }
  m.setMonth(m.getMonth() + 1);
  if (d < m) {
    return 'px-1 py-1 border border-red-600';
  }
  return 'px-1 py-1 border border-yellow-300';
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
            <td className={tdClass(row.start_date)}>
              <Link to={`/education/${row.id}`}>{tinyDate(row.start_date)}</Link>
            </td>
            <td className={tdClass(row.start_date)}>
              <Link to={`/contact/${row.contact_id}`}>{row.contact_name}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const PracticeTable = (): JSX.Element => (
    <table className="border-2 border-collapse table-auto">
      <tbody>
        {practices.map((row, index) => (
          <tr key={index} className={trClass(row.date_of_practice)}>
            <td className={tdClass(row.date_of_practice)}>
              <Link to={`/practice/${row.id}`}>{tinyDate(row.date_of_practice)}</Link>
            </td>
            <td className={tdClass(row.date_of_practice)}>
              <Link to={`/kind/${row.kind_id}`}>{row.kind_short_name}</Link>
            </td>
            <td className={tdClass(row.date_of_practice)}>
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
