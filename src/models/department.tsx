import React from 'react';
import { Select, SelectValues } from '../components/select';

export type Department = {
  id: number;
  name?: string;
  note?: string;
};

export type DepartmentList = {
  id: number;
  name?: string;
  note?: string;
};

export const DepartmentIDSelect = (values: SelectValues): JSX.Element => {
  const { id, callback } = values;
  return (
    <Select
      name="department"
      label="Отдел"
      listName="DepartmentSelect"
      id={id}
      icon="tag"
      callback={callback}
    />
  );
};
