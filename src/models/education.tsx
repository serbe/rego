import React, { Dispatch, SetStateAction } from 'react';

import { DatePicker, DatePickerValues } from '../components/datepicker';
import { Select, SelectValues } from '../components/select';

export type Education = {
  id: number;
  contact_id?: number;
  start_date?: string;
  end_date?: string;
  post_id?: number;
  note?: string;
};

export type EducationList = {
  id: number;
  contact_id?: number;
  contact_name?: string;
  start_date?: string;
  end_date?: string;
  start_str?: string;
  end_str?: string;
  post_id?: number;
  post_name?: string;
  note?: string;
};

export type EducationShort = {
  id: number;
  contact_id: number;
  contact_name: string;
  start_date: string;
};

type JsonEducationItemScheme = {
  command: 'Get';
  name: 'Education';
  object: { Education: Education };
  error: string;
};

export const EducationGetItem = (
  message: MessageEvent,
  setData: Dispatch<SetStateAction<Education | undefined>>,
): void => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as JsonEducationItemScheme;
  if (jsonData?.object) {
    setData(jsonData.object.Education);
  }
};

type JsonEducationShortListScheme = {
  command: 'Get';
  name: 'EducationNear';
  object: { EducationShort: EducationShort[] };
  error: string;
};

export const EducationGetShortList = (
  message: MessageEvent,
  setData: Dispatch<SetStateAction<EducationShort[]>>,
): void => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as JsonEducationShortListScheme;
  if (jsonData?.object) {
    setData(jsonData.object.EducationShort);
  }
};

type JsonEducationListScheme = {
  command: 'Get';
  name: 'EducationList';
  object: { EducationList: EducationList[] };
  error: string;
};

export const EducationNameSelect = (properties: SelectValues): JSX.Element => (
  <Select
    name="education-contact-name"
    label="Полное имя обучаемого"
    listName="ContactSelect"
    id={properties.id}
    icon="user"
    setter={properties.setter}
  />
);

export const EducationStartDateInput = (properties: DatePickerValues): JSX.Element => (
  <DatePicker
    name="education-start-date"
    label="Дата начала обучения"
    value={properties.value}
    setter={properties.setter}
  />
);

export const EducationEndDateInput = (properties: DatePickerValues): JSX.Element => (
  <DatePicker
    name="education-end-date"
    label="Дата окончания обучения"
    value={properties.value}
    setter={properties.setter}
  />
);
