import React, { ChangeEvent, SetStateAction } from 'react';
import { FormField } from '../components/formfield';
import { FieldStringProperties, Input } from '../components/input';
import { Select, SelectValues } from '../components/select';
import { addEmptyString } from '../helpers/utils';

export interface ParameterTypes {
  id: string;
}

export type EmailValues = {
  emails: string[];
  setter: (value: SetStateAction<string[]>) => void;
};

export type PhoneValues = {
  phones: string[];
  setter: (value: SetStateAction<string[]>) => void;
};

export const EmailInputs = (values: EmailValues): JSX.Element => {
  const { emails, setter } = values;
  return (
    <div className="field">
      <label className="label" htmlFor="email-1-input">
        Электронный адрес
      </label>
      {emails &&
        emails.map((email, index) => (
          <Input
            name={`email-${index}-input`}
            type="email"
            icon="envelope"
            key={`email-${index}`}
            value={email}
            placeholder="Электронный адрес"
            onBlur={(event): void => {
              let values = emails;
              values[index] = event.target.value;
              values = addEmptyString(values);
              setter(values);
            }}
            classNameDiv="pb5"
          />
        ))}
    </div>
  );
};

export const PhoneInputs = (values: PhoneValues): JSX.Element => {
  const { phones, setter } = values;
  return (
    <div className="field">
      <label className="label" htmlFor="phone-1-input">
        Телефон
      </label>
      {phones &&
        phones.map((phone, index) => (
          <Input
            name={`phone-${index}-input`}
            type="tel"
            icon="phone"
            key={`phone-${index}`}
            value={phone.toString()}
            placeholder="Телефон"
            onBlur={(event): void => {
              let values = phones;
              values[index] = event.target.value;
              values = addEmptyString(values);
              setter(values);
            }}
            classNameDiv="pb5"
          />
        ))}
    </div>
  );
};

export const FaxInputs = (values: PhoneValues): JSX.Element => {
  const { phones, setter } = values;
  return (
    <div className="field">
      <label className="label" htmlFor="fax-1-input">
        Факс
      </label>
      {phones &&
        phones.map((fax, index) => (
          <Input
            name={`fax-${index}-input`}
            type="tel"
            icon="fax"
            key={`fax-${index}`}
            value={fax.toString()}
            placeholder="Факс"
            onBlur={(event): void => {
              let values = phones;
              values[index] = event.target.value;
              values = addEmptyString(values);
              setter(values);
            }}
            classNameDiv="pb5"
          />
        ))}
    </div>
  );
};

export const NoteInput = (values: FieldStringProperties): JSX.Element => {
  const { value, setter } = values;
  return (
    <FormField
      name="note"
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => setter(event.target.value)}
      label="Заметки"
      icon="comment"
    />
  );
};

export const AddressInput = (values: FieldStringProperties): JSX.Element => {
  const { value, setter } = values;
  return (
    <FormField
      name="address"
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => setter(event.target.value)}
      label="Адрес"
      icon="address-card"
    />
  );
};

export const ContactIDSelect = (values: SelectValues): JSX.Element => {
  const { id, setter } = values;
  return (
    <Select
      name="contact"
      label="Контактное лицо"
      listName="ContactSelect"
      id={id}
      icon="user"
      setter={setter}
    />
  );
};
