import React, { ChangeEvent } from 'react';

import { FormField } from '../components/formfield';
import { StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';

export type Department = {
  id: number;
  name?: string;
  note?: string;
};

export const DepartmentEmpty: Department = {
  id: 0,
};

export type DepartmentList = {
  id: number;
  name?: string;
  note?: string;
};

export const DepartmentIDSelect = (properties: SelectValues): JSX.Element => (
  <Select
    name="department"
    label="Отдел"
    listName="DepartmentSelect"
    id={properties.id}
    icon="tag"
    setter={properties.setter}
  />
);

export const DepartmentNameInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="name"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Наименование отдела"
    icon="tag"
    autocomplete="off"
  />
);
