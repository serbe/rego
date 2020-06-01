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

export const ScopeIDSelect = (values: SelectValues): JSX.Element => {
  const { id, setter } = values;
  return (
    <Select
      name="scope"
      label="Сфера деятельности"
      listName="ScopeSelect"
      id={id}
      icon="tag"
      setter={setter}
    />
  );
};
