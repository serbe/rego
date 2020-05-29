import React, { SetStateAction } from 'react';
import { FormField } from '../components/formfield';
import { Input, InputValues } from '../components/input';
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

export const NoteInput = (values: InputValues): JSX.Element => {
  const { value, onChange } = values;
  return <FormField name="note" value={value} onChange={onChange} label="Заметки" icon="comment" />;
};

export const AddressInput = (values: InputValues): JSX.Element => {
  const { value, onChange } = values;
  return (
    <FormField name="address" value={value} onChange={onChange} label="Адрес" icon="address-card" />
  );
};
