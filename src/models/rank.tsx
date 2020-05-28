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

export const RankIdSelect = (values: SelectValues): JSX.Element => {
  const { id, callback } = values;
  return (
    <Select
      name="rank"
      label="Звание"
      listName="RankSelect"
      id={id}
      icon="tag"
      callback={callback}
    />
  );
};
