import React, { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { FieldStringProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';

export type DepartmentJsonScheme = {
  name: string;
  object: {
    Department?: Department;
  };
  error?: string;
};

export type DepartmentListJsonScheme = {
  name: string;
  object: {
    DepartmentList?: DepartmentList[];
  };
  error?: string;
};

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
  const { id, setter } = values;
  return (
    <Select
      name="department"
      label="Отдел"
      listName="DepartmentSelect"
      id={id}
      icon="tag"
      setter={setter}
    />
  );
};

export const DepartmentNameInput = (values: FieldStringProperties): JSX.Element => {
  const { value, setter } = values;
  return (
    <FormField
      name="name"
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => setter(event.target.value)}
      label="Наименование отдела"
      icon="tag"
    />
  );
};
