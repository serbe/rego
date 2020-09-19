import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

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

export type SirenList = {
  id: number;
  siren_type_name?: string;
  address?: string;
  contact_name?: string;
  phones?: number[];
};

type JsonItemScheme = { command: 'Get'; name: 'Siren'; object: { Siren: Siren }; error: string };

export const SirenGetItem = (
  message: MessageEvent,
  setData: Dispatch<SetStateAction<Siren | undefined>>,
): void => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as JsonItemScheme;
  if (jsonData?.object) {
    setData(jsonData.object.Siren);
  }
};

export const SirenNumberIDInput = (properties: NumberInputProperties): JSX.Element => (
  <FormField
    name="siren_numberID"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(Number(event.target.value))
    }
    label="Инвентарный номер"
    icon="tag"
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
  />
);
