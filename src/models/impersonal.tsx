import { ChangeEvent, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

import { FormField } from '../components/formfield';
import { Input, StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';
import { useAuthState } from '../services/auth';
import { addEmptyString, prettyPhone } from '../services/utils';

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

export const EmailInputs = ({ emails, setter }: EmailValues): JSX.Element => (
  <div className="field">
    <label className="label" htmlFor="email-1-input">
      Электронный адрес
    </label>
    {emails.map((email, index) => (
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
        classNameDiv="pb-1"
        autocomplete="off"
      />
    ))}
  </div>
);

export const PhoneInputs = ({ phones, setter }: PhoneValues): JSX.Element => (
  <div className="field">
    <label className="label" htmlFor="phone-1-input">
      Телефон
    </label>
    {phones.map((phone, index) => (
      <Input
        name={`phone-${index}-input`}
        type="tel"
        icon="phone"
        key={`phone-${index}`}
        value={prettyPhone(phone)}
        placeholder="Телефон"
        onBlur={(event): void => {
          let values = phones;
          values[index] = event.target.value;
          values = addEmptyString(values);
          setter(values);
        }}
        classNameDiv="pb-1"
        autocomplete="off"
      />
    ))}
  </div>
);

export const FaxInputs = ({ phones, setter }: PhoneValues): JSX.Element => (
  <div className="field">
    <label className="label" htmlFor="fax-1-input">
      Факс
    </label>
    {phones.map((fax, index) => (
      <Input
        name={`fax-${index}-input`}
        type="tel"
        icon="fax"
        key={`fax-${index}`}
        value={prettyPhone(fax)}
        placeholder="Факс"
        onBlur={(event): void => {
          let values = phones;
          values[index] = event.target.value;
          values = addEmptyString(values);
          setter(values);
        }}
        classNameDiv="pb-1"
        autocomplete="off"
      />
    ))}
  </div>
);

export const NoteInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    name="note"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
      setter(event.target.value === '' ? undefined : event.target.value);
    }}
    label="Заметки"
    icon="comment"
    autocomplete="off"
  />
);

export const AddressInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    name="address"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Адрес"
    icon="address-card"
  />
);

export const ContactIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select
    name="contact"
    label="Контактное лицо"
    listName="ContactSelect"
    id={id}
    icon="user"
    setter={setter}
  />
);

interface FormButtonsValues {
  del: () => void;
  send: () => void;
}

export const ItemFormButtons = ({ del, send }: FormButtonsValues): JSX.Element => {
  const history = useHistory();
  const { auth } = useAuthState();

  const SaveButton = () =>
    auth.user.role > 4 ? (
      <div className="control">
        <button type="button" className="button is-info" onClick={() => send()}>
          Сохранить
        </button>
      </div>
    ) : (
      <></>
    );

  const BackButton = () => (
    <div className="control">
      <button type="button" className="button" onClick={() => history.go(-1)}>
        Закрыть
      </button>
    </div>
  );

  const DeleteButton = () =>
    auth.user.role > 8 ? (
      <div className="control mla">
        <button
          type="button"
          className="button is-danger"
          onClick={() => {
            if (window.confirm('Вы действительно хотите удалить запись?')) {
              del();
            }
          }}
        >
          Удалить
        </button>
      </div>
    ) : (
      <></>
    );

  return (
    <div className="field is-grouped">
      <SaveButton />
      <BackButton />
      <DeleteButton />
    </div>
  );
};
