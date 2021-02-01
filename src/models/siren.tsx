import React, { ChangeEvent } from 'react';

import { FormField } from '../components/formfield';
import { NumberInputProperties, StringInputProperties } from '../components/input';

export type Siren = {
  id: number;
  num_id?: number;
  num_pass?: string;
  siren_type_id?: number;
  address?: string;
  radio?: string;
  desk?: string;
  contact_id?: number;
  company_id?: number;
  latitude?: string;
  longitude?: string;
  stage?: number;
  own?: string;
  note?: string;
};

export const SirenEmpty: Siren = {
  id: 0,
};

export type SirenList = {
  id: number;
  siren_type_name?: string;
  address?: string;
  contact_name?: string;
  phones?: number[];
};

export const SirenNumberIDInput = (properties: NumberInputProperties): JSX.Element => (
  <FormField
    name="siren_number_id"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(Number(event.target.value))
    }
    label="Инвентарный номер"
    icon="tag"
    autocomplete="off"
  />
);

export const SirenNumberPassportInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="siren_number_passport"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Номер по паспорту"
    icon="tag"
    autocomplete="off"
  />
);

export const SirenRadioInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="siren_radio"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Радио"
    icon="tag"
    autocomplete="off"
  />
);

export const SirenDeskInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="siren_desk"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Пульт управления"
    icon="tag"
    autocomplete="off"
  />
);

export const SirenLatitudeInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="siren_latitude"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Широта"
    icon="tag"
    autocomplete="off"
  />
);

export const SirenLongtitudeInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="siren_longtitude"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Долгота"
    icon="tag"
    autocomplete="off"
  />
);

export const SirenStageInput = (properties: NumberInputProperties): JSX.Element => (
  <FormField
    name="siren_stage"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(Number(event.target.value))
    }
    label="Этап"
    icon="tag"
    autocomplete="off"
  />
);

export const SirenOwnInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="siren_own"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Собственность"
    icon="tag"
    autocomplete="off"
  />
);
