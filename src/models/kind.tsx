import React, { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { StringInputProperties } from '../components/input';

export type KindJsonScheme = {
  name: string;
  object: {
    Kind?: Kind;
  };
  error?: string;
};

export type KindListJsonScheme = {
  name: string;
  object: {
    KindList?: KindList[];
  };
  error?: string;
};

export type Kind = {
  id: number;
  name?: string;
  short_name?: string;
  note?: string;
};

export type KindList = {
  id: number;
  name?: string;
  short_name?: string;
  note?: string;
};

export const KindNameInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="kind-name"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => properties.setter(event.target.value)}
    label="Наименование типа тренировки"
    icon="tag"
  />
);

export const KindShortNameInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="kind-short-name"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => properties.setter(event.target.value)}
    label="Сокращенное наименование"
    icon="tag"
  />
);
