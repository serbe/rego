import React from 'react';
import { Select, SelectValues } from '../components/select';

export type Rank = {
  id: number;
  name?: string;
  note?: string;
};

export type RankList = {
  id: number;
  name?: string;
  note?: string;
};

export const RankIDSelect = (values: SelectValues): JSX.Element => {
  const { id, setter } = values;
  return (
    <Select name="rank" label="Звание" listName="RankSelect" id={id} icon="tag" setter={setter} />
  );
};
