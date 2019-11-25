import React, { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

import { EducationShort } from '../../models/education';
import { PracticeShort } from '../../models/practice';
import { fetchData } from '../../helpers/utils';
import { Grid, Container, Table, Menu } from 'semantic-ui-react';

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

  const EducationTable = (): JSX.Element => (
    <Table celled>
      <Table.Body>
        {educations.map((row, index) => (
          <Table.Row key={index} className={trClass(row.start_date)}>
            <Table.Cell>
              <Link to={`/education/${row.id}`}>{tinyDate(row.start_date)}</Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/contact/${row.contact_id}`}>{row.contact_name}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  const PracticeTable = (): JSX.Element => (
    <Table celled>
      <Table.Body>
        {practices.map((row, index) => (
          <Table.Row key={index} className={trClass(row.date_of_practice)}>
            <Table.Cell>
              <Link to={`/practice/${row.id}`}>{tinyDate(row.date_of_practice)}</Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/kind/${row.kind_id}`}>{row.kind_short_name}</Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/company/${row.company_id}`}>{row.company_name}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  return hasError ? (
    <div>No data</div>
  ) : (
    <Grid columns={3} divided>
      <Grid.Row>
        <Grid.Column>
          <EducationTable />
        </Grid.Column>
        <Grid.Column></Grid.Column>
        <Grid.Column>
          <PracticeTable />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
