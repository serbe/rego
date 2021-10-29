import { ChangeEvent } from 'react';

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

export const RankIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select icon="tag" id={id} label="Чин" listName="RankSelect" name="rank" setter={setter} />
);

export const RankNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    icon="tag"
    label="Наименование чина"
    name="name"
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    value={value}
    autocomplete="off"
  />
);
