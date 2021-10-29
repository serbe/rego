import { ChangeEvent } from 'react';

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

export const CompanyIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select
    name="company-select"
    label="Наименование организации"
    listName="CompanySelect"
    id={id}
    icon="building"
    setter={setter}
  />
);

export const CompanyNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    name="company-name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Наименование организации"
    icon="building"
    autocomplete="off"
  />
);
