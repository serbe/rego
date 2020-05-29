import React from 'react';
import { FormField } from '../components/formfield';
import { InputValues } from '../components/input';
import { Select, SelectValues } from '../components/select';
import { ContactShort } from './contact';
import { PracticeList } from './practice';

export type CompanyJsonScheme = {
  name: string;
  object: {
    Company?: Company;
  };
  error?: string;
};

export type CompanyListJsonScheme = {
  name: string;
  object: {
    CompanyList?: CompanyList[];
  };
  error?: string;
};

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

export const CompanyIDSelect = (values: SelectValues): JSX.Element => {
  const { id, callback } = values;
  return (
    <Select
      name="company"
      label="Организация"
      listName="CompanySelect"
      id={id}
      icon="building"
      callback={callback}
    />
  );
};

export const CompanyNameInput = (values: InputValues): JSX.Element => {
  const { value, onChange } = values;
  return (
    <FormField
      name="name"
      value={value}
      onChange={onChange}
      label="Наименование организации"
      icon="building"
    />
  );
};
