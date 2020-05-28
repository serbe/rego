import React from 'react';
import { Select, SelectValues } from '../components/select';

export type Scope = {
  id: number;
  name?: string;
  note?: string;
};

export type ScopeList = {
  id: number;
  name?: string;
  note?: string;
};

export const ScopeIdSelect = (values: SelectValues): JSX.Element => {
  const { id, callback } = values;
  return (
    <Select
      name="scope"
      label="Сфера деятельности"
      listName="ScopeSelect"
      id={id}
      icon="tag"
      callback={callback}
    />
  );
};
