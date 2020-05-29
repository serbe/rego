import React from 'react';
import { useHistory } from 'react-router-dom';
import { DatePicker, DatePickerValues } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input, InputValues } from '../components/input';
import { SelectItem } from '../models/selectitem';

export interface ContactShortValues {
  contacts: ContactShort[];
}

export type ContactJsonScheme = {
  name: string;
  object: {
    Contact?: Contact;
    SelectItem?: SelectItem[];
  };
  error?: string;
};

export type ContactListJsonScheme = {
  name: string;
  object: {
    ContactList?: ContactList[];
  };
  error?: string;
};

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

export const ContactNameInput = (values: InputValues): JSX.Element => {
  const { value, onChange } = values;
  return (
    <FormField
      name="name"
      value={value}
      onChange={onChange}
      label="Фамилия Имя Отчество"
      icon="user"
    />
  );
};

export const ContactBirthdayInput = (values: DatePickerValues): JSX.Element => {
  const { value, onChange } = values;
  return <DatePicker name="birthday" label="Дата рождения" value={value} onChange={onChange} />;
};

export const ContactShortForm = (values: ContactShortValues): JSX.Element => {
  const { contacts } = values;
  const history = useHistory();
  return (
    <div className="field" key="contacts">
      <label className="label" htmlFor="contact-1">
        Сотрудники
      </label>
      {contacts.map((contact, index) => (
        <Input
          key={`contact-${index}`}
          name={`contact-${index}`}
          onClick={(): void => history.push(`/contact/${contact.id}`)}
          value={`${contact.name || ''} - ${contact.post_name || ''}`}
          readonly
          classNameDiv="pb5"
          className="link"
        />
      ))}
    </div>
  );
};
