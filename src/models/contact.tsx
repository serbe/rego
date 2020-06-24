import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { DatePicker, DatePickerValues } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input, StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';

export interface ContactShortValues {
  contacts: ContactShort[];
}

export type Contact = {
  id: number;
  name?: string;
  company_id?: number;
  department_id?: number;
  post_id?: number;
  post_go_id?: number;
  rank_id?: number;
  birthday?: string;
  note?: string;
  emails?: string[];
  phones?: number[];
  faxes?: number[];
  educations?: string[];
};

export interface ContactForm {
  id: number;
  name: string;
  company_id: number;
  department_id: number;
  post_id: number;
  post_go_id: number;
  rank_id: number;
  birthday: string;
  note: string;
  emails: string[];
  phones: string[];
  faxes: string[];
  educations?: string[];
}

export type ContactList = {
  id: number;
  name?: string;
  company_id?: number;
  company_name?: string;
  post_name?: string;
  phones?: number[];
  faxes?: number[];
};

export type ContactShort = {
  id: number;
  name?: string;
  department_name?: string;
  post_name?: string;
  post_go_name?: string;
};

export const ContactNameInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="name"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => properties.setter(event.target.value)}
    label="Фамилия Имя Отчество"
    icon="user"
  />
);

export const ContactBirthdayInput = (properties: DatePickerValues): JSX.Element => (
  <DatePicker
    name="birthday"
    label="Дата рождения"
    value={properties.value}
    setter={properties.setter}
  />
);

export const ContactShortForm = (properties: ContactShortValues): JSX.Element => {
  const history = useHistory();
  return (
    <div className="field" key="contacts">
      <label className="label" htmlFor="contact-1">
        Сотрудники
      </label>
      {properties.contacts.map((contact, index) => (
        <Input
          key={`contact-${index}`}
          name={`contact-${index}`}
          onClick={(): void => history.push(`/contact/${contact.id}`)}
          value={`${contact.name || ''} - ${contact.post_name || ''}`}
          readonly
          classNameDiv="pb-1"
          className="link"
        />
      ))}
    </div>
  );
};

export const ContactIDSelect = (properties: SelectValues): JSX.Element => (
  <Select
    name="contact"
    label="Фамилия Имя Отчество"
    listName="ContactSelect"
    id={properties.id}
    icon="user"
    setter={properties.setter}
  />
);
