import React from 'react';
import { FormField } from '../components/formfield';
import { InputValues } from '../components/input';
import { Select, SelectValues } from '../components/select';

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

export const SirenNumberIDInput = (values: InputValues): JSX.Element => {
  const { value, onChange } = values;
  return (
    <FormField name="name" value={value} onChange={onChange} label="Инвентарный номер" icon="tag" />
  );
};
