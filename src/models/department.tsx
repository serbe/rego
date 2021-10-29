import { ChangeEvent } from 'react';

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

export const DepartmentIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select
    name="department"
    label="Отдел"
    listName="DepartmentSelect"
    id={id}
    icon="tag"
    setter={setter}
  />
);

export const DepartmentNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    name="name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Наименование отдела"
    icon="tag"
    autocomplete="off"
  />
);
