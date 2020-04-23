import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { Contact } from '../../models/contact';
import { SelectItem } from '../../models/selectitem';
import { rws } from '../../netapi';
import { FormField } from '../../components/formfield';
import { Select } from '../../components/select';

type CLWS = {
  name: string;
  object: {
    Contact?: Contact;
    SelectItem?: SelectItem[];
  };
  error?: string;
};

const ContactForm = (contact: Contact, companies: SelectItem[]): JSX.Element => {
  const c = contact;

  return (
    <div>
      <FormField
        label="Фамилия Имя Отчество"
        defaultValue={c.name}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
          c.name = event.target.value;
        }}
      />
      <Select list={companies} />
    </div>
  );
};

export const ContactItem = (): JSX.Element => {
  const [contact, setContact] = useState<Contact>();
  const [companies, setCompanies] = useState<SelectItem[]>();
  const [hasError, setErrors] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data: CLWS = JSON.parse(message.data);
      if (data?.name === 'Contact' && data.object.Contact) {
        setContact(data.object.Contact);
      }
      if (data?.name === 'CompanySelect' && data.object.SelectItem) {
        setCompanies(data.object.SelectItem);
      }
      if (data.error) {
        setErrors(data.error);
      }
    });
    rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Contact"}}}`);
    rws.send(`{"Get":{"List":"CompanySelect"}}`);

    return function cleanup(): void {
      rws.removeEventListener('message', (message: unknown) => {
        console.log('removeEventListener', message);
      });
    };
  }, [id]);

  return <div>{contact && companies && !hasError ? ContactForm(contact, companies) : null}</div>;
};
