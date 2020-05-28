import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from '../components/input';

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

export const PracticeListForm = (values: PracticeValues): JSX.Element => {
  const { practices } = values;
  const history = useHistory();
  return (
    <div className="field" key="practices">
      <label className="label" htmlFor="practice-1">
        Тренировки
      </label>
      {practices.map((practice, index) => (
        <Input
          name={`practice-${index}`}
          key={`practice-${index}`}
          onClick={(): void => history.push(`/practice/${practice.id}`)}
          value={`${practice.date_str || ''} - ${practice.kind_name || ''} - ${
            practice.topic || ''
          }`}
          readonly
          classNameDiv="pb5"
          className="link"
        />
      ))}
    </div>
  );
};
