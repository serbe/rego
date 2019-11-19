import React, { useState, useEffect, FC } from 'react';

import { EducationShort } from '../../models/education';
import { PracticeShort } from '../../models/practice';
import { fetchData } from '../../helpers/utils';
import { Column, Table, RowClassFunc } from '../../components/table';

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

const educationColumns: Column[] = [
  {
    field: 'start_date',
    linkBase: '/education/',
    linkField: 'id',
    fieldFunc: tinyDate,
    className: 'w65',
  },
  {
    field: 'contact_name',
    linkBase: '/contact/',
    linkField: 'contact_id',
  },
];

const practiceRowClass: RowClassFunc = {
  rowFunc: trClass,
  rowFuncField: 'date_of_practice',
};

const educationRowClass: RowClassFunc = {
  rowFunc: trClass,
  rowFuncField: 'start_date',
};

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

  return hasError ? (
    <div>No data</div>
  ) : (
    <div className="container">
      <div className="content has-text-centered">
        <div className="columns">
          <div className="column is-one-third">
            <Table
              data={educations}
              rowClass={educationRowClass}
              columns={educationColumns}
              narrow
              fullwidth
              nohead
            />
          </div>
          <div className="column is-one-third is-offset-one-third">
            <Table
              data={practices}
              rowClass={practiceRowClass}
              columns={practiceColumns}
              narrow
              fullwidth
              nohead
            />
          </div>
        </div>
      </div>
    </div>
  );
};
