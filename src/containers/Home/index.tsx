import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TableContainer, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Paper, Grid } from '@material-ui/core';

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

function EducationTable(educations: EducationShort[]): JSX.Element {
  const history = useHistory();

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="edications table">
        <TableBody>
          {educations.map((row) => (
            <TableRow key={row.id} className={trClass(row.start_date)} hover>
              <TableCell onClick={(): void => history.push(`/education/${row.id}`)}>
                {tinyDate(row.start_date)}
              </TableCell>
              <TableCell onClick={(): void => history.push(`/contact/${row.contact_id}`)}>
                {row.contact_name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PracticeTable(practices: PracticeShort[]): JSX.Element {
  const history = useHistory();

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="practices table">
        <TableBody>
          {practices.map((row) => (
            <TableRow key={row.id} className={trClass(row.date_of_practice)} hover>
              <TableCell
                component="th"
                scope="row"
                onClick={(): void => history.push(`/practice/${row.id}`)}
              >
                {tinyDate(row.date_of_practice)}
              </TableCell>
              <TableCell onClick={(): void => history.push(`/kind/${row.kind_id}`)}>
                {row.kind_short_name}
              </TableCell>
              <TableCell onClick={(): void => history.push(`/company/${row.company_id}`)}>
                {row.company_name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function Home(): JSX.Element {
  const [hasError, setErrors] = useState<string>();
  const [educations, setEducations] = useState<EducationShort[]>([]);
  const [practices, setPractices] = useState<PracticeShort[]>([]);

  useEffect(() => {
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

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

  return hasError ? (
    <div>No data</div>
  ) : (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        {PracticeTable(practices)}
      </Grid>
      <Grid item xs={4}>
        {EducationTable(educations)}
      </Grid>
      {/* <Grid item xs={4} /> */}
      <Grid item xs={4}>
        {PracticeTable(practices)}
      </Grid>
    </Grid>
  );
}
