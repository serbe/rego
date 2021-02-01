import React, { ChangeEvent } from 'react';

import { FormField } from '../components/formfield';
import { StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';
import { ContactShort } from './contact';
import { PracticeList } from './practice';

export type Company = {
  id: number;
  name?: string;
  address?: string;
  scope_id?: number;
  note?: string;
  emails?: string[];
  phones?: number[];
  faxes?: number[];
  practices?: PracticeList[];
  contacts?: ContactShort[];
};

export const CompanyEmpty: Company = {
  id: 0,
};

export type CompanyList = {
  id: number;
  name?: string;
  address?: string;
  scope_name?: string;
  emails?: string[];
  phones?: number[];
  faxes?: number[];
  practices?: string[];
};

export const CompanyIDSelect = (properties: SelectValues): JSX.Element => (
  <Select
    name="company-select"
    label="Наименование организации"
    listName="CompanySelect"
    id={properties.id}
    icon="building"
    setter={properties.setter}
  />
);

export const CompanyNameInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="company-name"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Наименование организации"
    icon="building"
    autocomplete="off"
  />
);
