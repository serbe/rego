import { ChangeEvent } from 'react';

import { FormField } from '../components/formfield';
import { NumberInputProperties, StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';

export type SirenType = {
  id: number;
  name?: string;
  radius?: number;
  note?: string;
};

export const SirenTypeEmpty: SirenType = {
  id: 0,
};

export type SirenTypeList = {
  id: number;
  name?: string;
  radius?: number;
  note?: string;
};

export const SirenTypeIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select
    name="siren_type_id"
    label="Тип сирены"
    listName="SirenTypeSelect"
    id={id}
    icon="tag"
    setter={setter}
  />
);

export const SirenTypeNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    name="siren_type_name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Тип сирены"
    icon="tag"
    autocomplete="off"
  />
);

export const SirenTypeRadiusInput = ({ value, setter }: NumberInputProperties): JSX.Element => (
  <FormField
    name="siren_type_radius"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => setter(Number(event.target.value))}
    label="Радиус действия"
    icon="tag"
    autocomplete="off"
  />
);
