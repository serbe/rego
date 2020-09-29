import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

import { DatePicker, DatePickerValues } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input, StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';

export interface ContactEducationsValues {
  educations: string[];
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

export interface ContactShortValues {
  contacts: ContactShort[];
}

type JsonItemScheme = {
  command: 'Get';
  name: 'Contact';
  object: { Contact: Contact };
  error: string;
};

export const ContactGetItem = (
  message: MessageEvent,
  setData: Dispatch<SetStateAction<Contact | undefined>>,
): void => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as JsonItemScheme;
  if (jsonData?.object) {
    setData(jsonData.object.Contact);
  }
};

export interface JsonContactListScheme {
  command: 'Get';
  name: 'ContactList';
  object: { ContactList: ContactList[] };
  error: string;
}

export const ContactNameInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    icon="user"
    label="Фамилия Имя Отчество"
    name="name"
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    value={properties.value}
  />
);

export const ContactBirthdayInput = (properties: DatePickerValues): JSX.Element => (
  <DatePicker
    label="Дата рождения"
    name="birthday"
    setter={properties.setter}
    value={properties.value}
  />
);

export const ContactShortForm = (properties: ContactShortValues): JSX.Element => {
  const history = useHistory();
  return (
    <div className="field" key="contacts">
      <label className="label" htmlFor="contact-1-input">
        Сотрудники
      </label>
      {properties.contacts.map((contact, index) => (
        <Input
          className="link"
          classNameDiv="pb-1"
          key={`contact-${index}`}
          name={`contact-${index}-input`}
          onClick={(): void => history.push(`/contacts/${contact.id}`)}
          readonly
          value={`${contact.name || ''} - ${contact.post_name || ''}`}
        />
      ))}
    </div>
  );
};

export const ContactIDSelect = (properties: SelectValues): JSX.Element => (
  <Select
    icon="user"
    id={properties.id}
    label="Фамилия Имя Отчество"
    listName="ContactSelect"
    name="contact"
    setter={properties.setter}
  />
);

export const ContactEducations = (properties: ContactEducationsValues): JSX.Element =>
  properties.educations.length > 0 ? (
    <div className="field">
      <label className="label" htmlFor="education-1-input">
        Даты обучения в УМЦ
      </label>
      {properties.educations.map((education, index) => (
        <Input
          name={`education-${index}-input`}
          key={`education-${index}`}
          value={education}
          classNameDiv="pb-1"
        />
      ))}
    </div>
  ) : (
    <></>
  );
