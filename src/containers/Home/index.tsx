import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';

import { EducationShort } from '../../models/education';
import { PracticeShort } from '../../models/practice';
// import { fetchData } from '../../helpers/utils';

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

export const Home: FC<{}> = () => {
  const [hasError, setErrors] = useState();
  const [educations, setEducations] = useState<EducationShort[]>([]);
  const [practices, setPractices] = useState<PracticeShort[]>([]);

  // useEffect(() => {
  //   fetchData('/api/go/education/near')
  //     .then(response =>
  //       response.EducationShort ? setEducations(response.EducationShort) : setErrors(true),
  //     )
  //     .catch(error => setErrors(error));
  // }, []);

  // useEffect(() => {
  //   fetchData('/api/go/practice/near')
  //     .then(response =>
  //       response.PracticeShort ? setPractices(response.PracticeShort) : setErrors(true),
  //     )
  //     .catch(error => setErrors(error));
  // }, []);

  const EducationTable = (): JSX.Element => (
    <table className="border-collapse border-2 border-gray-500 table-auto">
      <tbody>
        {educations.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index} className={trClass(row.start_date)}>
            <td className="border px-2 py-2">
              <Link to={`/education/${row.id}`}>{tinyDate(row.start_date)}</Link>
            </td>
            <td className="border px-2 py-2">
              <Link to={`/contact/${row.contact_id}`}>{row.contact_name}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const PracticeTable = (): JSX.Element => (
    <table className="border-collapse border-2 border-gray-500 table-auto">
      <tbody>
        {practices.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index} className={trClass(row.date_of_practice)}>
            <td className="border px-2 py-2">
              <Link to={`/practice/${row.id}`}>{tinyDate(row.date_of_practice)}</Link>
            </td>
            <td className="border px-2 py-2">
              <Link to={`/kind/${row.kind_id}`}>{row.kind_short_name}</Link>
            </td>
            <td className="border px-2 py-2">
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
