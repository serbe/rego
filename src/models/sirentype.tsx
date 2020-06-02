import React, { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { FieldNumberProperties, FieldStringProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';

export type SirenTypeJsonScheme = {
  name: string;
  object: {
    SirenType?: SirenType;
  };
  error?: string;
};

export type SirenTypeListJsonScheme = {
  name: string;
  object: {
    SirenTypeList?: SirenTypeList[];
  };
  error?: string;
};

export type SirenType = {
  id: number;
  name?: string;
  radius?: number;
  note?: string;
};

export type SirenTypeList = {
  id: number;
  name?: string;
  radius?: number;
  note?: string;
};

export const SirenTypeIDSelect = (values: SelectValues): JSX.Element => {
  const { id, setter } = values;
  return (
    <Select
      name="siren_type_id"
      label="Тип сирены"
      listName="SyrenTypeSelect"
      id={id}
      icon="tag"
      setter={setter}
    />
  );
};

export const SirenTypeNameInput = (values: FieldStringProperties): JSX.Element => {
  const { value, setter } = values;
  return (
    <FormField
      name="name"
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => setter(event.target.value)}
      label="Тип сирены"
      icon="tag"
    />
  );
};

export const SirenTypeRadiusInput = (values: FieldNumberProperties): JSX.Element => {
  const { value, setter } = values;
  return (
    <FormField
      name="stage"
      value={value.toString()}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => setter(Number(event.target.value))}
      label="Радиус действия"
      icon="tag"
    />
  );
};
