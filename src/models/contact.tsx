import { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { DatePicker, DatePickerValues } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input, StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';
import { diffMonth } from '../services/utils';

export interface ContactShortValues {
  contacts: ContactShort[];
}

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

export const ContactEmpty: Contact = {
  id: 0,
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

export const ContactNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    icon="user"
    label="Фамилия Имя Отчество"
    name="contact-name"
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    value={value}
    autocomplete="off"
  />
);

export const ContactBirthdayInput = ({ value, setter }: DatePickerValues): JSX.Element => (
  <DatePicker label="Дата рождения" name="birthday" setter={setter} value={value} />
);

export const ContactShortForm = ({ contacts }: ContactShortValues): JSX.Element => {
  const history = useHistory();
  return (
    <div className="field" key="contacts">
      <label className="label" htmlFor="contact-1">
        Сотрудники
      </label>
      {contacts.map((contact, index) => (
        <Input
          className="link"
          classNameDiv="pb-1"
          icon="user"
          key={`contact-${index}`}
          name={`contact-${index}`}
          onClick={(): void => history.push(`/contacts/${contact.id}`)}
          readonly
          value={`${contact.name || ''} - ${contact.post_name || ''}`}
          autocomplete="off"
        />
      ))}
    </div>
  );
};

export const ContactIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select
    icon="user"
    id={id}
    label="Фамилия Имя Отчество"
    listName="ContactSelect"
    name="contact"
    setter={setter}
  />
);

const inputClass = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (date > new Date()) {
    return 'is-warning';
  }
  const newDate = diffMonth(60);
  if (date > newDate) {
    return 'is-success';
  }
  return 'is-danger';
};

export const ContactEducations = ({ educations }: ContactEducationsValues): JSX.Element =>
  educations.length > 0 ? (
    <div className="field">
      <label className="label" htmlFor="education-1-input">
        Даты обучения в УМЦ
      </label>
      {educations.map((education, index) => (
        <Input
          name={`education-${index}-input`}
          key={`education-${index}`}
          value={education}
          className={inputClass(education)}
          classNameDiv="pb-1"
        />
      ))}
    </div>
  ) : (
    <></>
  );
