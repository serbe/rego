import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

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

type JsonItemScheme = { command: 'Get'; name: 'Rank'; object: { Rank: Rank }; error: string };

export const RankGetItem = (
  message: MessageEvent,
  setData: Dispatch<SetStateAction<Rank | undefined>>,
): void => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as JsonItemScheme;
  if (jsonData?.object) {
    setData(jsonData.object.Rank);
  }
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
  />
);
