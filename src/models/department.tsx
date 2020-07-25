import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { FormField } from '../components/formfield';
import { StringInputProperties } from '../components/input';
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

type JsonItemScheme = {
  command: 'Get';
  name: 'Department';
  object: { Department: Department };
  error: string;
};

export const DepartmentGetItem = (
  message: MessageEvent,
  setData: Dispatch<SetStateAction<Department | undefined>>,
): void => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as JsonItemScheme;
  if (jsonData?.object) {
    setData(jsonData.object.Department);
  }
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
  />
);
