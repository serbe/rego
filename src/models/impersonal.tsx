import React, { ChangeEvent, SetStateAction } from 'react';
import { FormField } from '../components/formfield';
import { Input, StringInputProperties } from '../components/input';
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

export const EmailInputs = (properties: EmailValues): JSX.Element => (
  <div className="field">
    <label className="label" htmlFor="email-1-input">
      Электронный адрес
    </label>
    {properties.emails.map((email, index) => (
      <Input
        name={`email-${index}-input`}
        type="email"
        icon="envelope"
        key={`email-${index}`}
        value={email}
        placeholder="Электронный адрес"
        onBlur={(event): void => {
          let values = properties.emails;
          values[index] = event.target.value;
          values = addEmptyString(values);
          properties.setter(values);
        }}
        classNameDiv="pb-1"
      />
    ))}
  </div>
);

export const PhoneInputs = (properties: PhoneValues): JSX.Element => (
  <div className="field">
    <label className="label" htmlFor="phone-1-input">
      Телефон
    </label>
    {properties.phones.map((phone, index) => (
      <Input
        name={`phone-${index}-input`}
        type="tel"
        icon="phone"
        key={`phone-${index}`}
        value={phone.toString()}
        placeholder="Телефон"
        onBlur={(event): void => {
          let values = properties.phones;
          values[index] = event.target.value;
          values = addEmptyString(values);
          properties.setter(values);
        }}
        classNameDiv="pb-1"
      />
    ))}
  </div>
);

export const FaxInputs = (properties: PhoneValues): JSX.Element => (
  <div className="field">
    <label className="label" htmlFor="fax-1-input">
      Факс
    </label>
    {properties.phones.map((fax, index) => (
      <Input
        name={`fax-${index}-input`}
        type="tel"
        icon="fax"
        key={`fax-${index}`}
        value={fax.toString()}
        placeholder="Факс"
        onBlur={(event): void => {
          let values = properties.phones;
          values[index] = event.target.value;
          values = addEmptyString(values);
          properties.setter(values);
        }}
        classNameDiv="pb-1"
      />
    ))}
  </div>
);

export const NoteInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="note"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => properties.setter(event.target.value)}
    label="Заметки"
    icon="comment"
  />
);

export const AddressInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="address"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => properties.setter(event.target.value)}
    label="Адрес"
    icon="address-card"
  />
);

export const ContactIDSelect = (properties: SelectValues): JSX.Element => (
  <Select
    name="contact"
    label="Контактное лицо"
    listName="ContactSelect"
    id={properties.id}
    icon="user"
    setter={properties.setter}
  />
);
