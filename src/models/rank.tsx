import React, { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { StringInputProperties } from '../components/input';
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

export const RankIDSelect = (properties: SelectValues): JSX.Element => (
  <Select
    name="rank"
    label="Звание"
    listName="RankSelect"
    id={properties.id}
    icon="tag"
    setter={properties.setter}
  />
);

export const RankNameInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="name"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => properties.setter(event.target.value)}
    label="Наименование чина"
    icon="tag"
  />
);
