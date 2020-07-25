import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

import { DatePicker, DatePickerValues } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input, StringInputProperties } from '../components/input';

export interface PracticeValues {
  practices: PracticeList[];
}

export type Practice = {
  id: number;
  company_id?: number;
  kind_id?: number;
  topic?: string;
  date_of_practice?: string;
  note?: string;
};

export type PracticeList = {
  id: number;
  company_id?: number;
  company_name?: string;
  kind_id?: number;
  kind_name?: string;
  kind_short_name?: string;
  topic?: string;
  date_of_practice?: string;
  date_str?: string;
};

export type PracticeShort = {
  id: number;
  company_id: number;
  company_name: string;
  kind_id: number;
  kind_short_name: string;
  date_of_practice: string;
};

type JsonItemScheme = {
  command: 'Get';
  name: 'Practice';
  object: { Practice: Practice };
  error: string;
};

export const PracticeGetItem = (
  message: MessageEvent,
  setData: Dispatch<SetStateAction<Practice | undefined>>,
): void => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as JsonItemScheme;
  if (jsonData?.object) {
    setData(jsonData.object.Practice);
  }
};

export const PracticeListForm = (properties: PracticeValues): JSX.Element => {
  const history = useHistory();
  return properties.practices.length > 0 ? (
    <div className="field" key="practices">
      <label className="label" htmlFor="practice-1">
        Тренировки
      </label>
      {properties.practices.map((practice, index) => (
        <Input
          name={`practice-${index}`}
          key={`practice-${index}`}
          onClick={(): void => history.push(`/practice/${practice.id}`)}
          value={`${practice.date_str || ''} - ${practice.kind_name || ''} - ${
            practice.topic || ''
          }`}
          readonly
          classNameDiv="pb-1"
          className="link"
        />
      ))}
    </div>
  ) : (
    <></>
  );
};

export const PracticeTopicInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="practice-topic"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Тема тренировки"
    icon="tag"
  />
);

export const PracticeDateInput = (properties: DatePickerValues): JSX.Element => (
  <DatePicker
    name="practice-date"
    label="Дата проведения тренировки"
    value={properties.value}
    setter={properties.setter}
  />
);
