import { ChangeEvent } from 'react';

import { FormField } from '../components/formfield';
import { StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';

export type Kind = {
  id: number;
  name?: string;
  short_name?: string;
  note?: string;
};

export const KindEmpty: Kind = {
  id: 0,
};

export type KindList = {
  id: number;
  name?: string;
  short_name?: string;
  note?: string;
};

export const KindNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    name="kind-name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Наименование типа тренировки"
    icon="tag"
    autocomplete="off"
  />
);

export const KindShortNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    name="kind-short-name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Сокращенное наименование"
    icon="tag"
    autocomplete="off"
  />
);

export const KindIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select
    name="kink-select"
    label="Тип тренировки"
    listName="KindSelect"
    id={id}
    icon="tag"
    setter={setter}
  />
);
