import React, { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { InputValues, InputNumberValues } from '../components/input';
// import { Select, SelectValues } from '../components/select';

export type SirenJsonScheme = {
  name: string;
  object: {
    Siren?: Siren;
  };
  error?: string;
};

export type SirenListJsonScheme = {
  name: string;
  object: {
    SirenList?: SirenList[];
  };
  error?: string;
};

export type Siren = {
  id: number;
  num_id?: number;
  num_pass?: string;
  siren_type_id?: number;
  address?: string;
  radio?: string;
  desk?: string;
  contact_id?: number;
  company_id?: number;
  latitude?: string;
  longitude?: string;
  stage?: number;
  own?: string;
  note?: string;
};

export type SirenList = {
  id: number;
  siren_type_name?: string;
  address?: string;
  contact_name?: string;
  phones?: number[];
};

export const SirenNumberIDInput = (values: InputNumberValues): JSX.Element => {
  const { value, setter } = values;
  return (
    <FormField
      name="name"
      value={value.toString()}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => setter(Number(event.target.value))}
      label="Инвентарный номер"
      icon="tag"
    />
  );
};

export const SirenNumberPassportInput = (values: InputValues): JSX.Element => {
  const { value, setter } = values;
  return (
    <FormField
      name="name"
      value={value.toString()}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => setter(event.target.value)}
      label="Номер по паспорту"
      icon="tag"
    />
  );
};
