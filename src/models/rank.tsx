import React, { ChangeEvent } from 'react';

import { FormField } from '../components/formfield';
import { StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';

export type Rank = {
  id: number;
  name?: string;
  note?: string;
};

export const RankEmpty: Rank = {
  id: 0,
};

export type RankList = {
  id: number;
  name?: string;
  note?: string;
};

export const RankIDSelect = (properties: SelectValues): JSX.Element => (
  <Select
    icon="tag"
    id={properties.id}
    label="Чин"
    listName="RankSelect"
    name="rank"
    setter={properties.setter}
  />
);

export const RankNameInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    icon="tag"
    label="Наименование чина"
    name="name"
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    value={properties.value}
    autocomplete="off"
  />
);
